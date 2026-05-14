import { AccountSidebar } from "@/components";

export default function Layout({ children }: { children: React.ReactNode }) {    
    return (
        <div id="account-container" className="flex flex-col md:flex-row gap-8">
            <AccountSidebar />
            <section className="w-full">
                {children}
            </section>
        </div>
    );
}