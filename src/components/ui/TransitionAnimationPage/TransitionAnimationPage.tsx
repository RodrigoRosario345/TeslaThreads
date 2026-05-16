"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePageReady } from "@/hooks";
import { LoadingContent } from "../LoadingContent/LoadingContent";

export function TransitionAnimationPage({ children }: { children: React.ReactNode }) {
    const ready = usePageReady();

    return (
        <>
            {/* Pure CSS overlay loader: visible instantly even without JS.
                Unmounts with a fade-out when the page is ready. */}
            <AnimatePresence>
                {!ready && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <LoadingContent />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Real content: always in the DOM (SEO-friendly).
                Hidden via CSS during SSR/reload; framer-motion animates it when ready. */}
            <motion.div
                style={ready ? undefined : { opacity: 0 }}
                initial={{ y: 20, opacity: 0 }}
                animate={ready ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ ease: "easeInOut", duration: 0.75 }}
            >
                {children}
            </motion.div>
        </>
    );
}