"use client";

import Carousel, { ProductAddedModal } from "@/components";

import Image from "next/image";
import { ProductSizeQuantity } from "./ProductSizeQuantity";
import { useState } from "react";
import { CatalogProduct } from "@/interfaces";
import { useCartStore } from "@/store";
import { formatPrice } from "@/helpers";

export interface ProductDetailProps {
    product: CatalogProduct;
}

export function ProductDetail({ product }: ProductDetailProps) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const itemAddedRecently = useCartStore((state) => state.itemAddedRecently);
    const isItemAddedRecently = !!itemAddedRecently;
    const clearItemAddedRecently = useCartStore(
        (state) => state.clearItemAddedRecently,
    );

    const handleCloseModal = () => {
        clearItemAddedRecently();
    };

    return (
        <>
            <article className="w-full flex flex-col lg:flex-row gap-5 sm:gap-10">
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
                                        sizes="max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        fill
                                        src={`/products/${item}`}
                                        alt={product.title}
                                        draggable={false}
                                        loading="eager"
                                        onLoad={() => setIsLoading(false)}
                                        className="object-cover"
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
                    <h2 className="text-lg md:text-xl lg:text-2xl mb-2 font-semibold">
                        {product.title}
                    </h2>
                    <p className="text-base md:text-lg lg:text-xl font-semibold">
                        {formatPrice(product.price)}
                    </p>
                    <p className="text-sm text-gray-500 font-medium">In stock: {product.inStock}</p>
                    {product.inStock > 0 ? (
                        <ProductSizeQuantity product={product} />
                    ) : (
                        <p className="text-red-500 font-semibold">Out of stock</p>
                    )}
                    <div className="text-sm">
                        <p className="font-semibold mb-3">Description</p>
                        <p>{product.description}</p>
                    </div>
                </div>
            </article>
            {isItemAddedRecently && (
                <ProductAddedModal
                    onClose={handleCloseModal}
                    itemAddedRecently={itemAddedRecently}
                />
            )}
        </>
    );
}
