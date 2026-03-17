import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

export interface ProductQuantitySelectorProps {
    quantity: string;
    inStock: number;
    onQuantityChange: (nextQuantity: string) => void;
}

export function ProductQuantitySelector({
    quantity,
    inStock,
    onQuantityChange,
}: ProductQuantitySelectorProps) {
    const numericQuantity = Number(quantity);
    const [isValidQuantity, setIsValidQuantity] = useState<boolean>(true);

    const handleIncrease = () => {
        if (numericQuantity < inStock) {
            setIsValidQuantity(true);
            onQuantityChange((numericQuantity + 1).toString());
        }
    };

    const handleDecrease = () => {
        if (numericQuantity > 1) {
            setIsValidQuantity(true);
            onQuantityChange((numericQuantity - 1).toString());
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === "") {
            onQuantityChange("");
            setIsValidQuantity(true);
            return;
        }

        const rawValue = Number(event.target.value);

        if (Number.isNaN(rawValue)) {
            setIsValidQuantity(false);
            return;
        }

        if (rawValue < 1) {
            onQuantityChange("1");
            setIsValidQuantity(false);
            return;
        }

        if (rawValue > inStock) {
            onQuantityChange(inStock.toString());
            setIsValidQuantity(false);
            return;
        }
        setIsValidQuantity(true);
        onQuantityChange(rawValue.toString());
    };

    const handleInputBlur = () => {
        if (quantity === "") {
            onQuantityChange("1");
            setIsValidQuantity(true);
        }
    };

    useEffect(() => {
        if (isValidQuantity) return;

        setTimeout(() => {
            setIsValidQuantity(true);
        }, 2000);


    }, [isValidQuantity]);



    return (
        <div className="space-y-2">
            <p className="font-semibold text-sm">Quantity </p>
            <div className="flex items-center gap-2 ">
                <button
                    type="button"
                    className={
                        numericQuantity > 1
                            ? "cursor-pointer"
                            : "cursor-not-allowed text-gray-300"
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
                    onBlur={handleInputBlur}
                    className={`w-20 py-2 bg-gray-100 rounded font-semibold text-center focus:outline-none  transition-colors ${!isValidQuantity ? "border border-red-500" : "focus:ring-1 focus:ring-gray-300 "}`}
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
            {!isValidQuantity && (
                <p className="text-red-500 text-sm">Please enter a valid quantity.</p>
            )}
        </div>
    );
}
