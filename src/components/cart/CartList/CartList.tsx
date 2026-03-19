import type { CartItem as CartItemType } from "@/interfaces";
import { CartItem } from "../CartItem/CartItem";

interface CartListProps {
    addedProducts: CartItemType[];
}

export function CartList({ addedProducts }: CartListProps) {

    return (
        <div>
            <ul className="w-full space-y-3">
                {addedProducts.map((product) => (
                    <CartItem key={product.id} product={product} />
                ))}
            </ul>
        </div>
    );
}
