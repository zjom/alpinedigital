# Content — pre-launch swap checklist

Every user-facing string on this site lives in this folder. No copy is hard-coded
in components, so launching with real content means editing these files only —
never JSX.

## ⚠️ Do not launch until this list is done

While `PLACEHOLDER_CONTENT` in `site.ts` is `true`, a red ribbon renders in the
bottom-left corner in **development builds only**. It never appears in
production, so it is a reminder, not a safety net. Set the flag to `false` once
everything below is genuinely real.

### 1. `site.ts` — business identity

- [ ] `url` — the real domain. Used for canonicals, sitemap and OG images; wrong
      here means wrong everywhere.
- [ ] `contact.email`, `contact.phone`, `contact.phoneDisplay`
- [ ] `contact.abn`
- [ ] `legalName`, `location.city`, `location.state`, `founded`
- [ ] `social.linkedin`, `social.instagram` — delete any you don't have rather
      than leaving a dead link
- [ ] `responseTime` — only promise what you'll actually hit

### 2. `caseStudies.ts` — **highest risk**

- [ ] Replace all four client names, or anonymise them
      ("a regional building supplier")
- [ ] Replace every figure in `metrics` with a number you can evidence
- [ ] Get written client sign-off on each study before publishing
- [ ] Replace or delete every `quote` — see the testimonial warning below

### 3. `testimonials.ts` — **highest risk**

- [ ] Replace every quote with a real, written, client-approved statement
- [ ] Confirm each author's name, role and company with them directly
- [ ] **If you don't have real quotes yet, export an empty array.** The
      Testimonials section detects this and does not render — an absent section
      is infinitely better than a fabricated one.

### 4. `stats.ts`

- [ ] Verify `$40M+ client revenue processed` — this is a specific, checkable
      factual claim
- [ ] Verify `9 weeks typical time to launch` against real project history
- [ ] Confirm `1 business day support response` matches what you can sustain
- [ ] Trim `industries` to sectors you have actually worked in

### 5. `services.ts`, `process.ts`, `faqs.ts`

Lower risk — these describe your offering rather than making factual claims
about past results. Still worth reading end to end:

- [ ] Confirm the price band quoted in the FAQ ("low five figures") is right
- [ ] Confirm the timelines in `process.ts` match how you really work
- [ ] Confirm every promise in `faqs.ts` is one you'll honour — especially the
      ownership and no-lock-in answers, which are load-bearing for trust

## Why the caution

Under Australian Consumer Law, invented testimonials and unsubstantiated
performance figures are misleading conduct, and the ACCC has taken enforcement
action over precisely this. Beyond the legal exposure, the entire pitch of this
site is that you're the honest operator in a market full of agencies who aren't.
Fake numbers would undercut the one thing the site is selling.

## Environment variables

Not content, but needed before launch — see `.env.example`:

- `NEXT_PUBLIC_SITE_URL` — production domain
- `NEXT_PUBLIC_BOOKING_URL` — Cal.com / Calendly link. Falls back to `/contact`
  when unset, so the CTA is never dead
- `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` — enquiry delivery
