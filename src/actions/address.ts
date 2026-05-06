"use server";

import type { UserAddress } from "@/generated/prisma/client";
import type { DeliveryAddress } from "@/interfaces";
import prisma from "@/lib/prisma";

type AddressResult =
    | { success: true; address: DeliveryAddress }
    | { success: false; address: null; error: string };

type AddressDeleteResult =
    | { success: true; deleted: boolean }
    | { success: false; error: string };

function buildAddressData(address: DeliveryAddress, userId: string) {
    return {
        userId,
        firstName: address.firstName,
        lastName: address.lastName,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        postalCode: address.postalCode,
        city: address.city,
        phoneNumber: address.phoneNumber,
        countryId: address.country,
    };
}

function formatAddress(address: UserAddress): DeliveryAddress {
    return {
        firstName: address.firstName,
        lastName: address.lastName,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2 || undefined,
        postalCode: address.postalCode,
        city: address.city,
        phoneNumber: address.phoneNumber,
        country: address.countryId,
    };
}

export async function getDeliveryAddress(userId: string): Promise<AddressResult> {
    try {
        const address = await prisma.userAddress.findUnique({
            where: {
                userId,
            },
        });

        if (!address) {
            return {
                success: false,
                address: null,
                error: "Delivery address not found",
            };
        }
        return { success: true, address: formatAddress(address) };
    } catch (error) {
        console.error("Error fetching delivery address:", error);
        return {
            success: false,
            address: null,
            error: "Failed to fetch delivery address",
        };
    }
}

export async function createDeliveryAddress(
    address: DeliveryAddress,
    userId: string,
): Promise<AddressResult> {
    try {
        const newAddress = await prisma.userAddress.create({
            data: buildAddressData(address, userId),
        });

        return { success: true, address: formatAddress(newAddress) };
    } catch (error) {
        console.error("Error creating delivery address:", error);
        return {
            success: false,
            address: null,
            error: "Failed to create delivery address",
        };
    }
}

export async function saveDeliveryAddress(
    address: DeliveryAddress,
    userId: string,
): Promise<AddressResult> {
    try {
        const addressData = buildAddressData(address, userId);
        const savedAddress = await prisma.userAddress.upsert({
            where: { userId },
            create: addressData,
            update: addressData,
        });

        return { success: true, address: formatAddress(savedAddress) };
    } catch (error) {
        console.error("Error saving delivery address:", error);
        return {
            success: false,
            address: null,
            error: "Failed to save delivery address",
        };
    }
}

export async function deleteDeliveryAddress(
    userId: string,
): Promise<AddressDeleteResult> {
    try {
        const result = await prisma.userAddress.deleteMany({
            where: { userId },
        });

        return { success: true, deleted: result.count > 0 };
    } catch (error) {
        console.error("Error deleting delivery address:", error);
        return { success: false, error: "Failed to delete delivery address" };
    }
}
