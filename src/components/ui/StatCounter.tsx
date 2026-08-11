"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/lib/useInView";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/**
 * Counts up to `value` when scrolled into view.
 *
 * Accessibility: the fully-formed final string is always in the DOM in a
 * visually-hidden span, and the animating digits are aria-hidden — a screen
 * reader never hears a stream of intermediate numbers. Under reduced motion the
 * value snaps straight to its final state.
 */
export function StatCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  durationMs = 1600,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  durationMs?: number;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>("-60px");
  const reduceMotion = usePrefersReducedMotion();
  const [animated, setAnimated] = useState(0);

  // Derived, so the reduced-motion path needs no effect and no state write.
  const display = reduceMotion ? value : animated;

  const format = (n: number) =>
    n.toLocaleString("en-AU", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

  useEffect(() => {
    if (!inView || reduceMotion) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      // Ease-out-expo: fast start, gentle settle.
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setAnimated(value * eased);

      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, durationMs, reduceMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {/* The final value, for assistive tech. A visually-hidden span rather
          than aria-label, which is prohibited on a span with no role. */}
      <span className="sr-only">{`${prefix}${format(value)}${suffix}`}</span>
      <span aria-hidden="true">
        {prefix}
        {format(display)}
        {suffix}
      </span>
    </span>
  );
}
