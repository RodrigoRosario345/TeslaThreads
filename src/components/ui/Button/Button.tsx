import { cn } from "@/lib/utils";

const BUTTON_STYLES = {
    primary: "bg-primary transition-colors hover:bg-primary/90 text-white text-sm font-medium py-2.5 px-4 rounded cursor-pointer",
    outline: "bg-transparent border border-gray-200 transition-colors hover:bg-gray-100 text-sm font-medium py-2.5 px-4 rounded cursor-pointer",
    destructive: "bg-red-500 transition-colors hover:bg-red-600 text-white text-sm font-medium py-2.5 px-4 rounded cursor-pointer",
    disabled: "bg-gray-300 text-gray-500 text-sm font-medium py-2.5 px-4 rounded cursor-not-allowed",
    link: "text-sm underline underline-offset-3 hover:decoration-2 cursor-pointer cursor-pointer",
    ghost: "bg-transparent transition-colors hover:bg-gray-100 font-medium py-2.5 px-4 rounded cursor-pointer",
    secondary: "bg-gray-500 transition-colors hover:bg-gray-600 text-white text-sm font-medium py-2 px-4 rounded cursor-pointer",
    danger: "bg-red-500 transition-colors hover:bg-red-600 text-white text-sm font-medium py-2 px-4 rounded cursor-pointer",
    borderDark: "border-3 border-gray-900 transition-colors hover:bg-gray-900 hover:text-white text-gray-900 text-sm font-medium py-2 px-20 rounded cursor-pointer",
} as const;

type Variant = keyof typeof BUTTON_STYLES;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
}
export function Button({ variant, className, children, ...restProps }: ButtonProps) {

    return (
        <button className={cn(BUTTON_STYLES[variant || 'primary'], className)} {...restProps} >
            {children}
        </button>
    );
}
