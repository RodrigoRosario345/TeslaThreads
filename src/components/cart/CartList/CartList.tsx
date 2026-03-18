'use client';

import { useCartStore } from "@/store";
import { CartEmpty } from "../CartEmpty/CartEmpty";
import { OrderSummary } from "../OrderSummary/OrderSummary";
import { CartItem } from "../CartItem/CartItem";

export function CartList() {

    const addedProducts = useCartStore((state) => state.items);
    const subtotal = addedProducts.reduce((total, product) => total + product.price * product.quantity, 0);

    return (
        <div>
            {addedProducts.length === 0 ? (
                <CartEmpty />
            ) : (
                <div className="flex gap-8">
                    <ul>
                        {addedProducts.map((product) => (<CartItem key={product.id} product={product} />))}
                    </ul>
                    <OrderSummary shipping={5.99} subtotal={subtotal} />
                </div>

            )}
        </div>
    )
}