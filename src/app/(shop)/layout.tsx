import { Footer, Header } from "@/components";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main className="p-6 sm:p-12">
                {children}
            </main>
            <Footer />
        </>
    );
}