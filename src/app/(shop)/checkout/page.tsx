import type { Metadata } from "next";
import { OrderReviewContainer, Title } from "@/components";

export const metadata: Metadata = {
  title: "Review & Payment",
  description:
    "Review your order, enter payment details and confirm your purchase at Tesla Threads.",
};

export default function CheckoutPage() {
    return (
        <section className="mx-auto w-full max-w-xl lg:max-w-5xl">
            <Title title="Review & Payment" />
            <OrderReviewContainer />
        </section>
    );
}