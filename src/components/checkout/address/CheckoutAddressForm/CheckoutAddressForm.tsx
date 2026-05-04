'use client';

import { Button, ControllerInput } from "@/components";
import { ControllerSelect } from "@/components/forms/controllers/ControllerSelect/ControllerSelect";
import { selectCountryOptions } from "@/data";
import { CheckoutAddressSchemaInput, CheckoutAddressSchemaOutput, schemaCheckoutAddress } from "@/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


export function CheckoutAddressForm() {

    const { control, handleSubmit } = useForm<CheckoutAddressSchemaInput, any, CheckoutAddressSchemaOutput>({
        mode: "onChange",
        resolver: zodResolver(schemaCheckoutAddress),
    });

    const onSubmit = (data: CheckoutAddressSchemaOutput) => {
        console.log(data);
    }

    return (
        <form
            className="w-full space-y-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2 className="text-lg font-semibold ">Delivery Address</h2>
            <div className="w-full flex flex-wrap gap-2.5">
                <ControllerInput<CheckoutAddressSchemaInput, CheckoutAddressSchemaOutput>
                    control={control}
                    name="firstName"
                    label="First Name"
                    placeholder="Enter first name"
                />
                <ControllerInput<CheckoutAddressSchemaInput, CheckoutAddressSchemaOutput>
                    control={control}
                    name="lastName"
                    label="Last Name"
                    placeholder="Enter last name"
                />
            </div>
            <div className="w-full flex flex-wrap gap-2.5">
                <ControllerInput<CheckoutAddressSchemaInput, CheckoutAddressSchemaOutput>
                    control={control}
                    name="addressLine1"
                    label="Address Line 1"
                    placeholder="Enter address line 1"
                />
                <ControllerInput<CheckoutAddressSchemaInput, CheckoutAddressSchemaOutput>
                    control={control}
                    name="addressLine2"
                    label="Address Line 2 (Optional)"
                    placeholder="Enter address line 2"
                />
            </div>
            <div className="w-full flex flex-wrap gap-2.5">
                <ControllerInput<CheckoutAddressSchemaInput, CheckoutAddressSchemaOutput>
                    control={control}
                    name="postalCode"
                    label="Postal Code"
                    placeholder="Enter postal code"
                />
                <ControllerInput<CheckoutAddressSchemaInput, CheckoutAddressSchemaOutput>
                    control={control}
                    name="city"
                    label="City"
                    placeholder="Enter city"
                />
            </div>
            <div className="w-full flex flex-wrap gap-2.5">
                <ControllerSelect<CheckoutAddressSchemaInput, CheckoutAddressSchemaOutput>
                    control={control}
                    name="country"
                    label="Country"
                    placeholder="Select country"
                    items={selectCountryOptions}
                />
                <ControllerInput<CheckoutAddressSchemaInput, CheckoutAddressSchemaOutput>
                    control={control}
                    name="phoneNumber"
                    label="Phone Number"
                    placeholder="Enter phone number"
                // disabled={!country}
                // helperText={!country ? "Please select a country first" : ""}
                />
            </div>
            <ControllerInput<CheckoutAddressSchemaInput, CheckoutAddressSchemaOutput>
                control={control}
                name="rememberAddress"
                label="Remember this address"
                type="checkbox"
                classNameContainer="flex-row-reverse justify-end items-center gap-2 mt-6!"
                classNameLabel="text-sm! font-medium text-gray-600! cursor-pointer"
                classNameInput="peer order-1 appearance-none size-6! border border-gray-300! rounded-md  focus:ring-0! checked:border-blue-600! checked:bg-blue-600 cursor-pointer"
            />
            <Button className="w-full" variant="primary" type="submit">
                Next
            </Button>
        </form>
    )
}