"use server";

import type { UserAddress } from "@/generated/prisma/client";
import type { ShippingAddress } from "@/interfaces";
import prisma from "@/lib/prisma";

type AddressResult =
    | { success: true; address: ShippingAddress }
    | { success: false; address: null; error: string };

type AddressDeleteResult =
    | { success: true; deleted: boolean }
    | { success: false; error: string };

function buildAddressData(address: ShippingAddress, userId: string) {
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

function formatAddress(address: UserAddress): ShippingAddress {
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

export async function getShippingAddress(userId: string): Promise<AddressResult> {
    try {
        const address = await prisma.userAddress.findFirst({
            where: {
                userId,
            },
        });

        if (!address) {
            return {
                success: false,
                address: null,
                error: "Shipping address not found",
            };
        }
        return { success: true, address: formatAddress(address) };
    } catch (error) {
        console.error("Error fetching shipping address:", error);
        return {
            success: false,
            address: null,
            error: "Failed to fetch shipping address",
        };
    }
}

export async function getUserAddresses(
    userId: string,
): Promise<{ success: true; addresses: ShippingAddress[] } | { success: false; addresses: null; error: string }> {
    try {
        const addresses = await prisma.userAddress.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });

        return {
            success: true,
            addresses: addresses.map(formatAddress),
        };
    } catch (error) {
        console.error("Error fetching user addresses:", error);
        return {
            success: false,
            addresses: null,
            error: "Failed to fetch addresses",
        };
    }
}

export async function createShippingAddress(
    address: ShippingAddress,
    userId: string,
): Promise<AddressResult> {
    try {
        const newAddress = await prisma.userAddress.create({
            data: buildAddressData(address, userId),
        });

        return { success: true, address: formatAddress(newAddress) };
    } catch (error) {
        console.error("Error creating shipping address:", error);
        return {
            success: false,
            address: null,
            error: "Failed to create shipping address",
        };
    }
}

export async function saveShippingAddress(
    address: ShippingAddress,
    userId: string,
    addressId?: string,
): Promise<AddressResult> {
    try {
        const addressData = buildAddressData(address, userId);

        let savedAddress: UserAddress;

        if (addressId) {
            // Update existing address
            savedAddress = await prisma.userAddress.update({
                where: { id: addressId },
                data: addressData,
            });
        } else {
            // Create new address
            savedAddress = await prisma.userAddress.create({
                data: addressData,
            });
        }

        return { success: true, address: formatAddress(savedAddress) };
    } catch (error) {
        console.error("Error saving shipping address:", error);
        return {
            success: false,
            address: null,
            error: "Failed to save shipping address",
        };
    }
}

export async function deleteShippingAddress(
    addressId: string,
): Promise<AddressDeleteResult> {
    try {
        await prisma.userAddress.delete({
            where: { id: addressId },
        });

        return { success: true, deleted: true };
    } catch (error) {
        console.error("Error deleting shipping address:", error);
        return { success: false, error: "Failed to delete shipping address" };
    }
}

export async function deleteAllUserAddresses(
    userId: string,
): Promise<AddressDeleteResult> {
    try {
        const result = await prisma.userAddress.deleteMany({
            where: { userId },
        });

        return { success: true, deleted: result.count > 0 };
    } catch (error) {
        console.error("Error deleting all user addresses:", error);
        return { success: false, error: "Failed to delete addresses" };
    }
}
