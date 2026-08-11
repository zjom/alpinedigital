import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { StickyMobileCta } from "@/components/layout/StickyMobileCta";
import { NoiseOverlay } from "@/components/brand/NoiseOverlay";
import { PlaceholderRibbon } from "@/components/brand/PlaceholderRibbon";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { siteUrl } from "@/lib/seo";
import { site } from "@/content/site";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  keywords: [
    "web design Australia",
    "small business website",
    "ecommerce development",
    "Google Ads management",
    "Google Merchant Center",
    "custom business software",
    "digital consultancy",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: site.name,
    url: siteUrl,
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-AU"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-full flex-col bg-base text-ink">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <SkipLink />
        <NoiseOverlay />
        <Header />
        {/* pt clears the fixed header; pb clears the sticky mobile CTA bar. */}
        <main id="main" className="flex-1 pt-16 pb-20 sm:pt-20 lg:pb-0">
          {children}
        </main>
        <Footer />
        <StickyMobileCta />
        <PlaceholderRibbon />
      </body>
    </html>
  );
}
