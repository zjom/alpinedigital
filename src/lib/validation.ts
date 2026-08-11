import { z } from "zod";

/**
 * Shared enquiry schema. The client validates per step for fast feedback; the
 * server re-validates the whole payload on submit, because client validation is
 * a UX affordance and never a security control.
 */

export const SERVICE_OPTIONS = [
  "A new website",
  "An online store",
  "Google Ads & Merchant Center",
  "Email & domains",
  "A bespoke system",
  "Not sure yet",
] as const;

export const PRESENCE_OPTIONS = [
  "Nothing online yet",
  "An outdated website",
  "A site that works, but needs more",
  "Several systems that don't talk to each other",
] as const;

export const BUDGET_OPTIONS = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
  "Not sure yet",
] as const;

export const TIMELINE_OPTIONS = [
  "As soon as possible",
  "In the next month or two",
  "Three to six months",
  "Just exploring for now",
] as const;

export const enquirySchema = z.object({
  // Step 1 — zero typing, so the first commitment costs nothing.
  services: z
    .array(z.enum(SERVICE_OPTIONS))
    .min(1, "Pick at least one — or choose “Not sure yet”."),

  // Step 2
  businessName: z.string().trim().min(1, "Please tell us your business name.").max(120),
  industry: z.string().trim().min(1, "Please tell us what industry you're in.").max(120),
  presence: z.enum(PRESENCE_OPTIONS, {
    message: "Please choose the closest option.",
  }),

  // Step 3 — "not sure yet" is a valid answer and must never disqualify.
  budget: z.enum(BUDGET_OPTIONS, { message: "Please choose a range." }),
  timeline: z.enum(TIMELINE_OPTIONS, { message: "Please choose a timeframe." }),

  // Step 4
  name: z.string().trim().min(1, "Please tell us your name.").max(120),
  email: z.email("Please enter a valid email address.").max(200),
  phone: z
    .string()
    .trim()
    .max(40)
    .optional()
    .or(z.literal("")),
  message: z.string().trim().max(4000).optional().or(z.literal("")),

  /**
   * Honeypot. Real users never see this field, so anything non-empty is a bot.
   *
   * Deliberately permissive here: if the schema rejected it, a bot would get a
   * 400 naming this field, which tells it exactly which input to leave alone
   * next time. The route checks it after validation and returns a normal
   * success response without sending anything.
   */
  company: z.string().max(200).optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

/** Field names grouped by wizard step, for per-step validation. */
export const STEP_FIELDS = [
  ["services"],
  ["businessName", "industry", "presence"],
  ["budget", "timeline"],
  ["name", "email", "phone", "message"],
] as const satisfies ReadonlyArray<ReadonlyArray<keyof EnquiryInput>>;
