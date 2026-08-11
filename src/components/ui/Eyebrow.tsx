import { cn } from "@/lib/cn";

/**
 * Small mono label above a heading. The mono face is what makes the brand read
 * technical rather than generic-agency, so it earns a dedicated primitive.
 *
 * Muted, not accented: this sits directly above an `ink` heading, and in a
 * monotone palette an accented eyebrow would simply be the brightest text in
 * the block — louder than the heading it introduces. Hue used to keep the two
 * apart without ranking them; luminance can't, so the eyebrow steps down.
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
        "inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
