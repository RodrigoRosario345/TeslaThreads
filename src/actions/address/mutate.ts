"use server";

import type { UserAddress } from "@/generated/prisma/client";
import type { ShippingAddress } from "@/interfaces";
import prisma from "@/lib/prisma";
import type { MutateResult } from "../types";

// Helpers

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

// Mutations

export async function createShippingAddress(
    address: ShippingAddress,
    userId: string,
): Promise<MutateResult<ShippingAddress>> {
    try {
        const newAddress = await prisma.userAddress.create({
            data: buildAddressData(address, userId),
        });

        return {
            success: true,
            data: formatAddress(newAddress),
            message: "Address created successfully",
        };
    } catch (error) {
        console.error("Error creating shipping address:", error);
        return { success: false, data: null, message: "Failed to create shipping address" };
    }
}

export async function saveShippingAddress(
    address: ShippingAddress,
    userId: string,
    addressId?: string,
): Promise<MutateResult<ShippingAddress>> {
    try {
        const addressData = buildAddressData(address, userId);
        let savedAddress: UserAddress;

        if (addressId) {
            savedAddress = await prisma.userAddress.update({
                where: { id: addressId },
                data: addressData,
            });
        } else {
            savedAddress = await prisma.userAddress.create({
                data: addressData,
            });
        }

        return {
            success: true,
            data: formatAddress(savedAddress),
            message: "Address saved successfully",
        };
    } catch (error) {
        console.error("Error saving shipping address:", error);
        return { success: false, data: null, message: "Failed to save shipping address" };
    }
}
