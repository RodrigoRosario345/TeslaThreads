const BUTTON_STYLES = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2.5 px-4 rounded cursor-pointer",
    secondary: "bg-gray-500 hover:bg-gray-600 text-white text-sm font-bold py-2 px-4 rounded cursor-pointer",
    danger: "bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-2 px-4 rounded cursor-pointer",
    borderDark: "border-3 border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900 text-sm font-bold py-2 px-20 rounded cursor-pointer",
} as const;

type ButtonStyle = keyof typeof BUTTON_STYLES;

interface ButtonProps {
    type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
    className?: string;
    children?: React.ReactNode;
    buttonStyle?: ButtonStyle;
    onClick?: () => void;
}
export function Button({ type, className, children, buttonStyle, onClick }: ButtonProps) {

    return (
        <button type={type} className={`${buttonStyle ? BUTTON_STYLES[buttonStyle] : ''} ${className}`} onClick={onClick}>
            {children}
        </button>
    );
}
