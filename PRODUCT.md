# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

SvelteKit 3 with Tailwind v4, prerendered and deployed to Cloudflare Workers
at alpinedigital.com.au. The development shell is the nix flake. Chosen by the
owner; it mirrors `~/projects/tpn/apps/mortar-site`.

## Users

A pharmacy group's owner, or its head office, checking who is behind Mortar
before a walkthrough or a signature. They arrive from mortar.cc, a contract or
a search for the company's name, and want to know that a real, accountable
Australian company stands behind the product.

## Product Purpose

Alpine Digital is an Australian healthtech company. Its mission: modernise
the software healthcare runs on (faster, clearer, better made, easier to use)
so healthcare professionals stop fighting their systems and focus on what
matters to them. Mortar is its only product.
The site (alpinedigital.com.au) is one page whose whole job is trust: it says
who the company is, what it makes, who built it and what it commits to, and
sends the reader back to mortar.cc to book a walkthrough. Success is a reader
who goes back to mortar.cc reassured.

## Positioning

One company, one product, built inside a working pharmacy group (The Pharmacy
Network) by a named person who has worked the counter. Every claim on the page
is one a pharmacy owner can check.

## Operating Context

- Mortar's own site, copy rules and evidence live in
  `~/projects/tpn/apps/mortar-site` (`PRODUCT.md`, `CLAUDE.md`). A claim about
  Mortar here must already be true there.
- Mortar is pre-launch: the only action is booking a walkthrough on mortar.cc.

## Capabilities and Constraints

- No pricing, launch dates, customers, logos, testimonials, certifications or
  figures that mortar-site does not state.
- The legal name is Alpine Digital Services Pty Ltd, ABN 70 704 230 642,
  based in Melbourne, VIC.
- Contact is hello@alpinedigital.com.au.
- Mortar works with Minfos today; FRED and Z integrations are under way. It is independent of all three, and the site says so.
- en-AU. The page reads in full without JavaScript.

## Brand Commitments

- Name: Alpine Digital. The logo is `src/lib/components/Logo.svelte`:
  "Alpine" bold over "digital" light, in ice white (#EAEFF6) on dark.
- The look follows mortar-site, in the dark (the owner's brief).
- Mortar's logo and wordmark appear only pure white on pure black.
- Voice: plain, concrete, says only what is true.

## Evidence on Hand

- The Pharmacy Network, a pharmacy group (its store count is not stated), built Mortar and uses it
  in every store each day. It may be named.
- Zihan Jin built Mortar, has 12+ years in pharmacy, runs TPN's systems and
  takes the walkthrough calls. Named with that role, no photo.
- About 1,400 automated tests across the product.
- Five live demo screens and the user docs, public at mortar.cc.
- Mortar's four data commitments (Australian hosting, a database per group,
  export or deletion on request, special orders as health information).
- Absent, and not to be invented: other customers, testimonials, awards,
  certifications, team size, founding date, an office address.

## Product Principles

1. Earn trust with facts an owner can check, and say how to check them.
2. One product. Never suggest services or a portfolio the company doesn't have.
3. Say less than is true, never more.
4. Send the reader back to Mortar; this page is a reference, not a pitch.
