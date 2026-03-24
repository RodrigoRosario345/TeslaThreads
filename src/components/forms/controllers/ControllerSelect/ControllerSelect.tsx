import { useControllerField } from "@/hooks";
import type { BaseControllerProps, SelectOption } from "@/interfaces/forms";
import type { FieldValues } from "react-hook-form";

export interface ControllerSelectProps<
    T extends FieldValues,
    TT,
> extends BaseControllerProps<T, TT> {
    options: SelectOption[];
    placeholder?: string;
    className?: string;
}

export function ControllerSelect<T extends FieldValues, TT>({
    name,
    label,
    control,
    options,
    placeholder = "Select an option",
    disabled = false,
    helperText,
    required = false,
    className,
}: ControllerSelectProps<T, TT>) {
    const { field, error, hasError } = useControllerField(name, control);
    return (
        <div className={`flex-1 basis-3xs flex flex-col gap-2 ${className}`}>
            <label htmlFor={name} className={`block text-sm font-medium ${hasError ? "text-red-500" : "text-gray-700"}`}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            <select
                {...field}
                id={name}
                className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${hasError ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""}`}
                disabled={disabled}
                value={field.value || ""}
                aria-invalid={hasError}
                aria-describedby={
                    hasError ? `${name}-error` : helperText ? `${name}-helper` : undefined
                }
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {hasError && (
                <p className={`-mt-0.5 text-xs ${hasError ? "text-red-500" : ""}`} id={`${name}-error`} role="alert">
                    {error?.message}
                </p>
            )}

            {!hasError && helperText && (
                <p className="text-xs text-gray-500" id={`${name}-helper`}>
                    {helperText}
                </p>
            )}
        </div>
    );
}
