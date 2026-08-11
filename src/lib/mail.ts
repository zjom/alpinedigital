import type { EnquiryInput } from "./validation";
import { site } from "@/content/site";

/**
 * Pluggable enquiry delivery.
 *
 * Sends via Resend when RESEND_API_KEY is set. With no key configured it logs
 * the enquiry to the server console in development so the form can be tested
 * end to end, and fails loudly in production rather than silently swallowing a
 * lead.
 *
 * To swap providers (Formspree, SES, Postmark, SMTP) replace `sendViaResend`
 * and leave `deliverEnquiry` alone — nothing else in the app touches mail.
 */

export type DeliveryResult =
  | { ok: true; via: "resend" | "console" }
  | { ok: false; error: string };

function renderText(enquiry: EnquiryInput): string {
  return [
    "New enquiry from the website",
    "",
    `Name:      ${enquiry.name}`,
    `Email:     ${enquiry.email}`,
    `Phone:     ${enquiry.phone || "—"}`,
    "",
    `Business:  ${enquiry.businessName}`,
    `Industry:  ${enquiry.industry}`,
    `Currently: ${enquiry.presence}`,
    "",
    `Needs:     ${enquiry.services.join(", ")}`,
    `Budget:    ${enquiry.budget}`,
    `Timeline:  ${enquiry.timeline}`,
    "",
    "Message:",
    enquiry.message || "—",
  ].join("\n");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderHtml(enquiry: EnquiryInput): string {
  const row = (label: string, value: string) =>
    `<tr>
      <td style="padding:6px 16px 6px 0;color:#737373;font-size:13px;vertical-align:top;white-space:nowrap">${label}</td>
      <td style="padding:6px 0;color:#171717;font-size:14px">${escapeHtml(value) || "&mdash;"}</td>
    </tr>`;

  return `<div style="font-family:system-ui,-apple-system,sans-serif;max-width:600px">
    <h2 style="margin:0 0 4px;font-size:18px;color:#171717">New enquiry</h2>
    <p style="margin:0 0 20px;color:#737373;font-size:13px">${escapeHtml(enquiry.businessName)} &middot; ${escapeHtml(enquiry.industry)}</p>
    <table style="border-collapse:collapse;width:100%">
      ${row("Name", enquiry.name)}
      ${row("Email", enquiry.email)}
      ${row("Phone", enquiry.phone || "")}
      ${row("Business", enquiry.businessName)}
      ${row("Industry", enquiry.industry)}
      ${row("Currently", enquiry.presence)}
      ${row("Needs", enquiry.services.join(", "))}
      ${row("Budget", enquiry.budget)}
      ${row("Timeline", enquiry.timeline)}
    </table>
    <div style="margin-top:20px;padding-top:16px;border-top:1px solid #e5e5e5">
      <p style="margin:0 0 6px;color:#737373;font-size:13px">Message</p>
      <p style="margin:0;color:#171717;font-size:14px;white-space:pre-wrap">${escapeHtml(enquiry.message || "—")}</p>
    </div>
  </div>`;
}

async function sendViaResend(enquiry: EnquiryInput): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || site.contact.email;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from) {
    return { ok: false, error: "Mail transport is not configured." };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      // So hitting reply in the inbox goes straight back to the prospect.
      reply_to: enquiry.email,
      subject: `New enquiry — ${enquiry.businessName}`,
      text: renderText(enquiry),
      html: renderHtml(enquiry),
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    return {
      ok: false,
      error: `Resend responded ${response.status}: ${detail.slice(0, 200)}`,
    };
  }

  return { ok: true, via: "resend" };
}

export async function deliverEnquiry(
  enquiry: EnquiryInput,
): Promise<DeliveryResult> {
  if (process.env.RESEND_API_KEY) {
    return sendViaResend(enquiry);
  }

  if (process.env.NODE_ENV === "development") {
    console.info(
      "\n─── ENQUIRY (no RESEND_API_KEY set — logging instead) ───\n" +
        renderText(enquiry) +
        "\n────────────────────────────────────────────────────────\n",
    );
    return { ok: true, via: "console" };
  }

  // Never silently drop a lead in production.
  return {
    ok: false,
    error:
      "Mail transport is not configured. Set RESEND_API_KEY and CONTACT_FROM_EMAIL.",
  };
}
