import { ShippingAddress } from "@/interfaces";
import { useShippingAddressStore } from "@/store";
import Link from "next/link";

export interface AddressSummaryProps {
    shippingAddress: ShippingAddress;
}

export function AddressSummary({ shippingAddress }: AddressSummaryProps) {
    return (
        <div className="text-sm space-y-1">
            <p className="font-medium flex justify-between">
                <span className="text-gray-600">Shipping Address</span>
                <Link
                    href="/checkout/address"
                    className="text-gray-600 underline underline-offset-4 hover:decoration-2"
                >
                    Edit
                </Link>
            </p>
            <p className="font-semibold">
                {shippingAddress.firstName} {shippingAddress.lastName}
            </p>
            <p className="font-semibold">{shippingAddress.addressLine1}</p>
            {shippingAddress.addressLine2 && (
                <p className="font-semibold">{shippingAddress.addressLine2}</p>
            )}
            <p className="font-semibold">
                {shippingAddress.city}, {shippingAddress.postalCode}
            </p>
            <p className="font-semibold">{shippingAddress.country}</p>
            <p className="font-semibold">{shippingAddress.phoneNumber}</p>
        </div>
    );
}
