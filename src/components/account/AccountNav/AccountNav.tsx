'use client';

import { MdLocalShipping } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button/Button";
import { signOutAction } from "@/actions/auth";
import { PiSignOutBold } from "react-icons/pi";

const OPTIONS_ACCOUNT_SIDEBAR = [
    {
        id: "profile",
        label: "My Profile",
        href: "/account",
        icon: <CgProfile size={20} />
    },
    {
        id: "orders",
        label: "My Orders",
        href: "/account/orders",
        icon: <MdLocalShipping size={20} />
    },
]

export function AccountSidebar() {
    const pathname = usePathname();


    const handleSignOut = async () => {
        await signOutAction();
        window.location.reload();
    }

    return (
        <aside className="w-full max-w-72">
            <ul className="space-y-3">
                {OPTIONS_ACCOUNT_SIDEBAR.map((option) => (
                    <li key={option.id}>
                        <Link href={option.href} className={`flex items-center gap-3 p-2 hover:bg-gray-100 rounded ${pathname === option.href ? 'bg-gray-200 font-semibold' : ''}`}>
                            {option.icon}
                            <span>{option.label}</span>
                        </Link>
                    </li>
                ))}
                <div className="border-t border-gray-200"></div>
                <li key="sign-out">
                    <Button
                        variant="ghost"
                        className="w-full flex items-center gap-3 p-2 hover:bg-gray-100 rounded"
                        onClick={handleSignOut}
                    >
                        <PiSignOutBold size={20} />
                        <span>Sign Out</span>
                    </Button>
                </li>
            </ul>
        </aside>
    )
}