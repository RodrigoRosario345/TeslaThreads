'use client';

import { useState, useEffect } from "react";
import { Navbar } from "../Navbar/Navbar";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import { RiAccountCircleLine } from "react-icons/ri";
import { Sidebar } from "../Sidebar/Sidebar";
import { IoIosSearch } from "react-icons/io";
import { useCartStore } from "@/store";
import { motion, useAnimation } from "motion/react";
import { Button } from "../Button/Button";
import { useCallbackUrl, useSessionUser } from "@/hooks";

export function Header() {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [mounted, setMounted] = useState<boolean>(false);
    const itemsLength = useCartStore((state) => state.getOrderSummary().totalItems);
    const controls = useAnimation();
    const { isAuthenticated } = useSessionUser();
    const callbackUrl = useCallbackUrl();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || itemsLength === 0) return;
        controls.start({ scale: [0, 1], opacity: [0, 1], transition: { duration: 0.4 } });
    }, [itemsLength, mounted, controls]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <header className="w-full sticky top-0 left-0 h-12 flex justify-between items-center px-4 bg-white shadow-sm z-50">
                <Link href="/" className="text-lg md:text-xl font-bold">
                    TESLA THREADS
                </Link>
                <Navbar />
                <div className="flex items-center">
                    <IoIosSearch className="p-2 size-9 rounded-md transition-all hover:bg-gray-100 cursor-pointer" />
                    <Link
                        href="/cart"
                        className="relative rounded-md transition-all hover:bg-gray-100 cursor-pointer"
                    >
                        <IoCartOutline className="size-9 p-2" />
                        {mounted && itemsLength > 0 && (
                            <motion.span className="absolute top-0 -right-1 bg-blue-600 text-white text-xs rounded-full size-5 flex items-center justify-center"
                                animate={controls}
                            >
                                {itemsLength}
                            </motion.span>
                        )}
                    </Link>
                    <Link href={isAuthenticated ? "/account" : `/auth/sign-in?callbackUrl=${callbackUrl}`}>
                        <RiAccountCircleLine className="size-9 p-2 rounded-md transition-all hover:bg-gray-100 cursor-pointer" />
                    </Link>
                    <Button
                        variant="ghost"
                        className="text-sm p-2"
                        onClick={toggleSidebar}
                    >
                        Menu
                    </Button>
                </div>
            </header>
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        </>
    );
}
