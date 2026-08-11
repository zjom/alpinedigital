import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validation";
import { deliverEnquiry } from "@/lib/mail";
import { rateLimit, clientIp } from "@/lib/rateLimit";

export async function POST(request: Request) {
  // 1. Rate limit before doing any work.
  const { ok: withinLimit } = rateLimit(clientIp(request));
  if (!withinLimit) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "That's a few too many enquiries in a short time. Please email or ring us instead.",
      },
      { status: 429 },
    );
  }

  // 2. Parse.
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Malformed request." },
      { status: 400 },
    );
  }

  // 3. Validate server-side. Client validation is UX only, never trusted.
  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Some details need checking.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  // 4. Honeypot. Return a success shape so bots get no signal, but send nothing.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  // 5. Deliver.
  const result = await deliverEnquiry(parsed.data);

  if (!result.ok) {
    // Log the real cause server-side; never leak config details to the client.
    console.error("[contact] delivery failed:", result.error);
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't send that just now. Please email or ring us directly — we'd hate to miss you.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
