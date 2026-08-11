import type { Metadata } from "next";
import { site } from "@/content/site";

/** Production origin. Env wins so preview deploys resolve correctly. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || site.url
).replace(/\/$/, "");

export function absoluteUrl(path = "/"): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Per-page metadata builder. Every page uses this so titles, canonicals and
 * OG tags stay consistent and nothing silently ships without them.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} — ${site.name}`,
      description,
      url,
      siteName: site.name,
      locale: "en_AU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${site.name}`,
      description,
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
