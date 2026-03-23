import type { CartItem } from "@/interfaces";
import Image from "next/image";
import { QuantitySelector } from "./QuantitySelector";
import { Button } from "@/components";
import { useCartStore } from "@/store";

export interface CartItemProps {
    product: CartItem;
}

export function CartItem({ product }: CartItemProps) {

    const removeItem = useCartStore((state) => state.removeItem);


    return (
        <li className="w-full flex gap-5 text-sm">
            <Image
                src={`${product.image}`}
                alt={product.title}
                width={100}
                height={100}
                objectFit="cover"
            />
            <div className="flex flex-col gap-1 w-full">
                <h3 className="flex justify-between font-semibold gap-10 lg:gap-30">
                    <span>{product.title}</span>
                    <span>${product.price.toFixed(2)}</span>
                </h3>
                <p>Size: {product.size}</p>
                <div className="flex gap-1">
                    Quantity:
                    {
                        <QuantitySelector
                            idItem={product.id}
                            quantitySelected={product.quantity}
                            quantities={[1, 2, 3, 4, 5]}
                        />
                    }
                    <Button
                        className="ml-10 pb-px border-b hover:border-b-2 cursor-pointer"
                        onClick={() => removeItem(product.id)}
                    >

                        Remove
                    </Button>
                </div>
            </div>
        </li>
    );
}
