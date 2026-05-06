import { OrderReviewContainer, Title } from "@/components";

export default function CheckoutPage() {
    return (
        <section className="mx-auto w-full max-w-xl lg:max-w-5xl">
            <Title title="Review & Payment" />
            <OrderReviewContainer />
        </section>
    );
}