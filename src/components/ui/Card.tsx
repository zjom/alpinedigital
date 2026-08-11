import { cn } from "@/lib/cn";

/**
 * Raised surface with a hairline top edge. `interactive` adds the ice hover
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
        interactive &&
          "group transition-all duration-300 hover:-translate-y-1 hover:border-ice/40 hover:bg-surface-2/80 hover:shadow-[0_18px_50px_-20px_rgb(127_163_196/0.28)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** Soft ice bloom pinned to a card corner. Decorative only. */
export function CardGlow({
  className,
  tone = "ice",
}: {
  className?: string;
  tone?: "ice" | "glow";
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute -top-24 -right-20 size-56 rounded-full blur-3xl transition-opacity duration-500",
        tone === "ice" ? "bg-ice/10" : "bg-glow/10",
        className,
      )}
    />
  );
}
