"use server";

import { auth } from "@/auth.config";
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
        return sum + (orderItem ? product.quantity * orderItem.price : 0);
    }, 0);

    const shipping = subTotal > 300 ? 0 : 5.99; // Free shipping for orders over $300
    const tax = subTotal * 0.15; // 15% tax
    const total = subTotal + shipping + tax;

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

        return {
            success: true,
            order: orderTransactionResult,
            message: "Order created successfully!",
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

        return { success: true, order, message: "Order retrieved successfully!" };
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
