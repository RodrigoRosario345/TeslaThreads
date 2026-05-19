import { ScreenSize } from "@/interfaces";

/**
 * Tailwind v4 default breakpoints mirrored here so the hook
 * stays in sync with what CSS media queries the app uses.
 */
export const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
} as const;

export type BreakpointKey = keyof typeof BREAKPOINTS;

/**
 * Converts a pixel threshold into a valid CSS media query string
 * consumable by `window.matchMedia`.
 *
 * @example getQuery(640) → "(min-width: 640px)"
 */
export function getQuery(minWidth: number): string {
    return `(min-width: ${minWidth}px)`;
}

/**
 * Given all the `MediaQueryList` objects (one per breakpoint),
 * derives the high-level booleans the UI needs.
 */
export function computeScreenSize(
    entries: Record<string, MediaQueryList>,
): ScreenSize {
    const matches = (bp: BreakpointKey) => entries[bp]?.matches ?? false;

    return {
        isMobile: !matches("sm"),
        isTablet: matches("sm") && !matches("lg"),
        isDesktop: matches("lg"),
        isWide: matches("xl"),
        width: typeof window !== "undefined" ? window.innerWidth : 0,
        mounted: true,
    };
}
