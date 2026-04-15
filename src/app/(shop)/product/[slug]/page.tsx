import { ProductDetail } from "@/components";
import { catalogData } from "@/data";

import { NextPage } from "next";

interface Props {
    params: {
        slug: string;
    };
}

const ProductPage: NextPage<Props> = async ({ params }) => {
    const { slug } = await params;
    const findedProduct = catalogData.products.find(
        (product) => product.slug === slug,
    );

    return (findedProduct && <ProductDetail product={findedProduct} />);
};

export default ProductPage;
