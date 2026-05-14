"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

export function useCallbackUrl() {
    const pathname = usePathname();

    return useMemo(() => encodeURIComponent(pathname), [pathname]);
}
