import { ProductList, Title } from "@/components";
import { initialData } from "@/data/seed";

interface CategoryPageProps {
    params: {
        gender: string;
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {

    const { gender } = await params;
    const filteredProducts = initialData.products.filter(product => product.gender === gender);

    return (
        <>
            <Title title={gender} />
            <ProductList products={filteredProducts} />
        </>
    );
}