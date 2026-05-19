"use client";

import { cn } from "@/lib/utils";
import type { PasswordStrengthResult } from "@/helpers";
import { RequirementItem } from "../RequirementItem/RequirementItem";

export interface StrengthBarProps {
    /** Result from calculatePasswordStrength(). */
    strength: PasswordStrengthResult;
}

// StrengthBar – Password strength indicator with bar, label & requirement checklist.
export function StrengthBar({ strength }: StrengthBarProps) {
    return (
        <div className="mt-1 space-y-1">
            {/* Colored progress bar */}
            <div className="h-1.5 w-full rounded-full bg-gray-200">
                <div
                    className={cn(
                        "h-full rounded-full transition-all duration-300",
                        strength.barColor,
                    )}
                    style={{ width: `${strength.percentage}%` }}
                />
            </div>

            {/* Strength label */}
            <p className={cn("font-medium", strength.textColor)}>{strength.label}</p>

            {/* Requirement checklist – shown until password is strong enough */}
            {strength.showRequirements && (
                <ul className="space-y-0.5">
                    <RequirementItem
                        met={strength.checks.minLength}
                        label="At least 8 characters"
                    />
                    <RequirementItem
                        met={strength.checks.hasLowercase}
                        label="Lowercase letter"
                    />
                    <RequirementItem
                        met={strength.checks.hasUppercase}
                        label="Uppercase letter"
                    />
                    <RequirementItem met={strength.checks.hasNumber} label="Number" />
                    <RequirementItem
                        met={strength.checks.hasSpecialChar}
                        label="Special character"
                    />
                </ul>
            )}
        </div>
    );
}
