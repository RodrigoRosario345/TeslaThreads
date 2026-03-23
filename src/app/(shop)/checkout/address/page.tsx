import { CheckoutAddressForm, Title } from "@/components";

export default function AddressPage() {
    return (
        <section className="mx-auto w-full max-w-xl">
            <Title title="Address" />
            <CheckoutAddressForm />
        </section>
    );
}