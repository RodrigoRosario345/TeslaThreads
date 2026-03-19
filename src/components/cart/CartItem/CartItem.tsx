import type { CartItem } from "@/interfaces";
import Image from "next/image";

export interface CartItemProps {
    product: CartItem;
}

export function CartItem({ product }: CartItemProps) {
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
                <h3 className="flex justify-between font-semibold gap-[30%]">
                    <span>{product.title}</span>
                    <span>${product.price.toFixed(2)}</span>
                </h3>
                <p>Size: {product.size}</p>
                <p>Quantity: {product.quantity}</p>
            </div>
        </li>
    );
}
