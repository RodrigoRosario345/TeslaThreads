"use server";

import { auth } from "@/auth.config";
import { OrderStatus } from "@/generated/prisma/enums";
import { Order, ShippingAddress, ValidSizes } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
    productId: string;
    size: ValidSizes;
    quantity: number;
}

interface OrderDetails {
    shippingAddress: ShippingAddress;
    productsToOrder: ProductToOrder[];
}

type OrderResult = { success: boolean; order: Order | null; message: string };

/** Generates a human-friendly order number like "TSL-1001" */
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
): Promise<OrderResult> => {
    const { shippingAddress, productsToOrder } = orderDetails;
    console.log("Shipping Address:", shippingAddress);
    console.log("Products to Order:", productsToOrder);

    // verify if user is authenticated
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
        return {
            success: false,
            order: null,
            message: "You must be logged in to place an order.",
        };
    }

    // Get product details from the database
    const productDetails = await prisma.product.findMany({
        where: {
            id: {
                in: productsToOrder.map((p) => p.productId),
            },
        },
    });

    // get count total items ordered
    const totalItems = productsToOrder.reduce(
        (total, item) => total + item.quantity,
        0,
    );

    // get subtotal, shipping, tax and total
    const subTotal = productsToOrder.reduce((sum, product) => {
        const orderItem = productDetails.find(
            (item) => item.id === product.productId,
        );
        return sum + (orderItem ? product.quantity * Number(orderItem.price) : 0);
    }, 0);

    const shipping = subTotal > 300 ? 0 : 5.99; // Free shipping for orders over $300
    const tax = subTotal * 0.15; // 15% tax
    const total = subTotal + shipping + tax;

    // Generate order number
    const orderNumber = await generateOrderNumber();

    // Create the order transaction in the database
    try {
        // Verify and update stock for each product
        const orderTransactionResult = await prisma.$transaction(async (tx) => {
            // Check stock availability and update stock
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

            // Ensure no product has negative stock after the update
            updatedProducts.forEach((product) => {
                if (product.inStock < 0) {
                    throw new Error(
                        `Stock for product ${product.title} cannot be negative. Current stock: ${product.inStock}`,
                    );
                }
            });

            // Create order record
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
                    orderItems: {
                        createMany: {
                            data: orderItems,
                        },
                    },
                },
            });

            // create shipping address record
            const { country, ...dataShippingAddress } = shippingAddress;

            const shippingAddressRecord = await tx.orderAddress.create({
                data: {
                    ...dataShippingAddress,
                    countryId: country,
                    orderId: order.id,
                },
            });

            return order;
        });

        // Convert Decimal fields to numbers for the response
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
            order: orderResponse,
            message: `Order ${orderNumber} created successfully!`,
        };
    } catch (error) {
        console.error("Error creating order:", error);
        return {
            success: false,
            order: null,
            message:
                error instanceof Error
                    ? error.message
                    : "An error occurred while creating the order.",
        };
    }
};

export const getOrderById = async (orderId: string): Promise<OrderResult> => {
    try {
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: { orderItems: true, orderAddress: true },
        });

        if (!order) {
            return { success: false, order: null, message: "Order not found." };
        }

        const orderResponse: Order = {
            ...order,
            subTotal: Number(order.subTotal),
            tax: Number(order.tax),
            total: Number(order.total),
        };

        return {
            success: true,
            order: orderResponse,
            message: "Order retrieved successfully!",
        };
    } catch (error) {
        console.error("Error fetching order:", error);
        return {
            success: false,
            order: null,
            message:
                error instanceof Error
                    ? error.message
                    : "An error occurred while fetching the order.",
        };
    }
};

export const getOrdersByUser = async (
    userId: string,
    status?: OrderStatus,
): Promise<{ success: boolean; orders: Order[]; message: string }> => {
    try {
        const orders = await prisma.order.findMany({
            where: {
                userId,
                status
            },
            orderBy: { createdAt: "desc" },
        });

        const mappedOrders: Order[] = orders.map((order) => ({
            ...order,
            subTotal: Number(order.subTotal),
            tax: Number(order.tax),
            total: Number(order.total),
        }));

        return {
            success: true,
            orders: mappedOrders,
            message: "Orders retrieved successfully!",
        };
    } catch (error) {
        console.error("Error fetching orders:", error);
        return {
            success: false,
            orders: [],
            message:
                error instanceof Error
                    ? error.message
                    : "An error occurred while fetching orders.",
        };
    }
};
