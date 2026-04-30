import type { CartItem as CartItemType } from "@/interfaces";
import { CartItem } from "../CartItem/CartItem";
import Link from "next/link";
import { useCallback, useState } from "react";
import { Modal } from "@/components/ui/Modal/Modal";

interface CartListProps {
    addedProducts: CartItemType[];
}

export function CartList({ addedProducts }: CartListProps) {

    const [showModal, setShowModal] = useState<boolean>(false);

    const handleShowModal = useCallback(() => {
        setShowModal(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setShowModal(false);
    }, []);
    
    return (
        <>
            <div className="space-y-5">
                <Link
                    href="/"
                    className="w-auto text-sm underline underline-offset-3 hover:decoration-2 cursor-pointer inline-block"
                >
                    Continue Shopping
                </Link>
                <ul className="w-full space-y-3">
                    {addedProducts.map((product) => (
                        <CartItem key={`${product.id}-${product.size}`} product={product} handleShowModal={handleShowModal} />
                    ))}
                </ul>
            </div>
            {showModal && (
                <Modal
                    status="success"
                    message="The item has been removed from your cart successfully."
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
}
