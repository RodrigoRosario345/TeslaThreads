import { AccountSidebar } from "@/components";

export default function Layout({ children }: { children: React.ReactNode }) {
    console.log("Rendering Account Layout");
    
    return (
        <div id="account-container" className="flex flex-col md:flex-row gap-8">
            <AccountSidebar />
            <section className="w-full">
                {children}
            </section>
        </div>
    );
}