import Link from "next/link";

const OPTIONS_NAVBAR = [
    { name: "Hombres", href: "/category/men" },
    { name: "Mujeres", href: "/category/women" },
    { name: "Niños", href: "/category/kids" }
];

export interface NavbarProps {
    onToggleVisibility: (newState: boolean) => void;
}

export function Navbar({ onToggleVisibility }: NavbarProps) {

    return (
        <nav
            className="h-full hidden md:flex items-center gap-2 px-25"
            onMouseLeave={() => onToggleVisibility(false)}
        >
            {OPTIONS_NAVBAR.map((option) => (
                <Link key={option.name} href={option.href} className="p-2 rounded-md transition-all hover:bg-gray-100"
                    onMouseEnter={() => onToggleVisibility(true)}
                    >
                    {option.name}
                </Link>
            ))}
        </nav>
    )
}