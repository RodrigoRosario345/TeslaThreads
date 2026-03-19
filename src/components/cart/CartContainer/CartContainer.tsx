'use client';

import { useCartStore } from "@/store";
import { CartEmpty } from "../CartEmpty/CartEmpty";
import { OrderSummary } from "../OrderSummary/OrderSummary";
import { CartList } from "../CartList/CartList";

export function CartContainer() {

    const addedProducts = useCartStore((state) => state.items);
    const subtotal = addedProducts.reduce(
        (total, product) => total + product.price * product.quantity,
        0,
    );

    return (
        <div>
            {addedProducts.length === 0 ? (
                <CartEmpty />
            ) : (
                <div className="flex flex-col lg:flex-row gap-13 lg:gap-30">
                    <CartList addedProducts={addedProducts} />
                    <div className="block lg:hidden w-full border-b-[0.5px] border-black"/>
                    <OrderSummary shipping={5.99} subtotal={subtotal} />
                </div>
            )}
        </div>
    );
}