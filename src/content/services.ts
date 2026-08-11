import type { LucideIcon } from "lucide-react";
import {
  Globe,
  ShoppingBag,
  TrendingUp,
  Mail,
  Boxes,
  LifeBuoy,
} from "lucide-react";

export type Service = {
  /** Used as the in-page anchor from the footer and nav. */
  id: string;
  icon: LucideIcon;
  title: string;
  /** One line, used on the home grid. */
  summary: string;
  /** Longer pitch, used on /services. */
  body: string;
  /** Concrete deliverables — specificity is what makes this believable. */
  includes: readonly string[];
  /** The outcome the client actually cares about. */
  outcome: string;
};

export const services: readonly Service[] = [
  {
    id: "websites",
    icon: Globe,
    title: "Websites & design",
    summary:
      "Fast, beautiful sites that turn visitors into customers — designed, built and maintained end to end.",
    body: "Most small business websites are slow, hard to update, and quietly losing enquiries. We design and build yours from scratch: your brand, your words, your customers' questions answered in the right order. Every site we ship is fast on a phone on mobile data, ranks properly on Google, and is genuinely easy for you to edit yourself.",
    includes: [
      "Brand-led design, no templates",
      "Copywriting that sells, written with you",
      "Mobile-first build, sub-second load times",
      "Technical SEO and Google Search Console setup",
      "A content editor you can actually use",
      "Analytics so you can see what's working",
    ],
    outcome: "A site that looks like the business you actually are.",
  },
  {
    id: "ecommerce",
    icon: ShoppingBag,
    title: "Ecommerce",
    summary:
      "Online stores built to scale — from your first order to your millionth dollar.",
    body: "We've built custom ecommerce platforms now processing millions in annual revenue. Whether that's a clean Shopify build or a fully bespoke storefront wired into your existing stock and accounting systems, we start from how your business actually runs, not from what a template allows.",
    includes: [
      "Custom or platform builds — whichever genuinely fits",
      "Payments, shipping and tax configured correctly",
      "Inventory sync with your existing systems",
      "Checkout tuned for conversion, not just function",
      "Abandoned cart and lifecycle email flows",
      "Staff training on running the store day to day",
    ],
    outcome: "A storefront that sells while you sleep.",
  },
  {
    id: "google",
    icon: TrendingUp,
    title: "Google Ads & Merchant Center",
    summary:
      "Get found by people already searching for what you sell — with budget that works, not burns.",
    body: "Google Ads is easy to spend money on and hard to make money from. We set up and manage campaigns with the same discipline we'd use on our own budget: proper conversion tracking first, tight targeting second, and a monthly report in plain English that tells you what you actually got for the spend.",
    includes: [
      "Google Ads account setup, audit or rescue",
      "Merchant Center feed build and error clean-up",
      "Shopping and Performance Max campaigns",
      "Conversion tracking that reports real revenue",
      "Local SEO and Google Business Profile",
      "Monthly reporting in plain English",
    ],
    outcome: "Spend you can justify, tracked to the dollar.",
  },
  {
    id: "email",
    icon: Mail,
    title: "Email & domains",
    summary:
      "Professional addresses at your own domain, set up properly so your mail lands in inboxes.",
    body: "Still running the business off a Gmail or Hotmail address? It costs you credibility on every quote you send. We get you onto proper email at your own domain, migrate your existing mail across without losing anything, and configure SPF, DKIM and DMARC so your messages stop landing in spam.",
    includes: [
      "Domain registration, transfer and DNS management",
      "Google Workspace or Microsoft 365 setup",
      "Full mailbox migration, nothing lost",
      "SPF, DKIM and DMARC configured correctly",
      "Shared inboxes, aliases and signatures",
      "Renewals tracked so nothing silently expires",
    ],
    outcome: "Email that looks professional and actually arrives.",
  },
  {
    id: "bespoke",
    icon: Boxes,
    title: "Bespoke systems",
    summary:
      "The tool that doesn't exist yet — booking, quoting, inventory, portals, automation.",
    body: "Sometimes the software you need simply isn't for sale. Quoting tools, job scheduling, customer portals, stock systems, integrations between two things that refuse to talk to each other. We scope the problem properly, build the smallest thing that solves it, and grow it from there. There's no real limit to what we'll take on.",
    includes: [
      "Discovery to find the real bottleneck",
      "Custom web applications and internal tools",
      "Customer and client portals",
      "Automation between the tools you already pay for",
      "API integrations with suppliers and accounting",
      "Documentation and handover, always",
    ],
    outcome: "Hours back every week, permanently.",
  },
  {
    id: "support",
    icon: LifeBuoy,
    title: "Care & support",
    summary:
      "Training, maintenance and a human on the other end of the phone. Included in everything.",
    body: "We're not interested in building something you can't run. Every engagement includes hands-on training for you and your team, written documentation in plain English, and ongoing support from the people who actually built the thing. You will never be passed to a ticket queue.",
    includes: [
      "One-to-one training for you and your staff",
      "Plain-English documentation you'll actually read",
      "Security updates, backups and uptime monitoring",
      "Content and product updates when you need them",
      "Priority support direct to the people who built it",
      "Quarterly reviews on what to improve next",
    ],
    outcome: "You're never stuck, and never alone with it.",
  },
] as const;
