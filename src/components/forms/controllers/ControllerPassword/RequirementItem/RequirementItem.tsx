"use client";

import { FaCheck, FaTimes } from "react-icons/fa";

import { cn } from "@/lib/utils";

const checkIcons = [
    { color: "text-gray-400", icon: <FaTimes size={12} /> },
    { color: "text-green-500", icon: <FaCheck size={12} /> },
] as const;

export interface RequirementItemProps {
    /** Whether this requirement has been met. */
    met: boolean;
    /** Human-readable label, e.g. "At least 8 characters". */
    label: string;
}

// RequirementItem – Single checklist row for password criteria.
// Used by StrengthBar to display each requirement with a ✓/✗ icon.
export function RequirementItem({ met, label }: RequirementItemProps) {
    const { color, icon } = checkIcons[+met];

    return (
        <li className={cn("flex items-center gap-1.5", color)}>
            {icon}
            <span className={met ? "text-gray-700" : "text-gray-400"}>{label}</span>
        </li>
    );
}
