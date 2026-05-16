"use server";

import type { UserAddress } from "@/generated/prisma/client";
import type { ShippingAddress } from "@/interfaces";
import prisma from "@/lib/prisma";
import type { GetOneResult, GetManyResult } from "../types";

// Helpers 

function formatAddress(address: UserAddress): ShippingAddress {
    return {
        addressId: address.id,
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

// Queries 

export async function getUserAddress(userId: string): Promise<GetOneResult<ShippingAddress>> {
    try {
        const address = await prisma.userAddress.findFirst({
            where: { userId },
        });

        if (!address) {
            return { success: false, data: null, error: "Shipping address not found" };
        }

        return { success: true, data: formatAddress(address) };
    } catch (error) {
        console.error("Error fetching shipping address:", error);
        return { success: false, data: null, error: "Failed to fetch shipping address" };
    }
}

export async function getUserAddresses(userId: string): Promise<GetManyResult<ShippingAddress>> {
    try {
        const addresses = await prisma.userAddress.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });

        return { success: true, data: addresses.map(formatAddress) };
    } catch (error) {
        console.error("Error fetching user addresses:", error);
        return { success: false, data: null, error: "Failed to fetch addresses" };
    }
}
