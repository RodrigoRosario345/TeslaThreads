"use server";

import { DeliveryAddress } from "@/interfaces";
import prisma from "@/lib/prisma";


export async function getDeliveryAddress(userId: string) {
    try {
        const address = await prisma.userAddress.findUnique({
            where: {
                userId: userId,
            },
        });

        if (!address) {
            return { success: false, error: "No delivery address found for this user" };
        }

        return { success: true, address };
    } catch (error) {
        console.error("Error fetching delivery address:", error);
        return { success: false, error: "Failed to fetch delivery address" };
    }
}

export async function createDeliveryAddress(address: DeliveryAddress, userId: string) {
    try {
        const newAddress = await prisma.userAddress.create({
            data: {
                userId: userId,
                firstName: address.firstName,
                lastName: address.lastName,
                addressLine1: address.addressLine1,
                addressLine2: address.addressLine2,
                postalCode: address.postalCode,
                city: address.city,
                phoneNumber: address.phoneNumber,
                countryId: address.country,
            },
        });

        return { success: true, address: newAddress };
    } catch (error) {
        console.error("Error creating delivery address:", error);
        return { success: false, error: "Failed to create delivery address" };
    }
}


export async function saveDeliveryAddress(
    address: DeliveryAddress,
    userId: string,
) {
    try {
        // 1. check if the user already has a delivery address
        const existingAddress = await getDeliveryAddress(userId);

        const addressData = {
            userId: userId,
            firstName: address.firstName,
            lastName: address.lastName,
            addressLine1: address.addressLine1,
            addressLine2: address.addressLine2,
            postalCode: address.postalCode,
            city: address.city,
            phoneNumber: address.phoneNumber,
            countryId: address.country,
        }

        // 2. if not existing address, create a new one
        if (!existingAddress.success) {
            const newAddress = await createDeliveryAddress(address, userId);
            return newAddress;
        }

        // 3. if existing address, update it
        const updatedAddress = await prisma.userAddress.update({
            where: {
                userId
            },
            data: addressData,
        });

        return { success: true, address: updatedAddress };
    } catch (error) {
        console.error("Error saving delivery address:", error);
        return { success: false, error: "Failed to save delivery address" };
    }
}


export async function deleteDeliveryAddress(userId: string) {
    try {
        const existingAddress = await getDeliveryAddress(userId);

        if (!existingAddress.success) {
            return existingAddress
        }

        await prisma.userAddress.delete({
            where: {
                userId
            },
        });

        return { success: true };
    } catch (error) {
        console.error("Error deleting delivery address:", error);
        return { success: false, error: "Failed to delete delivery address" };
    }
}