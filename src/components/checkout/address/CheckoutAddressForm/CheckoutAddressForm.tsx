'use client';

import { Button, ControllerInput, LoadingText } from "@/components";
import { ControllerSelect } from "@/components/forms/controllers/ControllerSelect/ControllerSelect";
import { selectCountryOptions } from "@/data";
import { schemaDeliveryAddress, DeliveryAddressSchemaInput, DeliveryAddressSchemaOutput } from "@/interfaces";
import { useDeliveryAddressStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


export function CheckoutAddressForm() {

    const deliveryAddress = useDeliveryAddressStore((state) => state.deliveryAddress);
    const { control, handleSubmit, formState: { isSubmitting } } = useForm<DeliveryAddressSchemaInput, any, DeliveryAddressSchemaOutput>({
        mode: "onChange",
        resolver: zodResolver(schemaDeliveryAddress),
        defaultValues: deliveryAddress || undefined,
    });
    const addDeliveryAddress = useDeliveryAddressStore((state) => state.addDeliveryAddress);
    const clearDeliveryAddress = useDeliveryAddressStore((state) => state.clearDeliveryAddress);

    const onSubmit = async (data: DeliveryAddressSchemaOutput) => {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const { rememberAddress, ...addressData } = data;
        if (!rememberAddress) {
            clearDeliveryAddress();
            return;
        }
        addDeliveryAddress(addressData);
    }

    return (
        <form
            className="w-full space-y-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2 className="text-lg font-semibold ">Delivery Address</h2>
            <div className="w-full flex flex-wrap gap-2.5">
                <ControllerInput<DeliveryAddressSchemaInput, DeliveryAddressSchemaOutput>
                    control={control}
                    name="firstName"
                    label="First Name"
                    placeholder="Enter first name"
                />
                <ControllerInput<DeliveryAddressSchemaInput, DeliveryAddressSchemaOutput>
                    control={control}
                    name="lastName"
                    label="Last Name"
                    placeholder="Enter last name"
                />
            </div>
            <div className="w-full flex flex-wrap gap-2.5">
                <ControllerInput<DeliveryAddressSchemaInput, DeliveryAddressSchemaOutput>
                    control={control}
                    name="addressLine1"
                    label="Address Line 1"
                    placeholder="Enter address line 1"
                />
                <ControllerInput<DeliveryAddressSchemaInput, DeliveryAddressSchemaOutput>
                    control={control}
                    name="addressLine2"
                    label="Address Line 2 (Optional)"
                    placeholder="Enter address line 2"
                />
            </div>
            <div className="w-full flex flex-wrap gap-2.5">
                <ControllerInput<DeliveryAddressSchemaInput, DeliveryAddressSchemaOutput>
                    control={control}
                    name="postalCode"
                    label="Postal Code"
                    placeholder="Enter postal code"
                />
                <ControllerInput<DeliveryAddressSchemaInput, DeliveryAddressSchemaOutput>
                    control={control}
                    name="city"
                    label="City"
                    placeholder="Enter city"
                />
            </div>
            <div className="w-full flex flex-wrap gap-2.5">
                <ControllerSelect<DeliveryAddressSchemaInput, DeliveryAddressSchemaOutput>
                    control={control}
                    name="country"
                    label="Country"
                    placeholder="Select country"
                    items={selectCountryOptions}
                />
                <ControllerInput<DeliveryAddressSchemaInput, DeliveryAddressSchemaOutput>
                    control={control}
                    name="phoneNumber"
                    label="Phone Number"
                    placeholder="Enter phone number"
                // disabled={!country}
                // helperText={!country ? "Please select a country first" : ""}
                />
            </div>
            <ControllerInput<DeliveryAddressSchemaInput, DeliveryAddressSchemaOutput>
                control={control}
                name="rememberAddress"
                label="Remember this address"
                type="checkbox"
                classNameContainer="flex-row-reverse justify-end items-center gap-2 mt-6!"
                classNameLabel="text-sm! font-medium text-gray-600! cursor-pointer"
                classNameInput="peer order-1 appearance-none size-6! border border-gray-300! rounded-md  focus:ring-0! checked:border-blue-600! checked:bg-blue-600 cursor-pointer"
            />
            <Button
                className="w-full"
                variant={isSubmitting ? "primaryDisabled" : "primary"}
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