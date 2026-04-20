import { getProducts } from "@/actions/product";
import { Pagination, ProductList, Title } from "@/components";
import { Gender } from "@/interfaces";

interface CategoryPageProps {
    params: Promise<{
        gender: Gender;
    }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CategoryPage({
    params,
    searchParams,
}: CategoryPageProps) {
    const { gender } = await params;

    if (gender !== "men" && gender !== "women" && gender !== "kid") {
        return <div>Invalid category</div>;
    }

    const paramsSearch = await searchParams;
    console.log("Search params:", paramsSearch);

    const page = parseInt(paramsSearch.page as string) || 1;
    if (page < 1) {
        return <div>Invalid page number</div>;
    }

    const { products, totalPages } = await getProducts(page, gender);

    return (
        <>
            <Title title={gender} />
            <ProductList products={products} />
            {totalPages > 1 && page <= totalPages && (
                <Pagination
                    totalPages={totalPages}
                    currentPage={page}
                    urlBase={`/category/${gender}`}
                />
            )}
        </>
    );
}
