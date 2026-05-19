"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { userSignInSchema, userSignInSchemaInput, userSignInSchemaOutput } from "@/interfaces";
import { Button, ControllerInput, LoadingText, ErrorMessage, ControllerPassword } from "@/components";
import { signInAction } from "@/actions/auth";

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
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const onSubmit = async (data: userSignInSchemaOutput) => {
        const result = await signInAction(data);
        if (!result.success) {
            setError("root", { message: result.message });
            return;
        }

        window.location.href = callbackUrl;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <ControllerInput<userSignInSchemaInput, userSignInSchemaOutput>
                control={control}
                name="email"
                label="Email"
                placeholder="Enter your email"
                type="email"
            />
            <ControllerPassword<userSignInSchemaInput, userSignInSchemaOutput>
                control={control}
                name="password"
                label="Password"
                placeholder="Enter your password"
            />
            <ErrorMessage message={errors.root?.message} />
            <Button
                type="submit"
                variant={isSubmitting ? "disabled" : "primary"}
                className="w-full"
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