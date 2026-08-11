"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fires once when the element scrolls into view.
 *
 * A ~40-line IntersectionObserver hook rather than an animation library: the
 * site only ever needs "has this appeared yet", and pulling in `motion` for it
 * cost ~65kb of JS that measurably hurt mobile LCP.
 */
export function useInView<T extends HTMLElement>(rootMargin = "-80px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // No IntersectionObserver fallback: it predates every browser version that
    // can run React 19, and the `(scripting: enabled)` guard in globals.css
    // already keeps content visible anywhere the JS path doesn't run.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}
