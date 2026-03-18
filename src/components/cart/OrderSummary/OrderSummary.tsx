import { Button } from "@/components";

export interface OrderSummaryProps {
    shipping: number;
    subtotal: number;
}

export function OrderSummary({ shipping, subtotal }: OrderSummaryProps) {
    const total = subtotal + shipping;
    return (
        <div className="p-8 rounded-md shadow-lg bg-gray-50 w-full max-w-sm">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>
            <p>
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
            </p>
            <p>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
            </p>
            <p>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
            </p>
            <Button buttonStyle="primary" className="w-full">
                Checkout
            </Button>
        </div>
    );
}
