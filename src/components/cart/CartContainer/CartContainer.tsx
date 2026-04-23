'use client';

import { useCartStore } from "@/store";
import { CartEmpty } from "../CartEmpty/CartEmpty";
import { OrderSummary } from "../OrderSummary/OrderSummary";
import { CartList } from "../CartList/CartList";
import { useShallow } from 'zustand/react/shallow';

export function CartContainer() {

    const addedProducts = useCartStore((state) => state.items);
    const { subtotal, shipping, tax, total } = useCartStore(useShallow((state) => state.getOrderSummary()));

    return (
        <div>
            {addedProducts.length === 0 ? (
                <CartEmpty />
            ) : (
                <div className="flex flex-col lg:flex-row gap-6 sm:gap-10 lg:gap-30">
                    <div className="block lg:hidden w-full border-b-[0.5px] border-gray-300" />
                    <CartList addedProducts={addedProducts} />
                    <div className="block lg:hidden w-full border-b-[0.5px] border-black" />
                    <OrderSummary shipping={shipping} subtotal={subtotal} tax={tax} total={total} />
                </div>
            )}
        </div>
    );
}  