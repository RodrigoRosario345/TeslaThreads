import Carousel from "@/components";
import { SeedProduct } from "@/interfaces";
import Image from "next/image";

export interface ProductDetailProps {
    product: SeedProduct;
}

export function ProductDetail({ product }: ProductDetailProps) {
    return (
        <article className="">
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
                        loop={true}
                        round={false}
                    />
                ) : (
                    <p>No images available</p>
                )}
            </div>
            <h2>{product.title}</h2>
            <p>${product.price.toFixed(2)}</p>
        </article>
    );
}
