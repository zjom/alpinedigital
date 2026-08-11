/**
 * ⚠️  PLACEHOLDER FIGURES — replace with verified numbers before launch.
 * Every one of these is a factual claim about the business.
 */

export type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  /** Small clarifier under the label — keeps claims honest and specific. */
  note?: string;
};

export const stats: readonly Stat[] = [
  {
    value: 40,
    prefix: "$",
    suffix: "M+",
    label: "Client revenue processed",
    note: "Through platforms we built and maintain",
  },
  {
    value: 100,
    suffix: "%",
    label: "Client ownership",
    note: "You own your domain, data, accounts and code",
  },
  {
    value: 9,
    suffix: " weeks",
    label: "Typical time to launch",
    note: "From signed proposal to live site",
  },
  {
    value: 1,
    suffix: " business day",
    label: "Support response time",
    note: "Direct to the people who built it",
  },
] as const;

/**
 * Industries served, shown in the trust marquee. These are sectors, not client
 * names, so they carry no accuracy risk beyond being true of the client base.
 */
export const industries: readonly string[] = [
  "Building & trade supplies",
  "Specialty food & retail",
  "Plumbing & services",
  "Professional services",
  "Manufacturing",
  "Hospitality",
  "Wholesale & distribution",
  "Health & allied health",
] as const;
