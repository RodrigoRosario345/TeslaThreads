import { getProducts } from "@/actions/product";
import { Pagination, ProductList } from "@/components";

interface ShopPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;

  const page = parseInt(params.page as string) || 1;
  const { products, totalPages } = await getProducts(page);

  return (
    <>
      <ProductList products={products} />
      {totalPages > 1 && (
        <Pagination totalPages={totalPages} currentPage={page} maxVisiblePages={3} />
      )}
    </>
  );
}
