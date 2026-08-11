/**
 * ⚠️  ALL CONTENT IN THIS FILE IS PLACEHOLDER.
 *
 * Client names, figures and quotes below are ILLUSTRATIVE ONLY and must be
 * replaced with real, client-approved numbers before launch. Publishing
 * invented revenue figures or testimonials is both a trust risk and, under
 * Australian Consumer Law, potentially misleading conduct.
 *
 * See src/content/README.md for the swap checklist.
 */

export type CaseStudyMetric = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  /** Shown under the number for context. */
  note?: string;
};

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  location: string;
  /** Headline outcome — the reason to click. */
  headline: string;
  /** One-paragraph summary for the index card. */
  summary: string;
  year: string;
  services: readonly string[];
  metrics: readonly CaseStudyMetric[];
  challenge: string;
  approach: readonly string[];
  build: string;
  result: string;
  quote?: {
    text: string;
    author: string;
    role: string;
  };
  /** Featured studies surface on the home page. */
  featured?: boolean;
};

export const caseStudies: readonly CaseStudy[] = [
  {
    slug: "ridgeline-building-supplies",
    client: "Ridgeline Building Supplies", // PLACEHOLDER
    industry: "Trade & building supplies",
    location: "Regional Victoria",
    year: "2025",
    headline: "From phone-and-fax to $4.2M online in eighteen months",
    summary:
      "A 30-year-old trade supplier with 11,000 SKUs, no website, and a fax machine still in daily use. We built a custom trade ecommerce platform with account pricing, credit terms and live stock from their existing ERP.",
    services: ["Ecommerce", "Bespoke systems", "Google Ads", "Training"],
    metrics: [
      {
        label: "Online revenue, year one",
        value: 4.2,
        prefix: "$",
        suffix: "M",
        decimals: 1,
      },
      { label: "Orders processed monthly", value: 2400, suffix: "+" },
      {
        label: "Hours saved on order entry weekly",
        value: 31,
        note: "Previously manual phone and fax orders",
      },
    ],
    challenge:
      "Ridgeline had a loyal trade base and a warehouse that ran like clockwork, but every single order came in by phone or fax and was rekeyed by hand. Two staff spent most of their week on data entry. Their competitors had been online for years and were quietly taking the younger builders.",
    approach: [
      "Sat in the trade counter for two days watching how orders were actually placed",
      "Mapped their existing ERP's stock and pricing tables before writing any code",
      "Prioritised trade account features over consumer polish — this is a B2B buyer",
      "Shipped a working ordering system in nine weeks, then iterated with real users",
    ],
    build:
      "A custom storefront rather than an off-the-shelf platform, because trade pricing genuinely is the hard part: every account has negotiated rates, credit limits and delivery runs. We built a live two-way sync with their ERP so stock and pricing are never stale, added saved order templates for repeat jobs, and gave the counter staff an internal view so they could place phone orders through the same system.",
    result:
      "Online now accounts for just over half of all orders. The two staff previously on data entry moved to customer service and outbound sales. Order errors, which had been a constant source of credit notes, dropped to near zero because builders now enter their own part numbers.",
    quote: {
      text: "We were the last ones still taking orders on a fax machine. Now our young blokes order from the ute at 6am and it's in the yard ready by seven. It's changed how the whole business runs.",
      author: "PLACEHOLDER — client name",
      role: "Managing Director, Ridgeline Building Supplies",
    },
    featured: true,
  },
  {
    slug: "harbour-lane-provisions",
    client: "Harbour Lane Provisions", // PLACEHOLDER
    industry: "Specialty food & retail",
    location: "Canberra, ACT",
    year: "2025",
    headline: "A single storefront turned into a national wholesale channel",
    summary:
      "A beloved local providore with a queue out the door on Saturdays and zero online presence. We built a dual retail/wholesale store and got their products into Google Shopping.",
    services: ["Ecommerce", "Google Merchant Center", "Websites", "Support"],
    metrics: [
      { label: "Wholesale accounts opened", value: 148, suffix: "" },
      {
        label: "Revenue from outside Canberra",
        value: 62,
        suffix: "%",
        note: "Was effectively 0% pre-launch",
      },
      { label: "Return on ad spend", value: 7.4, suffix: "x", decimals: 1 },
    ],
    challenge:
      "Harbour Lane had a genuinely excellent product range and a reputation that stopped at the city limits. The owners knew they should sell online but had been quoted eye-watering figures by two agencies and had no idea what was reasonable.",
    approach: [
      "Started with a fixed-scope discovery so they knew the real cost before committing",
      "Split the store into retail and trade-priced wholesale from day one",
      "Built the product feed properly so Merchant Center approved without disapprovals",
      "Trained two staff to manage products and orders themselves",
    ],
    build:
      "A Shopify build — the honest right answer here, rather than something custom they'd have to pay us to maintain forever. We built a wholesale portal on top with approval-gated pricing, wired up refrigerated shipping rules by postcode, and constructed a clean Merchant Center feed with proper GTINs so Shopping ads actually served.",
    result:
      "Wholesale is now a genuine second business line, and nearly two thirds of revenue comes from outside Canberra. The owners manage the catalogue themselves and call us when they want something new, not when something's broken.",
    quote: {
      text: "Two other agencies quoted us more than double and neither could explain what we were paying for. Alpine walked us through it line by line. We understood exactly what we were buying.",
      author: "PLACEHOLDER — client name",
      role: "Co-founder, Harbour Lane Provisions",
    },
    featured: true,
  },
  {
    slug: "summit-plumbing-group",
    client: "Summit Plumbing Group", // PLACEHOLDER
    industry: "Trades & services",
    location: "Brisbane, QLD",
    year: "2024",
    headline: "A custom job scheduler that gave back a day a week",
    summary:
      "A 14-van plumbing operation running scheduling on a whiteboard and three group chats. We built the dispatch and quoting system that no off-the-shelf product quite fitted.",
    services: ["Bespoke systems", "Websites", "Email & domains", "Training"],
    metrics: [
      {
        label: "Admin hours saved weekly",
        value: 38,
        note: "Across office and field staff",
      },
      { label: "Quote turnaround", value: 92, suffix: "% faster" },
      { label: "Jobs scheduled through the system", value: 15000, suffix: "+" },
    ],
    challenge:
      "Summit had tried three different field service products and abandoned all of them. Each assumed a way of working that didn't match how they actually ran jobs, and the cost per seat across 14 vans was brutal. They went back to the whiteboard.",
    approach: [
      "Spent a week understanding why the previous three tools were rejected",
      "Built the smallest useful thing first: dispatch only, nothing else",
      "Added quoting and invoicing once dispatch had been in daily use for a month",
      "Kept the interface deliberately simple — it's used on a phone, in a trench",
    ],
    build:
      "A web application built around how Summit actually dispatches: jobs assigned by area and skill, live status from the field, photos and notes attached on site, and quotes generated from a price book the office controls. It syncs to their accounting package so nothing is entered twice.",
    result:
      "The whiteboard is gone. Quotes that used to take two days now go out the same afternoon, which is the single biggest reason their conversion rate lifted. They own the system outright — no per-seat fee, no vendor who can raise the price.",
    quote: {
      text: "We'd written off custom software as something only big companies could afford. Turns out it cost less than three years of the subscription we'd been paying for something that didn't fit.",
      author: "PLACEHOLDER — client name",
      role: "Operations Manager, Summit Plumbing Group",
    },
    featured: true,
  },
  {
    slug: "cornerstone-legal",
    client: "Cornerstone Legal", // PLACEHOLDER
    industry: "Professional services",
    location: "Adelaide, SA",
    year: "2024",
    headline: "Tripled qualified enquiries without spending more on ads",
    summary:
      "A respected suburban law firm with a website from 2011 and a Hotmail address on their business cards. A full digital rebuild, plus email and domain done properly.",
    services: ["Websites", "Email & domains", "Local SEO", "Support"],
    metrics: [
      { label: "Increase in qualified enquiries", value: 214, suffix: "%" },
      { label: "Google PageSpeed score", value: 99, note: "Previously 31" },
      {
        label: "Ranked in local top 3",
        value: 11,
        suffix: " terms",
        note: "For their core practice areas",
      },
    ],
    challenge:
      "Cornerstone's reputation was built entirely on referral, and it was excellent. But their website actively undermined it — slow, unreadable on a phone, and last updated when one of the partners had different hair. Prospects were checking them out online and quietly going elsewhere.",
    approach: [
      "Interviewed six existing clients to find out what actually made them choose the firm",
      "Rebuilt around those answers rather than around a list of practice areas",
      "Moved them off free email to their own domain, migrating 14 years of mail",
      "Set up Google Business Profile properly for each practice area",
    ],
    build:
      "A fast, calm, genuinely readable site with clear paths for each practice area and an enquiry form that asks the qualifying questions the paralegals used to ask on the phone. We migrated every mailbox to Google Workspace at their own domain and configured authentication so their mail stopped landing in clients' spam folders.",
    result:
      "Enquiries roughly tripled, and more importantly they arrive better qualified — the form does the first pass of triage. The partners report that new clients now mention the website as a reason they made contact, which had never happened before.",
    quote: {
      text: "The difference isn't just more enquiries. It's that people arrive already trusting us. That used to take a first meeting.",
      author: "PLACEHOLDER — client name",
      role: "Partner, Cornerstone Legal",
    },
    featured: false,
  },
] as const;

export const featuredCaseStudies = caseStudies.filter((c) => c.featured);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
