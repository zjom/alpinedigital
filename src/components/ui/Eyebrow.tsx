import { cn } from "@/lib/cn";

/**
 * Small mono label above a heading. The mono face is what makes the brand read
 * technical rather than generic-agency, so it earns a dedicated primitive.
 */
export function Eyebrow({
  children,
  className,
  withDot = true,
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
      {withDot ? (
        <span
          aria-hidden
          className="size-1.5 shrink-0 rounded-full bg-ice shadow-[0_0_10px_2px_rgb(78_225_210/0.6)]"
        />
      ) : null}
      {children}
    </span>
  );
}
