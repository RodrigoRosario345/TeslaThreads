import { Button, LoadingText, Modal } from "@/components";
import { formatPrice } from "@/helpers";
import { useState } from "react";
import { AddressSummary } from "../address/AddressSummary/AddressSummary";
import { useCartStore, useShippingAddressStore } from "@/store";
import { createOrder } from "@/actions/order";
import { useRouter } from "next/navigation";

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
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const shippingAddress = useShippingAddressStore((state) => state.shippingAddress);
    const productsAddedToCart = useCartStore((state) => state.items);
    const clearCart = useCartStore((state) => state.clearCart);
    const addOperationResult = useCartStore((state) => state.addOperationResult);


    const handlePlaceOrder = async () => {

        setIsSubmitting(true);

        const formattedProductsToOrder = productsAddedToCart.map((item) => ({
            productId: item.id,
            size: item.size,
            quantity: item.quantity,
        }));

        const orderDetails = {
            shippingAddress,
            productsToOrder: formattedProductsToOrder,
        };

        const { success, message, order } = await createOrder(orderDetails)

        setIsSubmitting(false);

        if (!success) {
            addOperationResult({
                status: "error",
                message: message,
            });
            router.replace("/cart");
            return;
        }
        addOperationResult({
            status: "success",
            message: message,
        });
        clearCart();
        router.replace("/account/orders/" + order?.id,);
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
                    variant={isSubmitting ? "disabled" : "primary"}
                    className="w-full max-w-120"
                    onClick={handlePlaceOrder}
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
