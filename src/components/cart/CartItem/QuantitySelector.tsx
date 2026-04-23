"use client";

import { ValidSizes } from "@/interfaces";
import { useCartStore } from "@/store";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export interface QuantitySelectorProps {
    idItem: string;
    sizeItem: ValidSizes;
    quantitySelected: number;
    quantities: number[];
}

export function QuantitySelector({
    idItem,
    sizeItem,
    quantitySelected,
    quantities,
}: QuantitySelectorProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const replaceQuantity = useCartStore((state) => state.replaceQuantity);

    const handleSelect = (quantity: number) => {
        replaceQuantity(idItem, sizeItem, quantity);
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col w-max relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex gap-1 items-center px-1 rounded-sm cursor-pointer border border-transparent focus:outline-none  focus:border-dashed focus:border-gray-400"
            >
                <span>{quantitySelected}</span>
                {isOpen ? <IoIosArrowDown size={16} /> : <IoIosArrowUp size={16} />}
            </button>

            {isOpen && (
                <ul className="absolute left-0 top-full max-h-40 w-max overflow-y-auto [&::-webkit-scrollbar]:w-1.25 [&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full bg-white border border-gray-300 rounded shadow-md mt-1 py-2 z-10">
                    {quantities.map((quantity) => (
                        <li
                            key={quantity}
                            className={`px-4 py-2 cursor-pointer ${quantity === quantitySelected ? "bg-gray-200" : "hover:bg-gray-200"}`}
                            onClick={() => handleSelect(quantity)}
                        >
                            {quantity}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
