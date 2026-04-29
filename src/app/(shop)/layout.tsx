import { Footer, Header } from "@/components";
import { auth } from "../../auth.config";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {

    const session = await auth();

    if (!session?.user) {
        redirect("/auth/sign-in");
    }

    return (
        <>
            <Header />
            <main className="p-6 sm:p-12 min-h-[calc(100vh-6.3rem)]">
                {children}
            </main>
            <Footer />
        </>
    );
}