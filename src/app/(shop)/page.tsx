import { ProductList } from "@/components";
import { catalogData } from "@/data";
import { ValidTypes } from "@/interfaces";
import prisma from "@/lib/prisma";

export default async function ShopPage() {
  // const { products } = catalogData;

  const productsData = await prisma.product.findMany({
     
    include: {
      images: {
        select: { url: true },
      },
      category: {
        select: { name: true },
      },
    },
  });

  const products = productsData.map((product) => ({
    id: product.id,
    title: product.title,
    description: product.description,
    inStock: product.inStock,
    price: product.price,
    sizes: product.sizes,
    slug: product.slug,
    tags: product.tags,
    gender: product.gender,
    images: product.images.map((image) => image.url),
    type: product.category.name as ValidTypes,
  }));

  console.log(productsData);

  return <ProductList products={products} />;
}
