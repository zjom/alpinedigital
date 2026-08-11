import { cn } from "@/lib/cn";

/**
 * Raised surface with a hairline top edge. `interactive` adds the hover
 * treatment — only use it when the whole card is genuinely clickable.
 */
export function Card({
  children,
  className,
  interactive = false,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  as?: "div" | "article" | "li";
}) {
  return (
    <Tag
      className={cn(
        "relative overflow-hidden rounded-2xl border border-line bg-surface/70 edge-lit backdrop-blur-sm",
        // The lift is carried by the border stepping up the neutral ramp; the
        // shadow is a faint white bloom because a dark shadow is invisible
        // against a black canvas.
        interactive &&
          "group transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:bg-surface-2/80 hover:shadow-[0_18px_50px_-20px_rgb(255_255_255/0.10)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/**
 * Soft light bloom in a card's top-right corner, as if lit from off-card.
 * Decorative only, and untinted — `danger` is the palette's one chromatic token
 * and it is reserved for invalid state, so there is no second tone to offer.
 *
 * A gradient rather than a blurred circle: `blur-*` renders into a filter layer
 * bounded by the element, which Card's `overflow-hidden` then clips to a hard
 * rectangle. That artefact was always there, just too dim to see until the
 * accent became white. The gradient reaches transparent well before the far
 * edges, so there is no boundary left for the clip to expose.
 */
export function CardGlow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 transition-opacity duration-500",
        "bg-[radial-gradient(ellipse_60%_55%_at_100%_0%,rgb(255_255_255/0.10),transparent_70%)]",
        className,
      )}
    />
  );
}
