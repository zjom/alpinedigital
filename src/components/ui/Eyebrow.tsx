import { cn } from "@/lib/cn";

/**
 * Small mono label above a heading. The mono face is what makes the brand read
 * technical rather than generic-agency, so it earns a dedicated primitive.
 */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  withDot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-ice",
        className,
      )}
    >
      {children}
    </span>
  );
}
