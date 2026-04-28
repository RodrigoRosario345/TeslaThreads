'use client';

import { signUpAction } from "@/actions/auth";
import { Button, ControllerInput, ErrorMessage, LoadingText } from "@/components";
import { userSignUpSchema, userSignUpSchemaInput, userSignUpSchemaOutput } from "@/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function SignUpForm() {

    const { control, handleSubmit, setError, formState: { isSubmitting, errors } } = useForm<userSignUpSchemaInput, any, userSignUpSchemaOutput>({
        mode: "onChange",
        resolver: zodResolver(userSignUpSchema)
    });

    const onSubmit = async (data: userSignUpSchemaOutput) => {
        // 1. register the user using the signUpAction server action
        const result = await signUpAction(data);
        console.log(result);

        // 2. Firt check if the sign-up was successful, if it was not, set the error message to be displayed in the form
        if (!result.success) {
            setError("root", { message: result.message });
        }

        // 3. If the sign-up was successful, then autenticate the user and redirect to the home page


    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <ControllerInput<userSignUpSchemaInput, userSignUpSchemaOutput>
                control={control}
                name="name"
                label="Name"
                type="text"
                placeholder="Enter your name"
                classNameInput="rounded-full!"
            />
            <ControllerInput<userSignUpSchemaInput, userSignUpSchemaOutput>
                control={control}
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                classNameInput="rounded-full!"
            />
            <ControllerInput<userSignUpSchemaInput, userSignUpSchemaOutput>
                control={control}
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                classNameInput="rounded-full!"
            />
            <ErrorMessage message={errors.root?.message} />
            <Button
                type="submit"
                buttonStyle={isSubmitting ? "primaryDisabled" : "primary"}
                className="w-full mt-3 mb-3 rounded-full"
                disabled={isSubmitting}
            >
                <LoadingText
                    isLoading={isSubmitting}
                    text="Signing Up"
                    loadingText="Signing Up..."
                />
            </Button>
        </form>
    );
}
