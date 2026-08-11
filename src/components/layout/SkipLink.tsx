/**
 * Visually hidden until focused, then pinned top-left. First tab stop on
 * every page.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-ice focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-base"
    >
      Skip to content
    </a>
  );
}
