import type { CartItem } from "@/interfaces";
import Image from "next/image";
import { QuantitySelector } from "./QuantitySelector";
import { Button, ConfirmDeleteModal } from "@/components";
import { useCartStore } from "@/store";
import { useCallback } from "react";
import { formatPrice } from "@/helpers";
import Link from "next/link";
import { useShallow } from "zustand/react/shallow";
import { useConfirmDeleteModal } from "@/hooks";

export interface CartItemProps {
    product: CartItem;
    isModifiable?: boolean;
}

export function CartItem({ product, isModifiable = true }: CartItemProps) {
    const removeItem = useCartStore((state) => state.removeItem);
    const { handleCloseConfirmDelete, handleShowConfirmDelete, showConfirmDelete } = useConfirmDeleteModal();
    const othersSizeSameProduct = useCartStore(
        useShallow((state) =>
            state.items.filter(
                (item) => item.id === product.id && item.size !== product.size,
            ),
        ),
    );
    const quantityOfOthersSizeSameProduct = othersSizeSameProduct.reduce(
        (total, item) => total + item.quantity,
        0,
    );
    const quantities = Array.from(
        { length: product.stock - quantityOfOthersSizeSameProduct },
        (_, i) => i + 1,
    );


    const handleRemove = useCallback(() => {
        removeItem(product.id, product.size);
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
                        {isModifiable ? (
                            <Link
                                href={`/product/${product.slug}`}
                                className="text-start hover:underline hover:underline-offset-2"
                            >
                                {product.title}
                            </Link>
                        ) : (
                            <span>{product.title}</span>
                        )}
                        <span>{formatPrice(product.price)}</span>
                    </h3>
                    <p>Size: {product.size}</p>
                    {isModifiable ? (
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
                                variant="link"
                                className="ml-4"
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
