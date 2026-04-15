import { ProductList, Title } from "@/components";
import { catalogData } from "@/data";


interface CategoryPageProps {
    params: {
        gender: string;
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {

    const { gender } = await params;
    const filteredProducts = catalogData.products.filter(product => product.gender === gender);

    return (
        <>
            <Title title={gender} />
            <ProductList products={filteredProducts} />
        </>
    );
}