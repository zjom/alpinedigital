"use client";

import { useInView } from "@/lib/useInView";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds. Use with a sibling index for a stagger. */
  delay?: number;
  /** Distance travelled on entry, px. */
  y?: number;
  as?: "div" | "section" | "li" | "article" | "span";
};

/**
 * The single motion vocabulary for the site: fade + short rise, once, on scroll
 * into view.
 *
 * The transition itself is pure CSS (see `.reveal` in globals.css) so it runs on
 * the compositor and ships no animation library. Reduced motion and the
 * no-JavaScript case are both handled in CSS rather than here — see the
 * `(scripting: enabled)` guard — so this component never needs to branch.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
  as: Tag = "div",
}: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <Tag
      // `as` widens the element union, so the shared HTMLElement ref needs a
      // cast to satisfy each concrete tag's ref type.
      ref={ref as React.Ref<never>}
      data-shown={inView ? "true" : "false"}
      className={cn("reveal", className)}
      style={
        {
          "--reveal-delay": `${delay}s`,
          "--reveal-y": `${y}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
