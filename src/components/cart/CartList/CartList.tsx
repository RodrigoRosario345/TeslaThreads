import type { CartItem as CartItemType } from "@/interfaces";
import { CartItem } from "../CartItem/CartItem";
import Link from "next/link";
import { Button } from "@/components/ui/Button/Button";

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
                href="/"            >
                <Button variant="link" className="mb-4">
                    Continue Shopping
                </Button>
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
