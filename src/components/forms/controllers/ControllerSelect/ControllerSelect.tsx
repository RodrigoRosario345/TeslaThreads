"use client";

import type { FieldValues } from "react-hook-form";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { useControllerField, useSelectController } from "@/hooks";
import { cn } from "@/lib/utils";
import type { BaseControllerProps, SelectOption } from "@/interfaces/forms";

export interface ControllerSelectProps<
    T extends FieldValues,
    TT,
> extends BaseControllerProps<T, TT> {
    items: SelectOption[];
    placeholder?: string;
    className?: string;
    searchable?: boolean;
}

export function ControllerSelect<T extends FieldValues, TT>({
    name,
    label,
    control,
    items,
    placeholder = "Select an option",
    disabled = false,
    helperText,
    required = false,
    className,
    searchable = false,
}: ControllerSelectProps<T, TT>) {
    const { field, error, hasError } = useControllerField(name, control);

    const {
        isOpen,
        activeIndex,
        searchTerm,
        containerRef,
        listRef,
        activeId,
        displayValue,
        filteredItems,
        toggle,
        select,
        handleKeyDown,
        setSearchTerm,
    } = useSelectController({
        items,
        disabled,
        onChange: (val) => field.onChange(val),
        currentValue: field.value ?? "",
    });

    return (
        <div ref={containerRef} className={cn("flex-1 basis-3xs flex flex-col gap-2", className)}>
            {/* Label */}
            <label
                htmlFor={name}
                className={cn(
                    "block text-sm font-medium",
                    hasError ? "text-red-500" : "text-gray-700",
                )}
            >
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {/* Trigger & dropdown */}
            <div className="relative">
                <input type="hidden" name={field.name} value={field.value ?? ""} />

                {/* Visible trigger */}
                <button
                    type="button"
                    id={name}
                    onClick={toggle}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    aria-invalid={hasError}
                    aria-describedby={
                        hasError
                            ? `${name}-error`
                            : helperText
                                ? `${name}-helper`
                                : undefined
                    }
                    className={cn(
                        "w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-left",
                        "focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        "flex items-center justify-between gap-2",
                        !displayValue && "text-gray-400",
                        hasError &&
                        "border-red-500 focus:ring-red-500 focus:border-red-500",
                    )}
                >
                    <span className="truncate">{displayValue || placeholder}</span>
                    <span className="shrink-0 text-gray-400">
                        {isOpen ? <IoIosArrowUp size={18} /> : <IoIosArrowDown size={18} />}
                    </span>
                </button>

                {/* Dropdown */}
                {isOpen && (
                    <div className="absolute z-10 mt-1.5 w-full rounded-md bg-white shadow-lg border border-gray-200 p-1">
                        {searchable && (
                            <div className="px-3 pt-2 pb-1">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                    }}
                                    placeholder="Search..."
                                    className="w-full rounded border border-gray-200 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    autoFocus
                                />
                            </div>
                        )}

                        <ul
                            ref={listRef}
                            role="listbox"
                            aria-activedescendant={activeId}
                            className="max-h-60 text-sm overflow-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-slate-50 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-slate-400"
                        >
                            {filteredItems.length === 0 ? (
                                <li className="px-4 py-3 text-gray-400 text-center text-xs">
                                    No results found
                                </li>
                            ) : (
                                filteredItems.map((item, idx) => (
                                    <li
                                        key={item.id}
                                        id={`ctrl-select-option-${field.value ?? ""}-${idx}`}
                                        role="option"
                                        aria-selected={item.value === field.value}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            select(item);
                                        }}
                                        className={cn(
                                            "px-4 py-2 cursor-pointer transition-colors rounded",
                                            item.value === field.value && "bg-slate-200 font-medium",
                                            idx === activeIndex && item.value !== field.value && "bg-slate-100",
                                            item.value !== field.value && idx !== activeIndex && "hover:bg-slate-100",
                                        )}
                                    >
                                        {item.label}
                                    </li>
                                )
                                )
                            )}
                        </ul>
                    </div>
                )}
            </div>

            {/* Error */}
            {hasError && (
                <p id={`${name}-error`} className="-mt-0.5 text-xs text-red-500" role="alert">
                    {error?.message}
                </p>
            )}

            {/* Helper */}
            {!hasError && helperText && (
                <p className="text-xs text-gray-500" id={`${name}-helper`}>
                    {helperText}
                </p>
            )}
        </div>
    );
}
