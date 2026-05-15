import { OrderStatus } from "@/generated/prisma/enums";

export interface Order {
    id: string;
    orderNumber: string;
    subTotal: number;
    tax: number;
    total: number;
    isPaid: boolean;
    paidAt: Date | null;
    status: OrderStatus;
    itemsInOrder: number;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}