import { cn } from "@/lib/cn";

/**
 * The signature brand motif: layered alpine topographic contour lines.
 *
 * Pure inline SVG + CSS — no images, no JS, no network cost. Radially masked so
 * it dissolves at the edges, and drifting very slowly (disabled under
 * prefers-reduced-motion by the global rule in globals.css).
 *
 * Reused behind the hero, the CTA band, and every page header. This is the one
 * element that makes the pages read as a single designed system.
 */

/**
 * Nested contour rings around a common peak. Each ring is the same closed curve
 * scaled about the summit, which is what makes them read as elevation lines
 * rather than arbitrary squiggles.
 */
const CONTOURS = [
  "M-40 420 C 120 400, 200 330, 330 292 S 560 214, 700 250 S 940 356, 1120 330 S 1360 262, 1480 300",
  "M-40 470 C 130 452, 216 380, 344 340 S 566 258, 706 296 S 946 404, 1126 378 S 1364 310, 1480 350",
  "M-40 522 C 142 504, 232 430, 358 388 S 574 304, 712 344 S 952 452, 1132 426 S 1368 358, 1480 400",
  "M-40 576 C 154 558, 248 482, 372 438 S 582 350, 718 392 S 958 500, 1138 474 S 1372 406, 1480 450",
  "M-40 632 C 166 614, 264 534, 386 488 S 590 398, 724 440 S 964 550, 1144 524 S 1376 456, 1480 502",
  "M-40 690 C 178 672, 280 588, 400 540 S 598 448, 730 490 S 970 602, 1150 576 S 1380 508, 1480 556",
  "M-40 750 C 190 732, 296 644, 414 594 S 606 500, 736 542 S 976 656, 1156 630 S 1384 562, 1480 612",
];

/** A second, tighter cluster offset to the right for depth. */
const CONTOURS_FAR = [
  "M-40 250 C 180 236, 300 180, 430 158 S 640 120, 780 150 S 1010 226, 1180 204 S 1380 156, 1480 184",
  "M-40 292 C 190 278, 314 218, 444 196 S 650 156, 788 188 S 1018 266, 1188 244 S 1384 194, 1480 224",
  "M-40 336 C 200 322, 328 258, 458 234 S 660 192, 796 226 S 1026 306, 1196 284 S 1388 232, 1480 264",
];

export function TopoBackdrop({
  className,
  /** `hero` is denser and brighter; `subtle` for inner page headers. */
  intensity = "subtle",
}: {
  className?: string;
  intensity?: "hero" | "subtle";
}) {
  const isHero = intensity === "hero";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {/* Aurora wash — the colour bed the contours sit on. */}
      <div className="absolute inset-0 mask-radial-fade">
        <div
          className={cn(
            "absolute -top-1/3 left-1/2 h-[120%] w-[140%] -translate-x-1/2 animate-aurora",
            // Slate alphas run higher than the sand ones: it is roughly half as
            // luminous, so matched alphas would leave the cool half of the wash
            // barely visible against the canvas.
            "bg-[radial-gradient(ellipse_38%_46%_at_32%_38%,rgb(127_163_196/0.30),transparent_70%),radial-gradient(ellipse_34%_40%_at_72%_28%,rgb(194_162_119/0.14),transparent_70%)]",
            !isHero && "opacity-60",
          )}
        />
      </div>

      {/* Contour lines */}
      <svg
        className={cn(
          "absolute inset-0 size-full mask-radial-fade animate-topo-drift",
          isHero ? "opacity-100" : "opacity-70",
        )}
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <linearGradient id="topo-ice" x1="0" y1="0" x2="1" y2="0.4">
            <stop offset="0%" stopColor="#7FA3C4" stopOpacity="0.07" />
            <stop offset="40%" stopColor="#7FA3C4" stopOpacity="0.46" />
            <stop offset="78%" stopColor="#C2A277" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#C2A277" stopOpacity="0.04" />
          </linearGradient>
          <linearGradient id="topo-far" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7FA3C4" stopOpacity="0.04" />
            <stop offset="55%" stopColor="#7FA3C4" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#7FA3C4" stopOpacity="0.03" />
          </linearGradient>
        </defs>

        <g stroke="url(#topo-far)" strokeWidth="1">
          {CONTOURS_FAR.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>

        <g stroke="url(#topo-ice)" strokeWidth="1.25">
          {CONTOURS.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
      </svg>

      {/* Grounds the composition and stops the motif fighting the copy. */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(5_7_10/0.35)_0%,transparent_35%,rgb(5_7_10/0.85)_100%)]" />
    </div>
  );
}
