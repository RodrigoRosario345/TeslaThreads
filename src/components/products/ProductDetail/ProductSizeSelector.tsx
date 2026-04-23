import { ValidSizes } from "@/interfaces";

export interface ProductSizeSelectorProps {
    sizes: ValidSizes[];
    selectedSize: ValidSizes | null;
    isInValidSize: boolean;
    onSizeChange: (size: ValidSizes) => void;
}

export function ProductSizeSelector({
    sizes,
    selectedSize,
    isInValidSize,
    onSizeChange,
}: ProductSizeSelectorProps) {
    return (
        <div className="space-y-2">
            <p className="font-semibold text-sm">Size </p>
            {sizes.length > 0 ? (
                <div className="flex gap-5">
                    {sizes.map((size) => {
                        const inputId = `size-option-${size}`;
                        return (
                            <label
                                key={size}
                                htmlFor={inputId}
                                className={`font-bold py-0.5 border-b-2 transition-all hover:border-black cursor-pointer ${selectedSize === size ? "border-black" : "border-white"}`}
                            >
                                <input
                                    id={inputId}
                                    className="hidden"
                                    type="radio"
                                    name="product-size"
                                    value={size}
                                    checked={selectedSize === size}
                                    onChange={() => onSizeChange(size)}
                                />
                                {size}
                            </label>
                        );
                    })}
                </div>
            ) : (
                <p>No sizes available</p>
            )}
            {isInValidSize && (
                <p className="text-red-500 text-sm">Please select a size.</p>
            )}
        </div>
    );
}
