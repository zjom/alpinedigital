# CLAUDE.md

Alpine Digital's site: one trust-building page for the company behind Mortar.
SvelteKit 3, Tailwind v4, prerendered, on Cloudflare Workers. `README.md`
covers running and deploying; `PRODUCT.md` who it is for.

Run commands through `nix develop -c` (or direnv): `pnpm dev`, `pnpm check`,
`pnpm exec oxfmt .`, `pnpm build`.

## Code map

```
src/
  app.css            the tokens (Mortar's page in the dark) and classes: .wrap, .display, .m-label, .m-num, .lede, .link, .m-btn, .tap, .rise
  lib/company.ts     every fact the site states: COMPANY, MORTAR, FOUNDER, TPN, abnLookup()
  lib/components/    Logo, Nav, Footer, Actions (the two buttons), Arrow
  routes/+page.svelte   the page: the company's origin down one line, from the pharmacy jobs to the reader's group
www/                 a second worker: www → the bare domain
```

## Rules

- **Say only what is true.** Every fact comes from `src/lib/company.ts`, and a
  claim about Mortar must already be on mortar.cc
  (`~/projects/tpn/apps/mortar-site`). No customers, testimonials, awards,
  figures or dates that are not real. An empty field is not shown.
- **Mortar is the only product.** Never suggest services or other work.
- **Colour.** Night ground, ice white (#EAEFF6, the logo's) and greys leaning
  to it. Ice is the one accent and means "act here". No other hue.
- **Mortar's logo is only pure white on pure black**, never on the night
  ground. The page doesn't show it today.
- **One typeface.** Instrument Sans for everything; Geist Mono only for labels
  and data, never a sentence. No label above a headline.
- **The page reads in full without JavaScript**, and motion respects
  `prefers-reduced-motion`.
- **Don't guess a person's pronouns in copy.** Use the name.
