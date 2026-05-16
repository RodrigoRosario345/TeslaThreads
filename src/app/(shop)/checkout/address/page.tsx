import { getUserAddress } from "@/actions/address";
import { getCountries } from "@/actions/country";
import { auth } from "@/auth.config";
import { CheckoutAddressForm, Title } from "@/components";
import { redirect } from "next/navigation";

export default async function AddressPage() {
    const session = await auth();

    if (!session) {
        redirect("/");
    }

    const { countries } = await getCountries();
    const selectCountryOptions = countries || [];
    const { address } = await getUserAddress(session.user.id);
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
