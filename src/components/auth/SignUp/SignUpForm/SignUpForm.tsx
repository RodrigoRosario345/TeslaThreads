"use client";

import { signInAction, signUpAction } from "@/actions/auth";
import {
    Button,
    ControllerInput,
    ErrorMessage,
    LoadingText,
} from "@/components";
import {
    userSignUpSchema,
    userSignUpSchemaInput,
    userSignUpSchemaOutput,
} from "@/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

export function SignUpForm() {
    const {
        control,
        handleSubmit,
        setError,
        formState: { isSubmitting, errors },
    } = useForm<userSignUpSchemaInput, any, userSignUpSchemaOutput>({
        mode: "onChange",
        resolver: zodResolver(userSignUpSchema),
    });
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const onSubmit = async (data: userSignUpSchemaOutput) => {
        // 1. register the user using the signUpAction server action and verify if the registration was successful
        const result = await signUpAction(data);

        if (!result.success) {
            setError("root", { message: result.message });
            return;
        }

        // 3. If registration was successful, automatically sign in the user and verify if the sign-in was successful
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
