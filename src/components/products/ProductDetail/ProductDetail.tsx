'use client';

import Carousel from "@/components";
import { SeedProduct } from "@/interfaces";
import Image from "next/image";
import { ProductSizeQuantity } from "./ProductSizeQuantity";
import { useState } from "react";

export interface ProductDetailProps {
    product: SeedProduct;
}

export function ProductDetail({ product }: ProductDetailProps) {

    const [isLoading, setIsLoading] = useState<boolean>(true);

    return (
        <article className="w-full flex flex-col lg:flex-row gap-6 sm:gap-12">
            <div className="w-[calc(100%+3rem)] sm:w-full lg:w-[65%] -mx-6 sm:mx-0 relative">
                {product.images.length > 0 ? (
                    <Carousel<string>
                        items={product.images}
                        renderChildrenItem={(item, index) => (
                            <>
                                {isLoading && (
                                    <div className="m-auto size-10 animate-spin border-3 border-blue-500 border-t-transparent rounded-full" />
                                )}
                                <Image
                                    key={index}
                                    fill
                                    src={`/products/${item}`}
                                    alt={product.title}
                                    objectFit="cover"
                                    draggable={false}
                                    onLoadingComplete={() => setIsLoading(false)}
                                />
                            </>
                        )}
                        autoplay
                        autoplayDelay={5000}
                    />
                ) : (
                    <p>No images available</p>
                )}
            </div>
            <div className="space-y-4 w-full lg:w-[35%]">
                <h2 className="text-lg md:text-xl lg:text-2xl mb-2 font-semibold">{product.title}</h2>
                <p className="text-base md:text-lg lg:text-xl font-semibold">${product.price.toFixed(2)}</p>
                <ProductSizeQuantity product={product} />
                <div className="text-sm">
                    <p className="font-semibold mb-3">Description</p>
                    <p>{product.description}</p>
                </div>
            </div>
        </article>
    );
}
