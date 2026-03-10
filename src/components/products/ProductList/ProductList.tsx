import { SeedData } from "@/interfaces/product.model";
import { ProductItem } from "../ProductItem/ProductItem";

export interface ProductListProps extends SeedData { }

export function ProductList({ products }: ProductListProps) {
    return (
        <div className="grid grid-cols-3 gap-4">
            {products.map((product) => (
                <ProductItem key={product.slug} product={product} />
            ))}
        </div>
    );
}
