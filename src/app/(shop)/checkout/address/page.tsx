import { getDeliveryAddress } from "@/actions/address";
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
    const { address } = await getDeliveryAddress(session.user.id);
    const defaultValuesAddress = address || undefined;

    return (
        <section className="mx-auto w-full max-w-xl">
            <Title title="Address" />
            <CheckoutAddressForm
                selectCountryOptions={selectCountryOptions}
                defaultValues={defaultValuesAddress}
                userId={session.user.id}
            />
        </section>
    );
}
