import { getProductBySlug } from "@/actions/product";
import { ProductDetail } from "@/components";

import { NextPage } from "next";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

const ProductPage: NextPage<Props> = async ({ params }) => {
    const { slug } = await params;
    
    const product = await getProductBySlug(slug);
    if (!product) {
        notFound();
    }

    return product && <ProductDetail product={product} />;
};

export default ProductPage;
