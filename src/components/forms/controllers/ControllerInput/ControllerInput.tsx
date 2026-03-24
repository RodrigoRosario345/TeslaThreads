'use client';

import type { FieldValues } from "react-hook-form";

import { BaseControllerProps } from "@/interfaces";
import { useControllerField } from "@/hooks";
import { Input } from "@/components";
import { CgDanger } from "react-icons/cg";

export interface ControllerInputProps<T extends FieldValues, TT> extends BaseControllerProps<T, TT> {
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;
    classNameContainer?: string;
    classNameLabel?: string;
    classNameInput?: string;
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
    classNameContainer = "",
    classNameLabel = "",
    classNameInput = "",
}: ControllerInputProps<T, TT>) {
    const { field, error, hasError } = useControllerField(name, control);

    return (
        <div className={`flex-1 basis-3xs flex flex-col gap-2 ${classNameContainer}`}>
            <label htmlFor={name} className={`block text-sm font-medium ${hasError ? "text-red-500" : "text-gray-700"} ${classNameLabel}`}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            <Input
                {...field}
                id={name}
                type={type}
                placeholder={placeholder}
                className={`${hasError ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""} ${classNameInput}`}
                disabled={disabled}
                value={field.value || ""}
                aria-invalid={hasError}
                aria-describedby={hasError ? `${name}-error` : helperText ? `${name}-helper` : undefined}
            />

            {hasError && (
                <p className={`-mt-0.5 text-xs ${hasError ? "text-red-500" : ""}`} id={`${name}-error`} role="alert">
                    {error?.message}
                </p>
            )}

            {!hasError && helperText && (
                <p id={`${name}-helper`} className="text-xs text-blue-500 flex items-center gap-1 mt-0.5">
                    <CgDanger size={20} className="text-blue-500"/>
                    {helperText}
                </p>
            )}
        </div>
    );
}