import { ProductDetail } from "@/components";
import { initialData } from "@/data/seed";
import { NextPage } from "next";

interface Props {
    params: {
        slug: string;
    };
}

const ProductPage: NextPage<Props> = async ({ params }) => {
    const { slug } = await params;
    const findedProduct = initialData.products.find(
        (product) => product.slug === slug,
    );

    return (findedProduct && <ProductDetail product={findedProduct} />);
};

export default ProductPage;
