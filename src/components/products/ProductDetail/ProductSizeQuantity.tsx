"use client";

import { SeedProduct, ValidSizes } from "@/interfaces";
import { useState } from "react";
import { ProductQuantitySelector } from "./ProductQuantitySelector";
import { ProductSizeSelector } from "./ProductSizeSelector";
import { Button } from "@/components";
import { useCartStore } from "@/store";

export interface ProductSizeQuantityProps {
    product: SeedProduct;
}

export function ProductSizeQuantity({
    product: { id, images, title, price, sizes, inStock },
}: ProductSizeQuantityProps) {
    const [selectedSize, setSelectedSize] = useState<ValidSizes | null>(null);
    const [quantity, setQuantity] = useState<string>("1");
    const [isInValidSize, setIsInValidSize] = useState<boolean>(false);
    const addItemToCart = useCartStore((state) => state.addItem);

    const handleSizeChange = (size: ValidSizes) => {
        setSelectedSize(size);
        setIsInValidSize(false);
    };

    const handleQuantityChange = (nextQuantity: string) => {
        setQuantity(nextQuantity);
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            setIsInValidSize(true);
            return;
        }
        setIsInValidSize(false);
        addItemToCart({
            id,
            image: `/products/${images[0]}`,
            title,
            price,
            quantity: parseInt(quantity),
            size: selectedSize,
        });
    };

    return (
        <div className="space-y-5">
            <ProductSizeSelector
                sizes={sizes}
                selectedSize={selectedSize}
                onSizeChange={handleSizeChange}
            />

            {isInValidSize && (
                <p className="text-red-500 text-sm">Please select a size.</p>
            )}

            <ProductQuantitySelector
                quantity={quantity}
                inStock={inStock}
                onQuantityChange={handleQuantityChange}
            />

            <Button buttonStyle="primary" onClick={handleAddToCart}>
                Add to Cart
            </Button>
        </div>
    );
}
