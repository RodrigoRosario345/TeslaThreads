"use client";

import { useState, useCallback, type ChangeEvent } from "react";
import type { FieldValues } from "react-hook-form";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

import type { ControllerInputProps } from "../ControllerInput/ControllerInput";
import { useControllerField } from "@/hooks";
import { Input } from "@/components";
import { CgDanger } from "react-icons/cg";
import { cn } from "@/lib/utils";
import {
    calculatePasswordStrength,
    type PasswordStrengthResult,
} from "@/helpers";
import { StrengthBar } from "./StrengthBar/StrengthBar";

export interface ControllerPasswordProps<
    T extends FieldValues,
    TT,
> extends ControllerInputProps<T, TT> {
    /** Render the password strength bar below the input (default: false). */
    showStrengthBar?: boolean;
    /** Render the eye toggle to show/hide password (default: true). */
    showToggle?: boolean;
}

export function ControllerPassword<T extends FieldValues, TT>({
    name,
    label,
    control,
    type: _type,
    placeholder = "",
    disabled = false,
    helperText,
    required = false,
    classNameContainer = "",
    classNameLabel = "",
    classNameInput = "",
    value,
    showStrengthBar = false,
    showToggle = true,
}: ControllerPasswordProps<T, TT>) {
    const { field, error, hasError } = useControllerField(name, control);

    // Local visibility toggle
    const [visible, setVisible] = useState(false);

    // Strength state – derived from field value
    const [strength, setStrength] = useState<PasswordStrengthResult>(
        calculatePasswordStrength(field.value ?? ""),
    );

    // Recalculate strength on every change
    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            field.onChange(e);
            setStrength(calculatePasswordStrength(e.target.value));
        },
        [field],
    );

    const resolvedValue = (value ?? field.value ?? "") as string;

    return (
        <div
            className={cn("flex-1 basis-3xs flex flex-col gap-2", classNameContainer)}
        >
            {/* Label */}
            <label
                htmlFor={name}
                className={cn(
                    "block text-sm font-medium",
                    hasError ? "text-red-500" : "text-gray-700",
                    classNameLabel,
                )}
            >
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {/* Input + toggle button */}
            <div className="relative">
                <Input
                    id={name}
                    name={field.name}
                    onBlur={field.onBlur}
                    onChange={handleChange}
                    ref={field.ref}
                    type={visible ? "text" : "password"}
                    placeholder={placeholder}
                    className={cn(
                        "pr-10",
                        hasError
                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                            : "",
                        classNameInput,
                    )}
                    disabled={disabled}
                    value={resolvedValue}
                    aria-invalid={hasError}
                    aria-describedby={
                        hasError
                            ? `${name}-error`
                            : helperText
                                ? `${name}-helper`
                                : undefined
                    }
                />

                {showToggle && resolvedValue.length > 0 && (
                    <button
                        type="button"
                        onClick={() => setVisible((v) => !v)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                        tabIndex={-1}
                        aria-label={visible ? "Hide password" : "Show password"}
                    >
                        {visible ? (
                            <IoEyeOffOutline size={18} />
                        ) : (
                            <IoEyeOutline size={18} />
                        )}
                    </button>
                )}
            </div>

            {/* Error message */}
            {hasError && (
                <p
                    className="-mt-0.5 text-xs text-red-500"
                    id={`${name}-error`}
                    role="alert"
                >
                    {error?.message}
                </p>
            )}

            {/* Helper text (only when no error) */}
            {!hasError && helperText && (
                <p
                    id={`${name}-helper`}
                    className="text-xs text-blue-500 flex items-center gap-1 mt-0.5"
                >
                    <CgDanger size={20} className="text-blue-500" />
                    {helperText}
                </p>
            )}

            {/* Password strength bar (only when enabled + no error) */}
            {!hasError && showStrengthBar && resolvedValue.length > 0 && (
                <StrengthBar strength={strength} />
            )}
        </div>
    );
}
