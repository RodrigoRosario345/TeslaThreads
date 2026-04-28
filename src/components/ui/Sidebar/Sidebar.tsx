'use client';


import { useSession } from "next-auth/react";
import Link from "next/link";
import { CgClose } from "react-icons/cg";
import { Button } from "../Button/Button";
import { signOutAction } from "@/actions/auth";
import { useRouter } from "next/navigation";

const OPTIONS_SIDEBAR = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
] as const;

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const { data: session } = useSession();
    const router = useRouter();


    const handleSignOut = async () => {
        await signOutAction();
        onClose();
        router.push("/");   
    }

    return (
        <>
            <div
                className={`h-screen w-full fixed inset-0 bg-black/20 backdrop-blur-xs z-100 ${isOpen ? "block" : "hidden"}`}
                onClick={onClose}
            ></div>
            <nav
                className={`h-screen w-full max-w-100 fixed top-0 left-full z-100 p-6 bg-white ${isOpen ? "-translate-x-full" : "translate-x-full"} transition-transform ease-in-out duration-300`}
            >
                <CgClose className="ml-auto size-7 cursor-pointer" onClick={onClose} />
                <ul className="mt-6 space-y-2">
                    {OPTIONS_SIDEBAR.map((option) => (
                        <li key={option.href}>
                            <Link
                                href={option.href}
                                className="inline-block w-full font-semibold p-2 rounded-md transition-all hover:bg-gray-100 cursor-pointer"
                            >
                                {option.label}
                            </Link>
                        </li>
                    ))}
                    {session?.user ? (
                        <li>
                            <Button
                                className="text-left w-full font-semibold p-2 rounded-md transition-all hover:bg-gray-100 cursor-pointer"
                                onClick={handleSignOut}
                            >
                                Sign Out
                            </Button>
                        </li>
                    ) : (
                        <>
                            <li>
                                <Link
                                    href="/auth/sign-in"
                                    className="inline-block w-full font-semibold p-2 rounded-md transition-all hover:bg-gray-100 cursor-pointer"
                                >
                                    Sign In
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </>
    );
}
