import type { Metadata } from "next";
import { getProducts } from "@/actions/product";
import { Pagination, ProductList } from "@/components";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Browse the latest collection of Tesla-inspired clothing, accessories and more at Tesla Threads.",
  openGraph: {
    title: "Tesla Threads",
    description:
      "Browse the latest collection of Tesla-inspired clothing, accessories and more.",
  },
};

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
        <Pagination totalPages={totalPages} currentPage={page} />
      )}
    </>
  );
}
