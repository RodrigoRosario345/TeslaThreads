import type { Metadata } from "next";
import { SignUpContainer } from "@/components";

export const metadata: Metadata = {
    title: "Sign Up",
    description: "Create your Tesla Threads account and start shopping for exclusive apparel.",
};

export default function Page() {
    return (
        <SignUpContainer />
    );
}