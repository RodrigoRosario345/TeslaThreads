"use client";

import { CartEmpty } from "@/components/cart/CartEmpty/CartEmpty";
import { useCartStore } from "@/store";
import { useShallow } from "zustand/react/shallow";
import { OrderReviewItems } from "../OrderReviewItems/OrderReviewItems";
import { CheckoutOrderSummary } from "../CheckoutOrderSummary/CheckoutOrderSummary";
import { useEffect, useState } from "react";
import { OrderReviewSkeleton } from "../OrderReviewSkeleton/OrderReviewSkeleton";

export function OrderReviewContainer() {
    const addedProducts = useCartStore((state) => state.items);
    const { subtotal, shipping, tax, total, totalItems } = useCartStore(
        useShallow((state) => state.getOrderSummary()),
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
    }, []);

    if (!isLoading) {
        return <OrderReviewSkeleton />;
    }

    return (
        <section>
            {addedProducts.length === 0 ? (
                <CartEmpty />
            ) : (
                <div className="flex flex-col lg:flex-row gap-6 sm:gap-10 lg:gap-30">
                    <div className="block lg:hidden w-full border-b-[0.5px] border-gray-300" />
                    <OrderReviewItems addedProducts={addedProducts} />
                    <div className="block lg:hidden w-full border-b-[0.5px] border-black" />
                    <CheckoutOrderSummary
                        shipping={shipping}
                        subtotal={subtotal}
                        tax={tax}
                        total={total}
                        totalItems={totalItems}
                    />
                </div>
            )}
        </section>
    );
}
