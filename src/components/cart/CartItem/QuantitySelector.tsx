"use client";

import { useCartStore } from "@/store";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export interface QuantitySelectorProps {
    idItem: string;
    quantitySelected: number;
    quantities: number[];
}

export function QuantitySelector({ idItem, quantitySelected, quantities }: QuantitySelectorProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const replaceQuantity = useCartStore((state) => state.replaceQuantity);

    const handleSelect = (quantity: number) => {
        replaceQuantity(idItem, quantity);
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col w-max text-sm relative" >
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex gap-1 items-center px-1 rounded-sm cursor-pointer focus:outline-none focus:border focus:border-dashed focus:border-gray-400"
            >
                <span>{quantitySelected}</span>
                {isOpen ? <IoIosArrowDown size={18} /> : <IoIosArrowUp size={18} />}
            </button>

            {isOpen && (
                <ul className="absolute left-0 top-full w-max bg-white border border-gray-300 rounded shadow-md mt-1 py-2">
                    {quantities.map((quantity) => (
                        <li
                            key={quantity}
                            className={`px-4 py-2 cursor-pointer ${quantity === quantitySelected ? "bg-gray-200" : "hover:bg-gray-100"}`}
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
