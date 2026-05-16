"use server";

import { auth } from "@/auth.config";
import { Order, ShippingAddress, ValidSizes } from "@/interfaces";
import prisma from "@/lib/prisma";
import type { MutateResult } from "../types";

interface ProductToOrder {
    productId: string;
    size: ValidSizes;
    quantity: number;
}

interface OrderDetails {
    shippingAddress: ShippingAddress;
    productsToOrder: ProductToOrder[];
}

/** Genera un número de orden amigable: "TSL-1001", "TSL-1002", … */
async function generateOrderNumber(): Promise<string> {
    const lastOrder = await prisma.order.findFirst({
        orderBy: { createdAt: "desc" },
        select: { orderNumber: true },
    });

    if (!lastOrder) return "TSL-1001";

    const lastNumber = parseInt(lastOrder.orderNumber.split("-")[1], 10);
    return `TSL-${lastNumber + 1}`;
}

export const createOrder = async (
    orderDetails: OrderDetails,
): Promise<MutateResult<Order>> => {
    const { shippingAddress, productsToOrder } = orderDetails;

    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
        return {
            success: false,
            data: null,
            message: "You must be logged in to place an order.",
        };
    }

    const productDetails = await prisma.product.findMany({
        where: { id: { in: productsToOrder.map((p) => p.productId) } },
    });

    const totalItems = productsToOrder.reduce(
        (total, item) => total + item.quantity,
        0,
    );

    const subTotal = productsToOrder.reduce((sum, product) => {
        const orderItem = productDetails.find(
            (item) => item.id === product.productId,
        );
        return sum + (orderItem ? product.quantity * Number(orderItem.price) : 0);
    }, 0);

    const shipping = subTotal > 300 ? 0 : 5.99;
    const tax = subTotal * 0.15;
    const total = subTotal + shipping + tax;
    const orderNumber = await generateOrderNumber();

    try {
        const orderTransactionResult = await prisma.$transaction(async (tx) => {
            // Check and update stock
            const stockUpdates = productsToOrder.map(async (product) => {
                const productInDb = await tx.product.findUnique({
                    where: { id: product.productId },
                });

                if (!productInDb) {
                    throw new Error(`Product with ID ${product.productId} not found.`);
                }
                if (productInDb.inStock < product.quantity) {
                    throw new Error(`Not enough stock for product ${productInDb.title}.`);
                }

                return tx.product.update({
                    where: { id: product.productId },
                    data: { inStock: productInDb.inStock - product.quantity },
                });
            });

            const updatedProducts = await Promise.all(stockUpdates);

            updatedProducts.forEach((product) => {
                if (product.inStock < 0) {
                    throw new Error(
                        `Stock for product ${product.title} cannot be negative.`,
                    );
                }
            });

            // Create order items
            const orderItems = productsToOrder.map((product) => ({
                productId: product.productId,
                quantity: product.quantity,
                price:
                    productDetails.find((item) => item.id === product.productId)?.price ||
                    0,
                size: product.size,
            }));

            const order = await tx.order.create({
                data: {
                    userId,
                    orderNumber,
                    itemsInOrder: totalItems,
                    subTotal,
                    tax,
                    total,
                    status: "pending",
                    orderItems: { createMany: { data: orderItems } },
                },
            });

            // Create shipping address
            const { country, ...dataShippingAddress } = shippingAddress;
            await tx.orderAddress.create({
                data: { ...dataShippingAddress, countryId: country, orderId: order.id },
            });

            return order;
        });

        const orderResponse: Order = {
            ...orderTransactionResult,
            subTotal: Number(orderTransactionResult.subTotal),
            tax: Number(orderTransactionResult.tax),
            total: Number(orderTransactionResult.total),
            orderNumber: orderTransactionResult.orderNumber,
            status: orderTransactionResult.status,
        };

        return {
            success: true,
            data: orderResponse,
            message: `Order ${orderNumber} created successfully!`,
        };
    } catch (error) {
        console.error("Error creating order:", error);
        return {
            success: false,
            data: null,
            message:
                error instanceof Error
                    ? error.message
                    : "An error occurred while creating the order.",
        };
    }
};
