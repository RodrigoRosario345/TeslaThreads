import { Button } from "@/components";
import { formatPrice } from "@/helpers";
import Link from "next/link";

export interface OrderSummaryProps {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
}

export function OrderSummary({ shipping, subtotal, tax, total }: OrderSummaryProps) {
    return (
        <div className="w-full h-max space-y-4 lg:p-8 lg:rounded-md lg:shadow-xl lg:max-w-sm">
            <h2 className="text-base md:text-lg font-bold">Order Summary</h2>
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
                    <Button type="button" buttonStyle="primary" className="w-full max-w-120">
                        Checkout
                    </Button>
                </Link>
            </div>
        </div>
    );
}
