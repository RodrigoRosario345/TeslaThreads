import { Button, CountTo } from "@/components";
import { formatPrice } from "@/helpers";
import Link from "next/link";

export interface OrderSummaryProps {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
}

export function OrderSummary({
    shipping,
    subtotal,
    tax,
    total,
}: OrderSummaryProps) {
    return (
        <div className="w-full h-max space-y-3 lg:p-8 lg:rounded-md lg:shadow-xl lg:max-w-sm">
            <h2 className="text-base md:text-xl font-semibold">Order Summary</h2>
            <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Subtotal</span>
                <CountTo
                    className="text-sm text-gray-600"
                    value={subtotal}
                    prefix="$"
                    decimals={2}
                />
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Shipping</span>
                <CountTo
                    className="text-sm text-gray-600"
                    value={shipping}
                    prefix="$"
                    decimals={2}
                />
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Sales Tax</span>
                <CountTo
                    className="text-sm text-gray-600"
                    value={tax}
                    prefix="$"
                    decimals={2}
                />
            </div>
            <div className="flex justify-between items-center text-base md:text-lg font-bold">
                <span>Total</span>
                <CountTo
                    className="text-base md:text-lg font-bold"
                    value={total}
                    prefix="$"
                    decimals={2}
                />
            </div>
            <div className="w-full fixed bottom-0 left-0 px-4 py-6 text-center shadow-[0_-2px_10px_rgba(0,0,0,0.1)] bg-white lg:static lg:shadow-none lg:p-0">
                <Link href="/checkout/address">
                    <Button type="button" variant="primary" className="w-full max-w-120">
                        Proceed to Checkout
                    </Button>
                </Link>
            </div>
        </div>
    );
}
