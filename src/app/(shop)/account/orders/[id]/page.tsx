
import { getOrderById } from "@/actions";
import { Metadata, NextPage } from "next";
import { notFound } from "next/navigation";

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//     // read route params
//     const { slug } = await params;

//     const product = await getProductBySlug(slug);

//     return {
//         title: (product?.title || 'Product Not Found') + ' | Tesla Threads',
//         description: product?.description || 'No description available.',
//         openGraph: {
//             title: product?.title || 'Product Not Found',
//             description: product?.description || 'No description available.',
//             images: `/products/${product?.images[0] || 'default-image.jpg'}`,
//         },
//     }
// }
interface Props {
    params: Promise<{ id: string }>;
}

const OrderPage: NextPage<Props> = async ({ params }) => {
    const { id } = await params;

    const orderResult = await getOrderById(id);
    if (!orderResult.data || !orderResult.success) {
        notFound();
    }

    return (
        <div>
            {JSON.stringify(orderResult.data, null, 2)}
        </div>
    )
};

export default OrderPage;
