import type { CartItem as CartItemType } from "@/interfaces";
import { CartItem } from "../CartItem/CartItem";
import Link from "next/link";

interface CartListProps {
    addedProducts: CartItemType[];
}

export function CartList({ addedProducts }: CartListProps) {

    return (
        <div className="space-y-5">
            <p className="text-gray-600">
                Add more items to your cart to qualify for free shipping.
            </p>
            <Link
                href="/"
                className="w-auto text-sm underline underline-offset-3 hover:decoration-2 cursor-pointer inline-block"
            >
                Continue Shopping
            </Link>
            <ul className="w-full space-y-3">
                {addedProducts.map((product) => (
                    <li key={`${product.id}-${product.size}`}>
                        <CartItem product={product} />
                    </li>
                ))}
            </ul>
        </div>


    );
}
