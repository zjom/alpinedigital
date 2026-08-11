# Alpine Digital

Marketing and lead-generation site for Alpine Digital — a digital presence and
modernisation consultancy for established businesses in Australia and New
Zealand.

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind v4.

---

## ⚠️ Before you launch

**The site currently ships placeholder case studies, testimonials and
statistics.** They are illustrative, not real. Work through
[`src/content/README.md`](src/content/README.md) and set
`PLACEHOLDER_CONTENT = false` in `src/content/site.ts` when done.

While that flag is `true`, a warning ribbon renders in the bottom-right corner
**in development only** — it never appears in production, so treat it as a
reminder rather than a safety net.

The two legal pages (`/legal/privacy`, `/legal/terms`) are honest, reasonable
drafts written to match the promises the rest of the site makes. They are not
legal advice and need a solicitor's review.

---

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build (all pages prerender static) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Type check |

Copy `.env.example` to `.env.local` to configure. Nothing is required for local
development — the contact form logs enquiries to the server console when no mail
transport is set.

---

## How it's organised

```
src/
├─ app/                    Routes (App Router)
│  ├─ api/contact/         Enquiry endpoint
│  ├─ work/[slug]/         Case studies, statically generated
│  ├─ opengraph-image.tsx  Dynamic OG card via next/og
│  └─ sitemap.ts robots.ts
├─ components/
│  ├─ brand/               Logo, TopoBackdrop, NoiseOverlay
│  ├─ layout/              Header, MobileNav, Footer, StickyMobileCta
│  ├─ sections/            Page sections (Hero, ServicesGrid, CtaBand…)
│  ├─ forms/               Multi-step enquiry form
│  └─ ui/                  Primitives (Button, Card, Reveal, Accordion…)
├─ content/                ← ALL COPY LIVES HERE
└─ lib/                    Helpers (seo, jsonld, validation, mail, hooks)
```

**Every user-facing string lives in `src/content/`.** Components contain no hard-
coded copy, so updating the site's content means editing typed data files, never
JSX.

---

## Design system

Tailwind v4 is CSS-first — there is no `tailwind.config.js`. All tokens are
declared in the `@theme` block at the top of `src/app/globals.css`.

| Token | Value | Use |
| --- | --- | --- |
| `base` / `surface` / `surface-2` | `#05070A` → `#121821` | Page, cards, inputs |
| `ink` / `muted` / `faint` | `#EAEFF6` / `#94A1B2` / `#7A8695` | Text (17.5:1 / 7.7:1 / 5.5:1 on base) |
| `ice` | `#4EE1D2` | **The only interactive colour** — CTAs, links, focus rings |
| `glow` | `#FF8A4C` | Decorative only; never on an interactive element alone |

Two rules keep it disciplined: anything ice-coloured is clickable, and alpenglow
never leads on its own. The headline gradient deliberately stays inside the ice
family — ice and alpenglow are near-complementary, so interpolating between them
dips through a muddy neutral at the midpoint.

**Type**: Space Grotesk (display), Inter (body), JetBrains Mono (labels and
figures), all self-hosted via `next/font`.

**`<TopoBackdrop />`** is the signature motif — layered SVG topographic contour
lines behind the hero, CTA band and every page header. Pure SVG and CSS: no
images, no JavaScript, no network requests.

**Motion** is one primitive, `<Reveal>`: fade plus a 16px rise, once, on scroll
into view. The transition is pure CSS (`.reveal` in `globals.css`) driven by a
40-line IntersectionObserver hook. An animation library was tried and removed —
it cost ~38kb of JavaScript and a full second of mobile LCP for an effect CSS
does natively.

Reduced motion and the no-JavaScript case are both handled in CSS via a
`@media (scripting: enabled)` guard, so no component branches on either.

---

## Conversion paths

Three, layered by intent rather than stacked:

1. **Persistent** — "Book a free call" in the sticky header, on every page.
2. **Mobile** — sticky bottom bar (Call / Book) that appears past the hero.
3. **`/contact`** — a four-step qualifying form, with book-a-call and
   click-to-call given equal weight for people who won't fill in forms.

The form asks easy → committal: step 1 needs no typing, and personal details
come last, once the visitor has already invested effort. Answers survive
backward navigation.

No popups, exit-intent modals or countdown timers. This audience is
trust-sensitive; interruption patterns cost more than they gain.

### Enquiry delivery

`POST /api/contact` validates with Zod server-side, checks a honeypot, and rate
limits by IP. Delivery goes through `src/lib/mail.ts`, which sends via Resend
when `RESEND_API_KEY` is set. Swapping to Formspree, SES or SMTP means editing
that one file.

Two behaviours worth knowing:

- **The honeypot returns a normal success response.** Rejecting it in the schema
  would tell a bot exactly which field to leave alone next time.
- **Without a mail transport, production fails loudly** rather than silently
  dropping a lead. Development logs the enquiry to the console instead.

The rate limiter is in-memory and therefore per-process — on serverless each
instance keeps its own counter, so the effective limit is higher than
configured. Swap in a shared store (Vercel KV, Upstash) if real abuse appears;
the call signature won't change.

---

## Verified

Measured against the production build, not the dev server.

**Lighthouse** — Performance / Accessibility / Best Practices / SEO / Agentic:

| | Perf | A11y | BP | SEO | Agentic |
| --- | --- | --- | --- | --- | --- |
| Desktop (`/`, `/contact`, a case study) | 100 | 100 | 100 | 100 | 100 |
| Mobile (slow 4G, 4× CPU throttle) | 96 | 100 | 100 | 100 | 100 |

Desktop LCP 0.9s, CLS 0, TBT 0ms. Mobile LCP 2.8s, CLS 0.

**Browser test suite** — 54/54 checks (`scratchpad/audit.js`): all 10 routes
render without console errors, no horizontal overflow at 375/768/1280/1536,
unique metadata and JSON-LD on every page, skip link works, all tabbed elements
show a focus ring, mobile nav traps and restores focus, sticky CTA behaves,
reduced motion renders everything immediately, and the four-step form validates,
preserves state backwards, and blocks bad input.

**API** — verified directly: valid submissions deliver, malformed payloads
return per-field errors, honeypot submissions return success but send nothing,
and rate limiting triggers.

---

## Deploying

Push to a Git repo and import into Vercel — no configuration needed. Set the
environment variables from `.env.example` in the project settings.

Every page is statically generated at build time; only `/api/contact` runs on
demand.

Before going live: point `NEXT_PUBLIC_SITE_URL` at the real domain (canonical
URLs, sitemap and OG images all derive from it), verify a sending domain in
Resend, and set `NEXT_PUBLIC_BOOKING_URL` to your Cal.com or Calendly link —
until you do, every "Book a call" button falls back to `/contact`.
