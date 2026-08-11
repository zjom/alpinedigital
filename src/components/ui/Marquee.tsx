import { cn } from "@/lib/cn";

/**
 * Infinite horizontal scroller. The list is rendered twice and translated by
 * -50%, which makes the loop seamless. CSS-only, so it costs no JS; the global
 * reduced-motion rule freezes it.
 */
export function Marquee({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden mask-x-fade", className)}>
      <div className="flex w-max animate-marquee-x">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="flex shrink-0 items-center"
            // The duplicate exists only to make the loop seamless.
            aria-hidden={copy === 1}
          >
            {items.map((item) => (
              <li
                key={`${copy}-${item}`}
                className="flex items-center gap-8 px-8 py-1"
              >
                <span className="font-display text-lg font-semibold whitespace-nowrap text-faint transition-colors hover:text-muted sm:text-xl">
                  {item}
                </span>
                <span
                  aria-hidden
                  className="size-1 shrink-0 rounded-full bg-line-strong"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
