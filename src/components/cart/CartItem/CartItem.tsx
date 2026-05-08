import type { CartItem } from "@/interfaces";
import Image from "next/image";
import { QuantitySelector } from "./QuantitySelector";
import { Button, ConfirmDeleteModal } from "@/components";
import { useCartStore } from "@/store";
import { useState, useCallback } from "react";
import { formatPrice } from "@/helpers";
import Link from "next/link";

export interface CartItemProps {
    product: CartItem;
    isQuantitySelector?: boolean;
}

export function CartItem({
    product,
    isQuantitySelector = true,
}: CartItemProps) {
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
            <article className="w-full flex gap-5 text-sm ">
                <Image
                    src={`${product.image}`}
                    alt={product.title}
                    width={100}
                    height={100}
                    objectFit="cover"
                />
                <div className="w-full space-y-1">
                    <h3 className="flex justify-between font-medium gap-10 lg:gap-25">
                        <Link href={`/product/${product.slug}`} className="text-start hover:underline hover:underline-offset-2">
                            {product.title}
                        </Link>
                        <span>{formatPrice(product.price)}</span>
                    </h3>
                    <p>Size: {product.size}</p>
                    {isQuantitySelector ? (
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
                    ) : (
                        <p>Quantity: {product.quantity}</p>
                    )}
                </div>
            </article>

            {showConfirmDelete && (
                <ConfirmDeleteModal
                    text={`Do you really want to delete this ${product.title} (Size: ${product.size}) from your cart?`}
                    onDelete={handleRemove}
                    onClose={handleCloseConfirmDelete}
                />
            )}
        </>
    );
}
