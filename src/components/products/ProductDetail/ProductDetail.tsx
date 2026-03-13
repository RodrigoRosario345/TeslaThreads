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
                    // <div className="w-max flex">
                    //     {product.images.map((image, index) => (
                    //         <Image
                    //             key={index}
                    //             src={`/products/${image}`}
                    //             alt={product.title}
                    //             width="400"
                    //             height="400"
                    //             className="object-cover"
                    //         />
                    //     ))}
                    // </div>
                    <Carousel
                        baseWidth={500}
                        autoplay={false}
                        autoplayDelay={5000}
                        pauseOnHover={false}
                        loop={false}
                        round={false}
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
