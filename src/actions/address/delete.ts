"use server";

import prisma from "@/lib/prisma";
import type { DeleteResult } from "../types";

export async function deleteShippingAddress(addressId: string): Promise<DeleteResult> {
    try {
        await prisma.userAddress.delete({ where: { id: addressId } });
        return { success: true };
    } catch (error) {
        console.error("Error deleting shipping address:", error);
        return { success: false, error: "Failed to delete shipping address" };
    }
}

export async function deleteAllUserAddresses(userId: string): Promise<DeleteResult> {
    try {
        await prisma.userAddress.deleteMany({ where: { userId } });
        return { success: true };
    } catch (error) {
        console.error("Error deleting all user addresses:", error);
        return { success: false, error: "Failed to delete addresses" };
    }
}
