"use client";

import { ValidSizes } from "@/interfaces";
import { useState } from "react";
import { ProductQuantitySelector } from "./ProductQuantitySelector";
import { ProductSizeSelector } from "./ProductSizeSelector";

export interface ProductSizeQuantityProps {
    sizes: ValidSizes[];
    inStock: number;
}

export function ProductSizeQuantity({ sizes, inStock }: ProductSizeQuantityProps) {
    const [selectedSize, setSelectedSize] = useState<ValidSizes | null>(null);
    const [quantity, setQuantity] = useState<string>("1");
    const [isInValidSize, setIsInValidSize] = useState<boolean>(false);

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
        alert(`Added ${quantity} of size ${selectedSize} to cart!`);
    };


    return (
        <div className="space-y-5">
            <ProductSizeSelector
                sizes={sizes}
                selectedSize={selectedSize}
                onSizeChange={handleSizeChange}
            />

            {isInValidSize && <p className="text-red-500 text-sm">Please select a size.</p>}
            
            <ProductQuantitySelector
                quantity={quantity}
                inStock={inStock}
                onQuantityChange={handleQuantityChange}
            />

            <button
                className="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800 transition-colors cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
                onClick={handleAddToCart}
            >
                Add to Cart
            </button>
        </div>
    );
}
