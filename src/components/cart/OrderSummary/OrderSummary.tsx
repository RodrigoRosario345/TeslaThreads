import { Button } from "@/components";

export interface OrderSummaryProps {
    shipping: number;
    subtotal: number;
}

export function OrderSummary({ shipping, subtotal }: OrderSummaryProps) {
    const total = subtotal + shipping;
    return (
        <div className="p-8 rounded-md shadow-lg  w-full max-w-sm space-y-4">
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
            <Button buttonStyle="primary" className="w-full">
                Checkout
            </Button>
        </div>
    );
}
