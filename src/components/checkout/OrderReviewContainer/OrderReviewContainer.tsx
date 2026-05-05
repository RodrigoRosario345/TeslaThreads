"use client";

import { CartEmpty } from "@/components/cart/CartEmpty/CartEmpty";
import { OrderSummary } from "@/components/cart/OrderSummary/OrderSummary";
import { useCartStore, useDeliveryAddressStore } from "@/store";
import { useShallow } from "zustand/react/shallow";
import { OrderReviewItems } from "../OrderReviewItems/OrderReviewItems";

export function OrderReviewContainer() {
    const addedProducts = useCartStore((state) => state.items);
    const { subtotal, shipping, tax, total, totalItems } = useCartStore(
        useShallow((state) => state.getOrderSummary()),
    );
    const shippingAddress = useDeliveryAddressStore((state) => state.deliveryAddress);

    return (
        <section>
            {addedProducts.length === 0 ? (
                <CartEmpty />
            ) : (
                <div className="flex flex-col lg:flex-row gap-6 sm:gap-10 lg:gap-30">
                    <div className="block lg:hidden w-full border-b-[0.5px] border-gray-300" />
                    <OrderReviewItems addedProducts={addedProducts} />
                    <div className="block lg:hidden w-full border-b-[0.5px] border-black" />
                    <OrderSummary
                        shipping={shipping}
                        subtotal={subtotal}
                        tax={tax}
                        total={total}
                        title={`Order Summary${totalItems ? ` (${totalItems} items)` : ''}`}
                        buttonText="Place Order"
                        shippingAddress={shippingAddress}
                        isOrderReview

                    />
                </div>
            )}
        </section>
    );
}
