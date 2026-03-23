'use client';


import { Button, ControllerInput } from "@/components";
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
            <h1 className="text-lg font-semibold ">Delivery Address</h1>
            <div className="w-full flex gap-2.5">
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
            <div className="w-full flex gap-2.5">
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
            <div className="w-full flex gap-2.5">
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
            <div className="w-full flex gap-2.5">
                <ControllerInput<CheckoutAddressSchemaInput, CheckoutAddressSchemaOutput>
                    control={control}
                    name="country"
                    label="Country"
                    placeholder="Enter country"
                />
                <ControllerInput<CheckoutAddressSchemaInput, CheckoutAddressSchemaOutput>
                    control={control}
                    name="phoneNumber"
                    label="Phone Number"
                    placeholder="Enter phone number"
                />
            </div>
            <Button className="w-full" buttonStyle="primary" type="submit">
                Next
            </Button>
        </form>
    )
}