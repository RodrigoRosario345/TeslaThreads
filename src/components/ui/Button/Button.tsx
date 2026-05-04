const BUTTON_STYLES = {
    primary: "bg-blue-600 transition-colors hover:bg-blue-700 text-white text-sm font-medium py-2.5 px-4 rounded cursor-pointer",
    primaryDisabled: "bg-blue-600 text-white text-sm font-medium py-2.5 px-4 rounded opacity-50 cursor-not-allowed",
    secondary: "bg-gray-500 transition-colors hover:bg-gray-600 text-white text-sm font-medium py-2 px-4 rounded cursor-pointer",
    danger: "bg-red-500 transition-colors hover:bg-red-600 text-white text-sm font-medium py-2 px-4 rounded cursor-pointer",
    borderDark: "border-3 border-gray-900 transition-colors hover:bg-gray-900 hover:text-white text-gray-900 text-sm font-medium py-2 px-20 rounded cursor-pointer",
} as const;

type Variant = keyof typeof BUTTON_STYLES;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
}
export function Button({ type, className, children, variant , onClick, disabled }: ButtonProps) {

    return (
        <button type={type} className={`${variant ? BUTTON_STYLES[variant] : ''} ${className}`} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
}
