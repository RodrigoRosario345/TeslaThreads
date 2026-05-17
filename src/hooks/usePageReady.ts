"use client";

import { useState, useEffect, useRef } from "react";

/** 
  Module-level flag: becomes `true` as soon as the first page load finishes.
  On subsequent SPA navigations we know NOT to wait for `window.load` again,
  so we can animate immediately.
 */
let globalPageReady = false;

/** 
  Detects whether the page (including JS bundles, CSS, images, etc.)
  has fully finished loading.
 
  - **Hard reload**: `globalPageReady = false` → waits for `window.load`.
    Shows a pure CSS loader in the meantime (no framer-motion dependency).
  - **SPA navigation**: `globalPageReady = true` → `ready` starts as `true`
    and the animation fires immediately, no intermediate loader.
  - **SSR**: `ready = false` (no `window`), allows sending loader with the HTML.
  */

export function usePageReady(): boolean {
    const [ready, setReady] = useState(globalPageReady);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        // If `globalPageReady` is already true, it means a previous page load finished.
        if (globalPageReady) {
            if (!ready) setReady(true);
            return;
        }

        // If the document is already fully loaded (e.g. from bfcache or very fast reload), we can skip waiting for `window.load`.
        if (document.readyState === "complete") {
            rafRef.current = requestAnimationFrame(() => {
                globalPageReady = true;
                setReady(true);
            });
            return () => {
                if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
            };
        }

        // Hard reload: wait for `window.load` event.
        const onLoad = () => {
            rafRef.current = requestAnimationFrame(() => {
                globalPageReady = true;
                setReady(true);
            });
        };

        window.addEventListener("load", onLoad);
        return () => {
            window.removeEventListener("load", onLoad);
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return ready;
}
