import { CartItem } from "@/components/cart/CartItem/CartItem";
import { CartItem as CartItemType } from "@/interfaces";

export interface OrderReviewItemsProps {
    addedProducts: CartItemType[];
}

export function OrderReviewItems({ addedProducts }: OrderReviewItemsProps) {
    return (
        <div className="space-y-5">
            <ul className="w-full space-y-3">
                {addedProducts.map((product) => (
                    <li key={`${product.id}-${product.size}`}>
                        <CartItem
                            product={product}
                            isQuantitySelector={false}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
