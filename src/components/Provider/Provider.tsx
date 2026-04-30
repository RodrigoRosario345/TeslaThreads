"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";
import { LoadingContent } from "../ui/LoadingContent/LoadingContent";

export interface ProviderProps {
    children: React.ReactNode;
    session: Session | null;
}

export function Provider({ children, session }: ProviderProps) {
    return (
        <SessionProvider session={session}>
            <Suspense fallback={<LoadingContent />}>
                {children}
            </Suspense>
        </SessionProvider>
    );
}
