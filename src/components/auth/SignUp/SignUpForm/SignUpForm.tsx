"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { signInAction, signUpAction } from "@/actions/auth";

import { userSignUpSchema, userSignUpSchemaInput, userSignUpSchemaOutput } from "@/interfaces";
import { Button, ControllerInput, ControllerPassword, ErrorMessage, LoadingText } from "@/components";

export function SignUpForm() {
    const {
        control,
        handleSubmit,
        setError,
        formState: { isSubmitting, errors },
    } = useForm<userSignUpSchemaInput, any, userSignUpSchemaOutput>({
        resolver: zodResolver(userSignUpSchema),
    });
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const onSubmit = async (data: userSignUpSchemaOutput) => {
        // Register the user using the signUpAction server action and verify if the registration was successful
        const result = await signUpAction(data);
        if (!result.success) {
            setError("root", { message: result.message });
            return;
        }

        // If registration was successful, automatically sign in the user and verify if the sign-in was successful
        const resultSignIn = await signInAction(data);
        if (!resultSignIn.success) {
            setError("root", { message: resultSignIn.message });
            return;
        }
        window.location.replace(callbackUrl);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <ControllerInput<userSignUpSchemaInput, userSignUpSchemaOutput>
                control={control}
                name="name"
                label="Name"
                type="text"
                placeholder="Enter your name"
            />
            <ControllerInput<userSignUpSchemaInput, userSignUpSchemaOutput>
                control={control}
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
            />
            <ControllerPassword<userSignUpSchemaInput, userSignUpSchemaOutput>
                control={control}
                name="password"
                label="Password"
                placeholder="Enter your password"
                showStrengthBar
            />
            <ErrorMessage message={errors.root?.message} />
            <Button
                type="submit"
                variant={isSubmitting ? "disabled" : "primary"}
                className="w-full mt-3 mb-3 rounded-md!"
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
