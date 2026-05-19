import type { CartItem as CartItemType } from "@/interfaces";
import { CartItem } from "../CartItem/CartItem";
import Link from "next/link";
import { Button } from "@/components/ui/Button/Button";
import { useCartStore } from "@/store";
import { ConfirmDeleteModal } from "@/components/ui/Modal/ConfirmDeleteModal";
import { useConfirmDeleteModal } from "@/hooks";

interface CartListProps {
    addedProducts: CartItemType[];
}

export function CartList({ addedProducts }: CartListProps) {
    const clearCart = useCartStore((state) => state.clearCart);
   const { handleCloseConfirmDelete, handleShowConfirmDelete, showConfirmDelete } = useConfirmDeleteModal();
    return (
        <>
            <div className="space-y-5">
                <p className="text-gray-600">
                    Add more items to your cart to qualify for free shipping.
                </p>
                <Link href="/">
                    <Button variant="link" className="mb-4">
                        Continue Shopping
                    </Button>
                </Link>
                <ul className="w-full space-y-3 ">
                    {addedProducts.map((product) => (
                        <li
                            key={`${product.id}-${product.size}`}
                            className="mb-4 border-b border-gray-200 pb-4"
                        >
                            <CartItem product={product} />
                        </li>
                    ))}
                </ul>
                <Button
                    variant="link"
                    className="block ml-auto"
                    onClick={handleShowConfirmDelete}
                >
                    Remove all items
                </Button>
            </div>
            {showConfirmDelete && (
                <ConfirmDeleteModal
                    text={`Do you really want to delete all items from your cart?`}
                    onDelete={clearCart}
                    onClose={handleCloseConfirmDelete}
                />
            )}
        </>
    );
}
