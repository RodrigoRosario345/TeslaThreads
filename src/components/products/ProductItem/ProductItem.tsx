import { SeedProduct } from "@/interfaces/product.model";
import Image from "next/image";

export interface ProductItemProps {
    product: SeedProduct;
}

export function ProductItem({ product }: ProductItemProps) {

    return (
        <article className="space-y-1">
            <Image
                className="rounded-sm"
                src={`/products/${product.images[0]}`}
                alt={product.title}
                width={400}
                height={400}
                loading="lazy"
            />
            <h2 className="font-bold" >{product.title}</h2>
            <p className="text-sm font-semibold">${product.price.toFixed(2)}</p>
        </article>
    )
}