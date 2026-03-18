'use client';

import { useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import { Sidebar } from "../Sidebar/Sidebar";
import { IoIosSearch } from "react-icons/io";

export function Header() {

    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const toggleVisibility = (newState: boolean) => {
        setIsVisible(newState);
    }
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    return (
        <>
            <header className="w-full sticky top-0 left-0 h-12 flex justify-between items-center px-4 bg-white shadow-sm z-50">
                <Link href="/" className="text-xl font-bold">
                    TESLA THREADS
                </Link>
                <Navbar onToggleVisibility={toggleVisibility} />
                <div
                    className={`w-full fixed top-12 left-0 bg-white shadow-sm overflow-hidden transition-all ease-linear ${isVisible ? "h-auto p-5 opacity-100" : "h-0 p-0 opacity-0"}`}
                    onMouseEnter={() => toggleVisibility(true)}
                    onMouseLeave={() => toggleVisibility(false)}
                >
                    <ul>
                        <li>Item 1</li>
                        <li>Item 2</li>
                        <li>Item 3</li>
                    </ul>
                </div>
                <div className="flex items-center">
                    <IoIosSearch className="p-2 size-9 rounded-md transition-all hover:bg-gray-100 cursor-pointer" />
                    <Link href="/cart" className="rounded-md transition-all hover:bg-gray-100 cursor-pointer">
                        <IoCartOutline className="size-9 p-2" />
                    </Link>
                    <button className="text-sm font-medium p-2 rounded-md transition-all hover:bg-gray-100 cursor-pointer" onClick={toggleSidebar}>
                        Menu
                    </button>
                </div>
            </header>
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        </>
    );
}
