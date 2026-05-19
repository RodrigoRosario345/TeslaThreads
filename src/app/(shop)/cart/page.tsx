import type { Metadata } from "next";
import { CartContainer, Title } from "@/components";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your selected items and proceed to checkout at Tesla Threads.",
};

export default function CartPage() {
    return (
        <section className="mx-auto w-full max-w-xl lg:max-w-5xl">
            <Title title="Cart" />
            <CartContainer />
        </section>
    );
}