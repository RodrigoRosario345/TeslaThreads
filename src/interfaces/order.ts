export interface Order {
    id: string;
    subTotal: number;
    tax: number;
    total: number;
    isPaid: boolean;
    paidAt: Date | null;
    itemsInOrder: number;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}