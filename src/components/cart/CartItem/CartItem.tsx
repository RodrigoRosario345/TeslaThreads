import type { CartItem } from "@/interfaces";
import Image from "next/image";
import { QuantitySelector } from "./QuantitySelector";
import { Button, ConfirmDeleteModal, Modal } from "@/components";
import { useCartStore } from "@/store";
import { useState, useCallback } from "react";

export interface CartItemProps {
    product: CartItem;
    handleShowModal: () => void;
}

export function CartItem({ product, handleShowModal }: CartItemProps) {
  
    const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
    const removeItem = useCartStore((state) => state.removeItem);
    const quantities = Array.from({ length: product.stock }, (_, i) => i + 1);


    const handleShowConfirmDelete = useCallback(() => {
        setShowConfirmDelete(true);
    }, []);

    const handleRemove = useCallback(() => {
        removeItem(product.id, product.size);
    }, []);

    const handleCloseConfirmDelete = useCallback(() => {
        setShowConfirmDelete(false);
    }, []);

    return (
        <>
            <li className="w-full flex gap-5 text-sm">
                <Image
                    src={`${product.image}`}
                    alt={product.title}
                    width={100}
                    height={100}
                    objectFit="cover"
                />
                <div className="flex flex-col gap-1 w-full">
                    <h3 className="flex justify-between font-semibold gap-10 lg:gap-30">
                        <span>{product.title}</span>
                        <span>${product.price.toFixed(2)}</span>
                    </h3>
                    <p>Size: {product.size}</p>
                    <div className="flex gap-1">
                        Quantity:
                        {
                            <QuantitySelector
                                idItem={product.id}
                                sizeItem={product.size}
                                quantitySelected={product.quantity}
                                quantities={quantities}
                            />
                        }
                        <Button
                            type="button"
                            className="ml-10 pb-px border-b hover:border-b-2 cursor-pointer"
                            onClick={handleShowConfirmDelete}
                        >
                            Remove
                        </Button>
                    </div>
                </div>
            </li>

            {showConfirmDelete && (
                <ConfirmDeleteModal
                    text={`Do you really want to delete this ${product.title} (Size: ${product.size}) from your cart?`}
                    onDelete={handleRemove}
                    onClose={handleCloseConfirmDelete}
                    onOpenModalSuccess={handleShowModal}
                />
            )}
        </>
    );
}
