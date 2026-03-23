import { CheckoutAddressForm, Title } from "@/components";

export default function AddressPage() {
    return (
        <section className="mx-auto w-full max-w-xl lg:max-w-5xl">
            <Title title="Delivery Address" />
            <CheckoutAddressForm />
        </section>
    );
}