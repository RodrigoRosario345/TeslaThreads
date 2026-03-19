import { Button } from "@/components";

export interface OrderSummaryProps {
    shipping: number;
    subtotal: number;
}

export function OrderSummary({ shipping, subtotal }: OrderSummaryProps) {
    const total = subtotal + shipping;
    return (
        <div className="w-full space-y-4 lg:p-8 lg:rounded-md lg:shadow-lg lg:max-w-sm">
            <h2 className="text-lg font-bold">Order Summary</h2>
            <p className="flex justify-between items-center text-sm text-gray-600">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
            </p>
            <p className="flex justify-between items-center text-sm text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
            </p>
            <p className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
            </p>
            <div className="w-full fixed bottom-0 left-0 px-4 py-6 text-center shadow-[0_-2px_10px_rgba(0,0,0,0.1)] bg-white lg:static lg:shadow-none lg:p-0">
                <Button buttonStyle="primary" className="w-full max-w-120">
                    Checkout
                </Button>
            </div>
        </div>
    );
}
