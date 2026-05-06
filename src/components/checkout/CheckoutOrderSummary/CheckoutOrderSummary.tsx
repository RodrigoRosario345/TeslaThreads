import { Button, LoadingText } from "@/components";
import { formatPrice } from "@/helpers";
import { useState } from "react";
import { AddressSummary } from "../address/AddressSummary/AddressSummary";

export interface CheckoutOrderSummaryProps {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    totalItems: number;
}

export function CheckoutOrderSummary({
    shipping,
    subtotal,
    tax,
    total,
    totalItems,
}: CheckoutOrderSummaryProps) {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleCheckout = () => {
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
        }, 4000);
    };

    return (
        <div className="w-full h-max space-y-3 lg:p-8 lg:rounded-md lg:shadow-xl lg:max-w-sm">
            <h2 className="text-base md:text-lg font-bold">
                {`Order Summary${totalItems ? ` (${totalItems} items)` : ""}`}
            </h2>
            <AddressSummary />
            <div className="w-full border-b-[0.5px] border-gray-300" />
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
                <Button
                    type="button"
                    variant={isSubmitting ? "primaryDisabled" : "primary"}
                    className="w-full max-w-120"
                    onClick={handleCheckout}
                    disabled={isSubmitting}
                >
                    <LoadingText
                        text="Place Order"
                        isLoading={isSubmitting}
                        loadingText="Processing..."
                    />
                </Button>
            </div>
        </div>
    );
}
