/**
 * Single source of truth for business identity, contact details and nav.
 *
 * ⚠️  PLACEHOLDER VALUES — see src/content/README.md for the swap checklist.
 */

/**
 * Flip to `false` once every placeholder in src/content has been replaced with
 * real, verified information. While `true`, a dev-only ribbon renders in the
 * corner (development builds only) so invented figures cannot ship unnoticed.
 */
export const PLACEHOLDER_CONTENT = true;

export const site = {
  name: "Alpine Digital",
  legalName: "Alpine Digital Pty Ltd", // PLACEHOLDER
  tagline: "Digital presence, engineered.",
  description:
    "Alpine Digital takes established Australian businesses online — websites, ecommerce, Google Ads and Merchant Center, email and domains, and bespoke systems. Training and support included, always.",

  // PLACEHOLDER — set to the real domain before launch. Used for canonicals,
  // sitemap URLs and OG image resolution.
  url: "https://alpinedigital.com.au",

  contact: {
    email: "hello@alpinedigital.com.au", // PLACEHOLDER
    /** E.164, for tel: links. */
    phone: "+61400000000", // PLACEHOLDER
    /** Human-readable, for display. */
    phoneDisplay: "+61 400 000 000", // PLACEHOLDER
    abn: "00 000 000 000", // PLACEHOLDER
  },

  location: {
    region: "Australia",
    city: "Melbourne", // PLACEHOLDER
    state: "VIC", // PLACEHOLDER
    country: "AU",
    /** Shown as the service area — we work remotely across both markets. */
    serviceArea: "Working with businesses across Australia",
  },

  social: {
    linkedin: "https://www.linkedin.com/company/alpinedigital", // PLACEHOLDER
    instagram: "https://www.instagram.com/alpinedigital", // PLACEHOLDER
  },

  /** Typical first-reply time, stated on the contact page. Keep it honest. */
  responseTime: "within one business day",

  founded: "2024", // PLACEHOLDER
} as const;

/**
 * Booking link. Set NEXT_PUBLIC_BOOKING_URL to a Cal.com / Calendly URL.
 * Falls back to /contact so the CTA is never dead, even unconfigured.
 */
export const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || "/contact";

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
] as const;

export const footerNav = {
  Company: [
    { label: "About", href: "/about" },
    { label: "Our process", href: "/process" },
    { label: "Case studies", href: "/work" },
    { label: "Contact", href: "/contact" },
  ],
  Services: [
    { label: "Websites & design", href: "/services#websites" },
    { label: "Ecommerce", href: "/services#ecommerce" },
    { label: "Google Ads & Merchant", href: "/services#google" },
    { label: "Email & domains", href: "/services#email" },
    { label: "Bespoke systems", href: "/services#bespoke" },
    { label: "Care & support", href: "/services#support" },
  ],
  Legal: [
    { label: "Privacy policy", href: "/legal/privacy" },
    { label: "Terms of service", href: "/legal/terms" },
  ],
} as const;
