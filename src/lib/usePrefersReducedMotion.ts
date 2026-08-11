"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * Reads the OS reduced-motion setting, SSR-safe.
 *
 * useSyncExternalStore rather than useState + useEffect: the value can be read
 * during render on the client, so nothing has to be written to state inside an
 * effect, and it stays in sync if the user changes the setting mid-session.
 * The server snapshot is `false`, matching the markup the client first renders.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
