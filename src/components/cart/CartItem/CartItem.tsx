import type { CartItem } from "@/interfaces";

export interface CartItemProps {
    product: CartItem;
}

export function CartItem({ product }: CartItemProps) {

    return (
        <li>
            <span>{product.title}</span>
            <span>${product.price.toFixed(2)}</span>
            <span>Size: {product.size}</span>
            <span>Quantity: {product.quantity}</span>
        </li>
    )
}