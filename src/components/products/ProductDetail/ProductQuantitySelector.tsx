import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

export interface ProductQuantitySelectorProps {
    quantity: string;
    inStock: number;
    onQuantityChange: (nextQuantity: string) => void;
}

export function ProductQuantitySelector({ quantity, inStock, onQuantityChange }: ProductQuantitySelectorProps) {

    const numericQuantity = Number(quantity);
    const [isValidQuantity, setIsValidQuantity] = useState<boolean>(true);

    const handleIncrease = () => {
        if (numericQuantity < inStock) {
            onQuantityChange((numericQuantity + 1).toString());
        }
    };

    const handleDecrease = () => {
        if (numericQuantity > 1) {
            onQuantityChange((numericQuantity - 1).toString());
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        if (event.target.value === "") {
            onQuantityChange("");
            return;
        }

        const rawValue = Number(event.target.value);

        if (Number.isNaN(rawValue)) {
            return;
        }

        if (rawValue < 1) {
            onQuantityChange("1");
            return;
        }

        if (rawValue > inStock) {
            onQuantityChange(inStock.toString());
            return;
        }

        onQuantityChange(rawValue.toString());
    };

    return (
        <div className="space-y-2">
            <p className="font-semibold text-sm">Quantity </p>
            <div className="flex items-center gap-2 ">
                <button
                    type="button"
                    className={
                        numericQuantity > 1 ? "cursor-pointer" : "cursor-not-allowed text-gray-300"
                    }
                    onClick={handleDecrease}
                    disabled={numericQuantity <= 1}
                    aria-label="Decrease quantity"
                >
                    <FaMinus />
                </button>

                <input
                    type="text"
                    value={quantity}
                    onChange={handleInputChange}
                    className="w-20 py-2 bg-gray-100 rounded font-semibold text-center focus:outline-none focus:ring-1 focus:ring-gray-300"
                />

                <button
                    type="button"
                    className={
                        numericQuantity < inStock
                            ? "cursor-pointer"
                            : "cursor-not-allowed text-gray-300"
                    }
                    onClick={handleIncrease}
                    disabled={numericQuantity >= inStock}
                    aria-label="Increase quantity"
                >
                    <FaPlus />
                </button>
            </div>
        </div>
    );
}
