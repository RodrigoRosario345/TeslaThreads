import { CartContainer, Title } from "@/components";

export default function CartPage() {
    return (
        <section className="mx-auto w-full max-w-4xl">
            <Title title="Cart" />
            <CartContainer />
        </section>
    );
}