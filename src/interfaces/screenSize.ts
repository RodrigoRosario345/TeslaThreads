export interface ScreenSize {
    // < 640px — phone
    isMobile: boolean;
    // ≥ 640px && < 1024px — tablet
    isTablet: boolean;
    // ≥ 1024px — desktop / laptop
    isDesktop: boolean;
    // ≥ 1280px — wide screens
    isWide: boolean;
    // Current viewport width in px (0 during SSR)
    width: number;
    // `true` once the real value is known — `false` during SSR / hydration
    mounted: boolean;
}
