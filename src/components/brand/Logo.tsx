import Link from "next/link";
import { cn } from "@/lib/cn";
import {
  LOCKUP_PATHS,
  LOCKUP_VIEWBOX,
  MARK_PATH,
  MARK_VIEWBOX,
} from "./logoPaths";

/**
 * The "A" peak mark on its own — for square crops where the stacked lockup
 * would render the wordmark too small to read.
 */
export function PeakGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      fill="currentColor"
      className={cn("h-7 w-auto text-ink", className)}
      aria-hidden="true"
    >
      <path d={MARK_PATH} />
    </svg>
  );
}

/** The full stacked lockup: "Alpine" over "digital". */
export function Wordmark({ className }: { className?: string }) {
  return (
    <svg
      viewBox={LOCKUP_VIEWBOX}
      fill="currentColor"
      className={cn("h-10 w-auto text-ink", className)}
      aria-hidden="true"
    >
      {LOCKUP_PATHS.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

export function Logo({
  className,
  href = "/",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="Alpine Digital — home"
      className={cn(
        "inline-flex items-center rounded-lg transition-opacity hover:opacity-90",
        className,
      )}
    >
      <Wordmark className="h-9 sm:h-10" />
    </Link>
  );
}
