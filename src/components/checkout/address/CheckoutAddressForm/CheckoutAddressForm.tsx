'use client';


import { Button, ControllerInput } from "@/components";
import { CheckoutAddressSchemaInput, CheckoutAddressSchemaOutput, schemaCheckoutAddress } from "@/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export interface CheckoutAddressFormProps {

}

export function CheckoutAddressForm({ }: CheckoutAddressFormProps) {

    const { control, handleSubmit } = useForm<CheckoutAddressSchemaInput, any, CheckoutAddressSchemaOutput>({
        mode: "onChange",
        resolver: zodResolver(schemaCheckoutAddress),
    });

    const onSubmit = (data: CheckoutAddressSchemaOutput) => {
        console.log(data);
    }

    return (
        <form
            className="m-auto flex max-w-xl flex-col gap-4 bg-gray-800 p-6 rounded-lg"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h1 className="text-lg font-semibold text-white">Create New Movie</h1>
            <div className="flex gap-2.5">
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

            <Button className="cursor-pointer" type="submit">
                Next
            </Button>
        </form>
    )
}