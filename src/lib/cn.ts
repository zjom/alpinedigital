/**
 * Minimal class-name joiner. Deliberately not clsx/tailwind-merge — the
 * component API here passes `className` through in a single, predictable slot,
 * so there is nothing to de-conflict and no reason to ship the dependency.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
