import type { Metadata } from "next";
import { Title } from "@/components";

export const metadata: Metadata = {
  title: "My Account",
  description: "Manage your Tesla Threads account settings, orders and preferences.",
};

export default function AccountPage() {
    return (
        <>
            <Title title='My Account' />

        </>
    );
}