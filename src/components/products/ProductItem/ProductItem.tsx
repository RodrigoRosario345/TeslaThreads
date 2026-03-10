"use client";

import { SeedProduct } from "@/interfaces/product.model";
import Image from "next/image";
import { useState } from "react";

export interface ProductItemProps {
    product: SeedProduct;
}

export function ProductItem({ product }: ProductItemProps) {
    const [imagen, setImage] = useState<String>(product.images[0]);

    const handleMouseEnter = () => {
        setImage(product.images[1]);
    };
    const handleMouseLeave = () => {
        setImage(product.images[0]);
    };

    return (
        <article className="space-y-1 cursor-pointer">
            <Image
                className="rounded-sm"
                src={`/products/${imagen}`}
                alt={product.title}
                width={500}
                height={500}
                loading="eager"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
            <h2 className="font-bold">{product.title}</h2>
            <p className="text-sm font-semibold">${product.price.toFixed(2)}</p>
        </article>
    );
}
