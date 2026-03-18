'use client';

import { useCartStore } from "@/store";
import { CartEmpty } from "../CartEmpty/CartEmpty";

export function CartList() {

    const addedProducts = useCartStore((state) => state.items);

    return (
        <div>
            {addedProducts.length === 0 ? (
                <CartEmpty />
            ) : (
                <ul>
                    {addedProducts.map((product) => (
                        <li key={product.id}>
                            <span>{product.name}</span>
                            <span>${product.price.toFixed(2)}</span>
                            <span>Quantity: {product.quantity}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}