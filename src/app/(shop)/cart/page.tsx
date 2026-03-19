import { CartContainer, Title } from "@/components";

export default function CartPage() {
    return (
        <section className="mx-auto w-full max-w-xl lg:max-w-5xl">
            <Title title="Cart" />
            <div className="block lg:hidden w-full border-b-[0.5px] border-gray-300 mb-10" />
            <CartContainer />
        </section>
    );
}