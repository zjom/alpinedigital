import { PLACEHOLDER_CONTENT } from "@/content/site";

/**
 * Dev-only warning that placeholder content is still in place.
 *
 * Guarded twice — on the content flag and on NODE_ENV — so it can never render
 * in a production build. Set PLACEHOLDER_CONTENT to false in src/content/site.ts
 * once the checklist in src/content/README.md is done.
 */
export function PlaceholderRibbon() {
  if (!PLACEHOLDER_CONTENT || process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    /* Bottom-right: bottom-left is where Next's own dev indicator sits. */
    <div className="pointer-events-none fixed right-3 bottom-3 z-100 hidden max-w-[15rem] rounded-lg border border-glow/40 bg-glow/10 px-3 py-2 font-mono text-[0.625rem] leading-relaxed text-glow-soft backdrop-blur-sm lg:block">
      <strong className="block font-bold uppercase tracking-wider">
        Placeholder content
      </strong>
      Case studies, testimonials and stats are illustrative. See
      src/content/README.md before launch.
    </div>
  );
}
