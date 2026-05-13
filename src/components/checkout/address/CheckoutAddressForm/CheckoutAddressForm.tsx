'use client';

import { deleteShippingAddress, saveShippingAddress } from "@/actions/address";
import { Button, ControllerInput, LoadingText } from "@/components";
import { ControllerSelect } from "@/components/forms/controllers/ControllerSelect/ControllerSelect";
import { schemaShippingAddress, ShippingAddressSchemaInput, ShippingAddressSchemaOutput, SelectOption } from "@/interfaces";
import { useShippingAddressStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useShallow } from 'zustand/react/shallow';

interface CheckoutAddressFormProps {
    selectCountryOptions: SelectOption[];
    defaultValues?: ShippingAddressSchemaInput;
    userId: string;
}

export function CheckoutAddressForm({ selectCountryOptions, defaultValues, userId }: CheckoutAddressFormProps) {
    const router = useRouter();
    const shippingAddress = useShippingAddressStore(useShallow((state) => state.shippingAddress));
    const addShippingAddress = useShippingAddressStore((state) => state.addShippingAddress);

    const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm<ShippingAddressSchemaInput, any, ShippingAddressSchemaOutput>({
        mode: "onChange",
        resolver: zodResolver(schemaShippingAddress),
        defaultValues
    });

    useEffect(() => {
        if (defaultValues || !shippingAddress.firstName) return
        reset(shippingAddress);
    }, [shippingAddress]);

    const onSubmit = async (data: ShippingAddressSchemaOutput) => {
        const { rememberAddress, ...addressData } = data;
        addShippingAddress(addressData);
        if (!rememberAddress) {
            await deleteShippingAddress(userId);
        } else {
            await saveShippingAddress(addressData, userId);
        }
        router.push("/checkout");
    }

    return (
        <form
            className="w-full space-y-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2 className="text-lg font-semibold ">Delivery Address</h2>
            <div className="w-full flex flex-wrap gap-2.5">
                <ControllerInput<ShippingAddressSchemaInput, ShippingAddressSchemaOutput>
                    control={control}
                    name="firstName"
                    label="First Name"
                    placeholder="Enter first name"
                />
                <ControllerInput<ShippingAddressSchemaInput, ShippingAddressSchemaOutput>
                    control={control}
                    name="lastName"
                    label="Last Name"
                    placeholder="Enter last name"
                />
            </div>
            <div className="w-full flex flex-wrap gap-2.5">
                <ControllerInput<ShippingAddressSchemaInput, ShippingAddressSchemaOutput>
                    control={control}
                    name="addressLine1"
                    label="Address Line 1"
                    placeholder="Enter address line 1"
                />
                <ControllerInput<ShippingAddressSchemaInput, ShippingAddressSchemaOutput>
                    control={control}
                    name="addressLine2"
                    label="Address Line 2 (Optional)"
                    placeholder="Enter address line 2"
                />
            </div>
            <div className="w-full flex flex-wrap gap-2.5">
                <ControllerInput<ShippingAddressSchemaInput, ShippingAddressSchemaOutput>
                    control={control}
                    name="postalCode"
                    label="Postal Code"
                    placeholder="Enter postal code"
                />
                <ControllerInput<ShippingAddressSchemaInput, ShippingAddressSchemaOutput>
                    control={control}
                    name="city"
                    label="City"
                    placeholder="Enter city"
                />
            </div>
            <div className="w-full flex flex-wrap gap-2.5">
                <ControllerSelect<ShippingAddressSchemaInput, ShippingAddressSchemaOutput>
                    control={control}
                    name="country"
                    label="Country"
                    placeholder="Select country"
                    items={selectCountryOptions}
                />
                <ControllerInput<ShippingAddressSchemaInput, ShippingAddressSchemaOutput>
                    control={control}
                    name="phoneNumber"
                    label="Phone Number"
                    placeholder="Enter phone number"
                // disabled={!country}
                // helperText={!country ? "Please select a country first" : ""}
                />
            </div>
            <ControllerInput<ShippingAddressSchemaInput, ShippingAddressSchemaOutput>
                control={control}
                name="rememberAddress"
                label="Remember this address"
                type="checkbox"
                classNameContainer="flex-row-reverse justify-end items-center gap-2 mt-6!"
                classNameLabel="text-sm! font-medium text-gray-600! cursor-pointer"
                classNameInput="peer order-1 appearance-none size-6! border border-gray-300! rounded-md  focus:ring-0! checked:border-primary! checked:bg-primary cursor-pointer"
            />
            <Button
                className="w-full"
                variant={isSubmitting ? "disabled" : "primary"}
                type="submit"
                disabled={isSubmitting}
            >
                <LoadingText
                    isLoading={isSubmitting}
                    text="Save Address"
                    loadingText="Saving..."
                />
            </Button>
        </form>
    )
}