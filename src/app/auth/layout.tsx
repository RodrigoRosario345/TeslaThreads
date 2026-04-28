import { redirect } from "next/navigation";
import { auth } from "../../../auth.config";

export default async function Layout({children}: {children: React.ReactNode}) {

    const session  = await auth();
    
    if(session?.user) {
        redirect("/");
    }

    return (
        <main className="w-full h-screen flex items-center justify-center">
            {children}
        </main>
    );
}