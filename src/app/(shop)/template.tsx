"use client";

import { LoadingContent, TransitionAnimationPage } from "@/components";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const search = useSearchParams().toString();

    return (
        <Suspense fallback={<LoadingContent />}>
            <TransitionAnimationPage key={`${pathname}?${search}`}>
                {children}
            </TransitionAnimationPage>
        </Suspense>
    );
}
