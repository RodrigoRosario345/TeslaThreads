import type { Metadata } from "next";
import { getProducts } from "@/actions/product";
import { Pagination, ProductList, Title } from "@/components";
import { Gender } from "@/interfaces";
import { notFound, redirect } from "next/navigation";

interface GenderPageProps {
    params: Promise<{
        gender: Gender;
    }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: GenderPageProps): Promise<Metadata> {
    const { gender } = await params;

    const label = gender === "men" ? "Men" : gender === "women" ? "Women" : "Kids";

    return {
        title: `${label}'s Collection`,
        description: `Shop the latest ${label.toLowerCase()}'s clothing and accessories at Tesla Threads.`,
        openGraph: {
            title: `${label}'s Collection | Tesla Threads`,
            description: `Shop the latest ${label.toLowerCase()}'s clothing and accessories.`,
        },
    };
}

export default async function GenderPage({
    params,
    searchParams,
}: GenderPageProps) {

    // Extract the gender parameter from the URL
    const { gender } = await params;

    if (gender !== "men" && gender !== "women" && gender !== "kid") {
        notFound();
    }

    // Extract the page query parameter for pagination
    const paramsSearch = await searchParams;

    const page = parseInt(paramsSearch.page as string) || 1;
    if (page < 1) {
        return redirect(`/gender/${gender}?page=1`);
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
                    baseUrl={`/gender/${gender}`}
                />
            )}
        </>
    );
}
