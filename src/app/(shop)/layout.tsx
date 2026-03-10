import { Header } from "@/components";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main className="p-10">
                {children}
            </main>
        </>
    );
}