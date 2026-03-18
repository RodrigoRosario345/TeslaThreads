import type { CartItem as CartItemType } from "@/interfaces";
import { CartItem } from "../CartItem/CartItem";

interface CartListProps {
    addedProducts: CartItemType[];
}

export function CartList({ addedProducts }: CartListProps) {

    return (
        <ul>
            {addedProducts.map((product) => (
                <CartItem key={product.id} product={product} />
            ))}
        </ul>
    );
}
