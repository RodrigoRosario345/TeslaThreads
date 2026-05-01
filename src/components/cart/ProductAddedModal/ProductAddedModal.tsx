"use client";

import { Button } from "@/components/ui/Button/Button";
import { useModal } from "@/hooks";
import { useCartStore } from "@/store";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { useShallow } from "zustand/react/shallow";
import { CartItem as CartItemType } from "@/interfaces";
import { CartItem } from "../CartItem/CartItem";

export interface ProductAddedModalProps {
    onClose: () => void;
    itemAddedRecently: CartItemType
}

export function ProductAddedModal({ onClose, itemAddedRecently }: ProductAddedModalProps) {
    const { subtotal, totalItems } = useCartStore(
        useShallow((state) => state.getOrderSummary()),
    );

    const { backdropRef, modalRef, closeModal } = useModal({
        onClose,
        autoCloseDelay: 5000,
    });

    return (
        <>
            {/* Backdrop */}
            <div
                className="w-full h-screen fixed inset-0 z-50 bg-transparent"
                onClick={closeModal}
                ref={backdropRef}
                aria-hidden="true"
            />

            {/* Modal */}
            <div
                role="dialog"
                aria-modal="true"
                className="fixed top-10 right-0 z-50"
                ref={modalRef}
            >
                <div className="w-full max-w-115 space-y-10 p-8 rounded-2xl bg-white text-center shadow-lg">
                    {/* Icon Close */}
                    <IoClose
                        size={40}
                        onClick={closeModal}
                        className="cursor-pointer my-0 ml-auto -mr-3 text-black/75 hover:text-black"
                        aria-label="close"
                    />

                    {/* Title */}
                    <h2
                        id="modal-cart-success-title"
                        className="text-start text-xl sm:text-2xl font-semibold"
                    >
                        Item added to cart!
                    </h2>

                    {/* Added Products */}
                    <ul className="w-full space-y-3">
                        <CartItem
                            key={`${itemAddedRecently.id}-${itemAddedRecently.size}`}
                            product={itemAddedRecently}
                            isQuantitySelector={false}
                        />
                    </ul>

                    {/* Order Summary */}
                    <div className="w-full border-t-[0.1px] border-gray-400" />
                    <div className="w-full space-y-2">
                        <div className="flex justify-between font-semibold text-xl">
                            <span>Subtotal:</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <p className="text-start text-sm">Excludes sales tax.</p>
                    </div>

                    {/* Actions */}
                    <Link
                        href="/cart"
                        className="w-full inline-block bg-black hover:bg-gray-800 text-white font-medium p-2 rounded text-sm outline-2 outline-black border-2 border-white mb-4"
                    >
                        View Cart ({totalItems})
                    </Link>
                    <Link href="/checkout/address" className="w-full">
                        <Button buttonStyle="primary" className="w-full p-2! hover:p-2!">
                            Checkout
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
}
