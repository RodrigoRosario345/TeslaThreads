"use client";

import { Button, ControllerInput, LoadingText } from "@/components";
import {
    userSignInSchema,
    userSignInSchemaInput,
    userSignInSchemaOutput,
} from "@/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { set } from "zod";

export function SignInForm() {
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<userSignInSchemaInput, any, userSignInSchemaOutput>({
        mode: "onChange",
        resolver: zodResolver(userSignInSchema),
    });

    const onSubmit = async (data: userSignInSchemaOutput) => {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        console.log("Form submitted:", data);
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
            <Button
                type="submit"
                buttonStyle="primary"
                className={`w-full mt-3 mb-3 rounded-full ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
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
