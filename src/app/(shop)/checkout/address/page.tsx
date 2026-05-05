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

    const countries = await getCountries();
    const selectCountryOptions = countries.map((country) => ({
        id: country.id,
        value: country.id,
        label: country.name
    }));
    const { address } = await getDeliveryAddress(session.user.id);
    const defaultValuesAddress = address ? {
        firstName: address.firstName,
        lastName: address.lastName,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2 || "",
        postalCode: address.postalCode,
        city: address.city,
        phoneNumber: address.phoneNumber,
        country: address.countryId
    } : undefined;
    console.log("Default values for address form:", defaultValuesAddress);
    return (
        <section className="mx-auto w-full max-w-xl">
            <Title title="Address" />
            <CheckoutAddressForm selectCountryOptions={selectCountryOptions} defaultValues={defaultValuesAddress} userId={session.user.id} />
        </section>
    );
}