'use client';

import { useState, useRef, useCallback, useMemo, type KeyboardEvent } from "react";

import { useClickOutside } from "@/hooks";
import type { SelectOption } from "@/interfaces/forms";

export interface UseSelectControllerOptions {
    items: SelectOption[];
    disabled?: boolean;
    /** Callback fired when an option is chosen. Receives the selected value. */
    onChange: (value: string | number) => void;
    /** The currently selected value (to compute display label). */
    currentValue: string | number;
}

export interface UseSelectControllerReturn {
    /** Whether the dropdown panel is open. */
    isOpen: boolean;
    /** Index of the currently focused option (-1 when none). */
    activeIndex: number;
    /** Text typed in the optional search input. */
    searchTerm: string;
    /** Ref to attach to the outermost wrapper (for click-outside). */
    containerRef: React.RefObject<HTMLDivElement | null>;
    /** Ref to attach to the <ul> (for scroll management). */
    listRef: React.RefObject<HTMLUListElement | null>;
    /** ID of the active option (for aria-activedescendant). */
    activeId: string | undefined;
    /** Label of the currently selected option, or "" if nothing selected. */
    displayValue: string;
    /** Items filtered by searchTerm (full list when search is inactive). */
    filteredItems: SelectOption[];
    /** Toggle open / close. */
    toggle: () => void;
    /** Select a specific option. */
    select: (option: SelectOption) => void;
    /** Handler for keyboard events (ArrowUp/Down, Enter, Escape, Tab). */
    handleKeyDown: (e: KeyboardEvent) => void;
    /** Update search term & reset active index. */
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

// custom useSelectController to manage select dropdown (keyboard nav, click-outside, search, scrolling).
export function useSelectController({
    items,
    disabled = false,
    onChange,
    currentValue,
}: UseSelectControllerOptions): UseSelectControllerReturn {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number>(-1);
    const [searchTerm, setSearchTerm] = useState("");

    const containerRef = useRef<HTMLDivElement>(null!);
    const listRef = useRef<HTMLUListElement>(null!);

    // derived state
    const selectedOption = items.find((item) => item.value === currentValue);
    const displayValue = selectedOption?.label ?? "";

    const filteredItems = useMemo(
        () =>
            searchTerm
                ? items.filter((item) =>
                    item.label.toLowerCase().includes(searchTerm.toLowerCase()),
                )
                : items,
        [items, searchTerm],
    );

    const nameHint = typeof currentValue === "string" ? currentValue : String(currentValue);

    const activeId =
        isOpen && activeIndex >= 0
            ? `ctrl-select-option-${nameHint}-${activeIndex}`
            : undefined;

    // close on outside click
    useClickOutside({
        ref: containerRef,
        callback: () => setIsOpen(false),
    });

    // handlers
    const toggle = useCallback(() => {
        if (disabled) return;
        setIsOpen((prev) => {
            if (!prev) setActiveIndex(-1);
            return !prev;
        });
    }, [disabled]);

    const select = useCallback(
        (option: SelectOption) => {
            onChange(option.value);
            setIsOpen(false);
            setSearchTerm("");
        },
        [onChange],
    );

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (disabled) return;

            switch (e.key) {
                case "ArrowDown":
                    e.preventDefault();
                    if (!isOpen) {
                        setIsOpen(true);
                        setActiveIndex(0);
                    } else {
                        setActiveIndex((prev) =>
                            prev < filteredItems.length - 1 ? prev + 1 : 0,
                        );
                    }
                    break;

                case "ArrowUp":
                    e.preventDefault();
                    if (isOpen) {
                        setActiveIndex((prev) =>
                            prev > 0 ? prev - 1 : filteredItems.length - 1,
                        );
                    }
                    break;

                case "Enter":
                    e.preventDefault();
                    if (isOpen && activeIndex >= 0) {
                        select(filteredItems[activeIndex]);
                    } else {
                        setIsOpen((prev) => !prev);
                    }
                    break;

                case "Escape":
                    e.preventDefault();
                    setIsOpen(false);
                    break;

                case "Tab":
                    setIsOpen(false);
                    break;

                default:
                    break;
            }
        },
        [isOpen, activeIndex, filteredItems, select, disabled],
    );

    // scroll active item into view
    if (activeId) {
        const el = document.getElementById(activeId);
        el?.scrollIntoView({ block: "nearest" });
    }

    return {
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
    };
}
