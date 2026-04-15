import { ProductList } from "@/components";
import { catalogData } from "@/data";

export default function ShopPage() {

  const { products } = catalogData;

  return (
    <ProductList products={products} />
  );
}
