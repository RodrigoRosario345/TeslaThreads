import { Footer, Header } from "@/components";

export default async function Layout({ children }: { children: React.ReactNode }) {

    return (
        <>
            <Header />
            <main className="p-6 sm:p-12 min-h-[calc(100vh-6.3rem)] max-w-7xl mx-auto">
                {children}
            </main>
            <Footer />
        </>
    );
}