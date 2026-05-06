"use client";


import { CatalogProduct } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export interface ProductItemProps {
    product: CatalogProduct;
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
        <Link href={`/product/${product.slug}`}>
            <article className="space-y-1 cursor-pointer">
                <Image
                    className="rounded-sm"
                    src={`/products/${imagen}`}
                    alt={product.title}
                    width={500}
                    height={500}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                />
                <h2 className="text-sm md:text-base font-bold">{product.title}</h2>
                <p className="text-xs md:text-sm font-semibold">${product.price.toFixed(2)}</p>
            </article>
        </Link>
    );
}
