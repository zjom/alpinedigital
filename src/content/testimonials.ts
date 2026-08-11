/**
 * ⚠️  PLACEHOLDER TESTIMONIALS — ILLUSTRATIVE ONLY.
 *
 * Do NOT launch with these. Every quote must be a real, written, client-approved
 * statement with the attribution confirmed. Fabricated testimonials are
 * misleading conduct under Australian Consumer Law, and the ACCC has taken
 * action over exactly this.
 *
 * If you launch before real quotes are collected, delete this file's contents
 * and the Testimonials section will simply not render.
 */

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  /** Optional headline metric to anchor the quote. */
  metric?: string;
};

export const testimonials: readonly Testimonial[] = [
  {
    quote:
      "I'd been putting this off for four years because I assumed I'd need to understand it all. I didn't. They handled every technical piece and explained the parts I actually needed to know.",
    author: "PLACEHOLDER — client name",
    role: "Owner",
    company: "Ridgeline Building Supplies",
    metric: "$4.2M online in year one",
  },
  {
    quote:
      "What sold me was that they told me one of the things I'd asked for was a waste of money. Nobody had ever talked me out of spending before.",
    author: "PLACEHOLDER — client name",
    role: "Co-founder",
    company: "Harbour Lane Provisions",
    metric: "7.4x return on ad spend",
  },
  {
    quote:
      "The training was the bit that mattered. My team can update everything themselves now. We're not held hostage by anyone, which is exactly what happened with our last agency.",
    author: "PLACEHOLDER — client name",
    role: "Operations Manager",
    company: "Summit Plumbing Group",
    metric: "38 admin hours saved weekly",
  },
  {
    quote:
      "They're young and they move fast, but nothing felt rushed or sloppy. They just don't waste your time the way bigger firms do.",
    author: "PLACEHOLDER — client name",
    role: "Partner",
    company: "Cornerstone Legal",
    metric: "214% more qualified enquiries",
  },
] as const;
