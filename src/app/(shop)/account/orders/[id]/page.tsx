
import { getOrderById } from "@/actions";
import { NextPage } from "next";
import { notFound } from "next/navigation";

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
