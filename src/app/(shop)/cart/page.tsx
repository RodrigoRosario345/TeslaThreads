import { CartContainer, Title } from "@/components";

export default function CartPage() {
    return (
        <section className="mx-auto w-full max-w-xl lg:max-w-5xl">
            <Title title="Cart" />
            <CartContainer />
        </section>
    );
}