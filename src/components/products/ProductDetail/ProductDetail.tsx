'use client';

import Carousel from "@/components";
import { SeedProduct } from "@/interfaces";
import Image from "next/image";
import { ProductSizeQuantity } from "./ProductSizeQuantity";

export interface ProductDetailProps {
    product: SeedProduct;
}

export function ProductDetail({ product }: ProductDetailProps) {
    return (
        <article className="flex gap-12">
            <div className="">
                {product.images.length > 0 ? (
                    <Carousel<string>
                        items={product.images}
                        renderChildrenItem={(item, index) => (
                            <Image
                                key={index}
                                fill={true}
                                src={`/products/${item}`}
                                alt={product.title}
                                objectFit="cover"
                                preload
                            />
                        )}
                        baseWidth={900}
                    />
                ) : (
                    <p>No images available</p>
                )}
            </div>
            <div className="space-y-4">
                <h2 className="text-3xl mb-2 font-semibold">{product.title}</h2>
                <p className="text-xl font-semibold">${product.price.toFixed(2)}</p>
                <ProductSizeQuantity sizes={product.sizes} inStock={product.inStock} />
                <div className="text-sm">
                    <p className="font-semibold mb-3">Description</p>
                    <p>{product.description}</p>
                </div>
            </div>
        </article>
    );
}
