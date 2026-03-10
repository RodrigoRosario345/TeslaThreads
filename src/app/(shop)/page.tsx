import { ProductList } from "@/components";
import { initialData } from "@/data/seed";

export default function ShopPage() {

  const products = initialData.products;

  return (
    <ProductList products={products} />
  );
}
