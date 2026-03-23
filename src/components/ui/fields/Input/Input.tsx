export interface InputProps extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> { }

export function Input({
    id,
    name,
    onBlur,
    onChange,
    ref,
    type,
    placeholder,
    className,
    disabled,
    value,
    "aria-invalid": ariaInvalid,
    "aria-describedby": ariaDescribedBy,
}: InputProps) {
    return (
        <input
            id={id}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            ref={ref}
            type={type}
            placeholder={placeholder}
            className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            disabled={disabled}
            value={value}
            aria-invalid={ariaInvalid}
            aria-describedby={ariaDescribedBy}
        />
    );
}
