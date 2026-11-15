# alpinedigital.com.au

The site of Alpine Digital, the company behind [Mortar](https://mortar.cc).
One page whose job is trust: who the company is, what it makes, who built it
and what it commits to.

SvelteKit 3 and Tailwind v4 on Cloudflare Workers, every page prerendered. It
follows `~/projects/tpn/apps/mortar-site`, in the dark.

## Run it

Through the flake's shell (`nix develop`, or direnv with `direnv allow`):

```bash
pnpm install
pnpm dev          # http://localhost:5173
pnpm check        # wrangler types, then svelte-check: 0 errors, 0 warnings
pnpm exec oxfmt . # format
pnpm preview      # build, then the real Workers runtime at http://localhost:8787
node scripts/shots.mjs http://localhost:5173 .shots   # the page, desktop and phone
```

## Before launch

Fill these in `src/lib/company.ts`. An empty field is not shown.

- `abn`: once set, the footer shows it and links it to ABN Lookup.
- `location`: the company's city and state.
- Make sure `hello@alpinedigital.com.au` receives mail (Cloudflare Email
  Routing on the zone will do).
- The page tells events in an order (the pharmacy jobs, then The Pharmacy
  Network's systems, then Mortar). Check it is how it happened.

## Deploy

```bash
pnpm exec wrangler login     # once
pnpm run deploy              # check, build, wrangler deploy (the site, then www)
```

The site is served at <https://alpinedigital.com.au>, a custom domain that the
`routes` entry in `wrangler.jsonc` attaches to the worker. The zone is in the
same Cloudflare account, so the deploy creates the DNS record and the
certificate. `www.alpinedigital.com.au` belongs to a second worker (`www/`)
that redirects to the bare domain.
