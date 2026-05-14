'use client';

import Link from "next/link";
import { CgClose } from "react-icons/cg";
import { Button } from "../Button/Button";
import { signOutAction } from "@/actions/auth";
import { useCallbackUrl, useSessionUser } from "@/hooks";

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
    const { isAuthenticated } = useSessionUser();
    const callbackUrl = useCallbackUrl();
    

    const handleSignOut = async () => {
        await signOutAction();
        window.location.reload();
        onClose();
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
                                onClick={onClose}
                                className="inline-block w-full bg-transparent transition-colors hover:bg-gray-100 font-semibold py-2.5 px-4 rounded cursor-pointer"
                            >
                                {option.label}
                            </Link>
                        </li>
                    ))}
                    {isAuthenticated ? (
                        <li>
                            <Button
                                variant="ghost"
                                className="text-left w-full font-semibold"
                                onClick={handleSignOut}
                            >
                                Sign Out
                            </Button>
                        </li>
                    ) : (
                        <li>
                            <Link
                                href={`/auth/sign-in?callbackUrl=${callbackUrl}`}
                                className="inline-block w-full bg-transparent transition-colors hover:bg-gray-100 font-semibold py-2.5 px-4 rounded cursor-pointer"
                            >
                                Sign In
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </>
    );
}
