"use server";

import { OrderStatus } from "@/generated/prisma/enums";
import { Order } from "@/interfaces";
import prisma from "@/lib/prisma";
import type { GetOneResult, GetManyResult } from "../types";

function mapOrder(order: Record<string, unknown>): Order {
    return {
        ...order,
        subTotal: Number(order.subTotal),
        tax: Number(order.tax),
        total: Number(order.total),
    } as unknown as Order;
}

export const getOrderById = async (orderId: string): Promise<GetOneResult<Order>> => {
    try {
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: { orderItems: true, orderAddress: true },
        });

        if (!order) {
            return { success: false, data: null, error: "Order not found." };
        }

        return { success: true, data: mapOrder(order) };
    } catch (error) {
        console.error("Error fetching order:", error);
        return {
            success: false,
            data: null,
            error: error instanceof Error ? error.message : "An error occurred while fetching the order.",
        };
    }
};

export const getOrdersByUser = async (
    userId: string,
    status?: OrderStatus,
): Promise<GetManyResult<Order>> => {
    try {
        const orders = await prisma.order.findMany({
            where: { userId, ...(status ? { status } : {}) },
            orderBy: { createdAt: "desc" },
        });

        return {
            success: true,
            data: orders.map(mapOrder),
        };
    } catch (error) {
        console.error("Error fetching orders:", error);
        return {
            success: false,
            data: null,
            error: error instanceof Error ? error.message : "An error occurred while fetching orders.",
        };
    }
};
