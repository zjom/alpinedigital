import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Wordmark + peak glyph. The glyph is the topo motif compressed to a mark:
 * a summit with two contour lines beneath it.
 *
 * PLACEHOLDER — swap for a supplied logo when one exists. Nothing else
 * references the mark's internals, so a drop-in replacement is safe.
 */
export function PeakGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={cn("size-7", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="peak-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7FA3C4" />
          <stop offset="100%" stopColor="#C2A277" />
        </linearGradient>
      </defs>
      {/* Summit */}
      <path
        d="M16 4 L27 23 H5 Z"
        stroke="url(#peak-grad)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Snowline */}
      <path
        d="M11.5 12.5 L16 9 L20.5 12.5"
        stroke="#7FA3C4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Contour beneath */}
      <path
        d="M2 28 C 8 26.5, 12 29, 16 28 S 25 26.5, 30 28"
        stroke="#7FA3C4"
        strokeOpacity="0.45"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
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
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-lg transition-opacity hover:opacity-90",
        className,
      )}
    >
      <PeakGlyph className="size-7 transition-transform duration-300 group-hover:-translate-y-0.5" />
      <span className="font-display text-[1.0625rem] font-bold tracking-tight text-ink">
        Alpine<span className="text-ice">Digital</span>
      </span>
      {/* Appended rather than set via aria-label: the accessible name must
          contain the visible text, or it fails label-content-name-mismatch. */}
      <span className="sr-only"> — home</span>
    </Link>
  );
}
