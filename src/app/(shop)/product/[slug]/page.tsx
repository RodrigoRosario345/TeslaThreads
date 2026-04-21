import { getProductBySlug } from "@/actions/product";
import { ProductDetail } from "@/components";

import { Metadata, NextPage } from "next";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    // read route params
    const { slug } = await params;

    const product = await getProductBySlug(slug);

    return {
        title: (product?.title || 'Product Not Found') + ' | Tesla Threads',
        description: product?.description || 'No description available.',
        openGraph: {
            title: product?.title || 'Product Not Found',
            description: product?.description || 'No description available.',
            images: `/products/${product?.images[0] || 'default-image.jpg'}`,
        },
    }
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
