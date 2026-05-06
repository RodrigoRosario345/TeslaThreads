import { CatalogData } from "@/interfaces";
import { ProductItem } from "../ProductItem/ProductItem";

export interface ProductListProps extends Omit<CatalogData, "categories"> { }

export function ProductList({ products }: ProductListProps) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 justify-center gap-8">
            {products.length > 0 ? (
                products.map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))
            ) : (
                <p className="text-center col-span-full text-gray-500">
                    No products found.
                </p>
            )}
        </div>
    );
}
