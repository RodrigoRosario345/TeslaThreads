import type { Metadata } from "next";
import { getUserAddress } from "@/actions/address";
import { getCountries } from "@/actions/country";
import { auth } from "@/auth.config";
import { CheckoutAddressForm, Title } from "@/components";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Shipping Address",
  description: "Enter or update your shipping address for your Tesla Threads order.",
};

export default async function AddressPage() {
    const session = await auth();

    if (!session) {
        redirect("/");
    }

    const { data: countries } = await getCountries();
    const selectCountryOptions = countries || [];
    const { data: address } = await getUserAddress(session.user.id);
    const defaultValuesAddress = address || undefined;

    return (
        <section className="mx-auto w-full max-w-xl">
            <Title title="Address" />
            <CheckoutAddressForm
                selectCountryOptions={selectCountryOptions}
                addressDefaultValues={defaultValuesAddress}
                userId={session.user.id}
            />
        </section>
    );
}
