import type { Metadata } from "next";
import { SignInContainer } from "@/components";

export const metadata: Metadata = {
    title: "Sign In",
    description: "Sign in to your Tesla Threads account to access your orders and preferences.",
};

export default function Page() {
    return (
        <SignInContainer />
    );
}