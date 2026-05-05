import { Button } from "@/components";
import { formatPrice } from "@/helpers";
import { DeliveryAddress } from "@/interfaces";
import { ShippingAddressSummary } from "./ShippingAddressSummary";
import Link from "next/link";

export interface OrderSummaryProps {
    title?: string;
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    isOrderReview?: boolean;
    buttonText?: string;
    shippingAddress?: DeliveryAddress;
}

export function OrderSummary({
    title,
    shipping,
    subtotal,
    tax,
    total,
    isOrderReview,
    buttonText = "Proceed to Checkout",
}: OrderSummaryProps) {
    return (
        <div className="w-full h-max space-y-3 lg:p-8 lg:rounded-md lg:shadow-xl lg:max-w-sm">
            <h2 className="text-base md:text-lg font-bold">
                {title || "Order Summary"}
            </h2>
            {isOrderReview  && (
                <>
                    <ShippingAddressSummary />
                    <div className="w-full border-b-[0.5px] border-gray-300" />
                </>
            )}
            <p className="flex justify-between items-center text-sm text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
            </p>
            <p className="flex justify-between items-center text-sm text-gray-600">
                <span>Shipping</span>
                <span>{formatPrice(shipping)}</span>
            </p>
            <p className="flex justify-between items-center text-sm text-gray-600">
                <span>Sales Tax</span>
                <span>{formatPrice(tax)}</span>
            </p>
            <p className="flex justify-between items-center text-base md:text-lg font-bold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
            </p>
            <div className="w-full fixed bottom-0 left-0 px-4 py-6 text-center shadow-[0_-2px_10px_rgba(0,0,0,0.1)] bg-white lg:static lg:shadow-none lg:p-0">
                <Link href="/checkout/address">
                    <Button type="button" variant="primary" className="w-full max-w-120">
                        {buttonText}
                    </Button>
                </Link>
            </div>
        </div>
    );
}
