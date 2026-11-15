/**
 * Everything the site says about the company, in one place, so a fact is
 * corrected once.
 *
 * A claim about Mortar must already be true on mortar.cc
 * (~/projects/tpn/apps/mortar-site). Nothing here is invented: an empty field
 * is not shown.
 */

export const COMPANY = {
  name: "Alpine Digital",
  legalName: "Alpine Digital Pty Ltd",
  /** What the company is, in one sentence. */
  line: "An Australian healthtech company. We make Mortar, software for pharmacy groups.",
  /** "12 345 678 901". Empty until it is filled, and then the page links it to ABN Lookup. */
  abn: "",
  /** "Sydney, NSW". Empty until it is filled. */
  location: "",
  email: "hello@alpinedigital.com.au",
  url: "https://alpinedigital.com.au",
};

export const MORTAR = {
  url: "https://mortar.cc",
  walkthrough: "https://mortar.cc/#walkthrough",
  demos: "https://mortar.cc/#product",
  data: "https://mortar.cc/#data",
  docs: "https://mortar.cc/docs",
  /** What Mortar is, in one sentence. */
  line: "Mortar gives a pharmacy group one view of every store: stock, special orders, clearance, stocktakes and sales.",
  /** Who it is for. */
  audience: "Pharmacy groups in Australia.",
  /** The dispensary systems Mortar connects to today, and those it is being connected to. */
  systems: { now: "Minfos", building: "FRED and Z" },
};

/** The ABN's page on the government's register, or nothing while the ABN is empty. */
export function abnLookup(): string | undefined {
  const digits = COMPANY.abn.replace(/\D/g, "");
  return digits ? `https://abr.business.gov.au/ABN/View?abn=${digits}` : undefined;
}

export const FOUNDER = {
  name: "Zihan Jin",
  years: "12+ years in pharmacy",
  /** Zihan's own words, as on mortar.cc. Not shown on this page. */
  words:
    "I’ve worked every job in a pharmacy except pharmacist: unpacking the delivery, the till, front of shop and the dispensary, then management. Mortar fixes the problems I kept running into.",
  now: "Now I run The Pharmacy Network’s systems, and I’ll take your walkthrough call.",
  /** Zihan's jobs in pharmacy, first to now. */
  jobs: ["Stock", "Till", "Pharmacy assistant", "Dispensary assistant", "Management", "Systems"],
};

export const TPN = {
  name: "The Pharmacy Network",
  line: "A pharmacy group. Mortar was built there, and every store uses it each day for special orders, clearance and sales against target.",
};
