'use client';

import type { FieldValues } from "react-hook-form";

import { BaseControllerProps } from "@/interfaces";
import { useControllerField } from "@/hooks";

export interface ControllerInputProps<T extends FieldValues, TT> extends BaseControllerProps<T, TT> {
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;
}

export function ControllerInput<T extends FieldValues, TT>({
    name,
    label,
    control,
    type = "text",
    placeholder = "",
    disabled = false,
    helperText,
    required = false,
    className,
}: ControllerInputProps<T, TT>) {
    const { field, error, hasError, colorState } = useControllerField(name, control, required)

    return (
        <div className={`flex-1 flex flex-col gap-2 ${className}`}>
            <label htmlFor={name} className={hasError ? "text-red-500!" : ""}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            <input
                {...field}
                id={name}
                type={type}
                placeholder={placeholder}
                color={colorState}
                disabled={disabled}
                value={field.value || ""}
                aria-invalid={hasError}
                aria-describedby={hasError ? `${name}-error` : helperText ? `${name}-helper` : undefined}
            />

            {hasError && (
                <p className="-mt-1" id={`${name}-error`} color="failure" role="alert">
                    {error?.message}
                </p>
            )}

            {!hasError && helperText && (
                <p id={`${name}-helper`}>{helperText}</p>
            )}
        </div>
    );
}