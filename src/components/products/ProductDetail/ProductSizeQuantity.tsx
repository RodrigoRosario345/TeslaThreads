"use client";

import { ValidSizes } from "@/interfaces";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

export interface ProductSizeQuantityProps {
    sizes: ValidSizes[];
    inStock: number;
}

export function ProductSizeQuantity({
    sizes,
    inStock,
}: ProductSizeQuantityProps) {
    console.log("Sizes:", sizes, "In Stock:", inStock);

    const [selectedSize, setSelectedSize] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedSize(event.target.value);
    };

    const handleIncrease = () => {
        if (quantity < inStock) {
            setQuantity((prev) => prev + 1);
        }
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    return (
        <div className="space-y-1">
            <p className="font-semibold text-sm">Size </p>
            {sizes.length > 0 ? (
                <div className="flex gap-5">
                    {sizes.map((size, index) => (
                        <label
                            key={index}
                            htmlFor={`option-${index}`}
                            className={`font-bold py-0.5 border-b-2 transition-all hover:border-black cursor-pointer ${selectedSize === size ? "border-black" : "border-white"}`}
                        >
                            <input
                                id={`option-${index}`}
                                className="hidden"
                                type="radio"
                                name="optionsSize"
                                value={size}
                                checked={selectedSize === size}
                                onChange={handleOptionChange}
                            />
                            {size}
                        </label>
                    ))}
                </div>
            ) : (
                <p>No sizes available</p>
            )}
            <p className="font-semibold mt-4 text-sm">Quantity </p>
            <div className="flex items-center gap-2 ">
                <FaMinus className={quantity > 1 ? "cursor-pointer" : "cursor-not-allowed text-gray-300"} onClick={handleDecrease} />
                <input
                    type="text"
                    min="1"
                    max={inStock}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-20 py-2 bg-gray-100 rounded font-semibold text-center focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
                <FaPlus className={quantity < inStock ? "cursor-pointer" : "cursor-not-allowed text-gray-300"} onClick={handleIncrease} />
            </div>
        </div>
    );
}
