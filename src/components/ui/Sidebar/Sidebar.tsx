import { CgClose } from "react-icons/cg";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    return (
        <>
            <div
                className={`h-screen w-full fixed inset-0 bg-black/20 backdrop-blur-xs z-10 ${isOpen ? "block" : "hidden"}`}
                onClick={onClose}
            ></div>
            <nav
                className={`h-screen w-full max-w-100 fixed top-0 left-full z-20 p-6 bg-white ${isOpen ? "-translate-x-full" : "translate-x-full"} transition-transform ease-in-out duration-300`}
            >
                <CgClose className="ml-auto size-7 cursor-pointer" onClick={onClose} />
            </nav>
        </>
    );
}
