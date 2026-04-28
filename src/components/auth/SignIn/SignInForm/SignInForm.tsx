"use client";

import { signInAction } from "@/actions/auth";
import { Button, ControllerInput, LoadingText, ErrorMessage } from "@/components";
import { userSignInSchema, userSignInSchemaInput, userSignInSchemaOutput } from "@/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function SignInForm() {
    const {
        setError,
        control,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<userSignInSchemaInput, any, userSignInSchemaOutput>({
        mode: "onChange",
        resolver: zodResolver(userSignInSchema),
    });

    const onSubmit = async (data: userSignInSchemaOutput) => {
        // await new Promise(((resolve) => setTimeout(resolve, 3000)));
        const result = await signInAction(data);

        if (!result) return window.location.href = "/"; 

        setError("root", { message: result });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <ControllerInput<userSignInSchemaInput, userSignInSchemaOutput>
                control={control}
                name="email"
                label="Email"
                placeholder="Enter your email"
                classNameInput="rounded-full!"
                type="email"
            />
            <ControllerInput<userSignInSchemaInput, userSignInSchemaOutput>
                control={control}
                name="password"
                label="Password"
                placeholder="Enter your password"
                classNameInput="rounded-full!"
                type="password"
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
                    text="Signing In"
                    loadingText="Signing In..."
                />
            </Button>
        </form>
    );
}
