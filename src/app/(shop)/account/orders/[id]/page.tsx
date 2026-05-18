
import type { Metadata, NextPage } from "next";
import { getOrderById } from "@/actions";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const orderResult = await getOrderById(id);

    if (!orderResult.data || !orderResult.success) {
        return { title: "Order Not Found" };
    }

    return {
        title: `Order #${orderResult.data.id.slice(0, 8).toUpperCase()}`,
        description: `View details for order #${orderResult.data.id.slice(0, 8).toUpperCase()} at Tesla Threads.`,
    };
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
