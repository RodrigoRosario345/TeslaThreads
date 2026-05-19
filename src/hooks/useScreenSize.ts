"use client";

import { ScreenSize } from "@/interfaces";
import { BREAKPOINTS, computeScreenSize, getQuery } from "@/helpers";
import { useState, useEffect } from "react";

// Hook to verify if the current screen size matches the defined breakpoints.
export function useScreenSize(): ScreenSize {
    const [size, setSize] = useState<ScreenSize>(() => ({
        isMobile: false,
        isTablet: false,
        isDesktop: false,
        isWide: false,
        width: 0,
        mounted: false,
    }));

    useEffect(() => {
        const queries: Record<string, MediaQueryList> = {};
        for (const [key, value] of Object.entries(BREAKPOINTS)) {
            queries[key] = window.matchMedia(getQuery(value));
        }

        const onChange = () => setSize(computeScreenSize(queries));

        onChange();

        for (const mql of Object.values(queries)) {
            mql.addEventListener("change", onChange);
        }

        return () => {
            for (const mql of Object.values(queries)) {
                mql.removeEventListener("change", onChange);
            }
        };
    }, []);

    return size;
}

/**
 * Evaluates a CSS media query and returns a reactive boolean.
 *
 * @example
 * const isDark = useMediaQuery("(prefers-color-scheme: dark)");
 * const isPrint = useMediaQuery("print");
 * const isLandscape = useMediaQuery("(orientation: landscape)");
 */
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia(query);
        setMatches(mql.matches);

        const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
        mql.addEventListener("change", onChange);
        return () => mql.removeEventListener("change", onChange);
    }, [query]);

    return matches;
}
