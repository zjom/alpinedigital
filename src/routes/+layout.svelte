<script lang="ts">
  import "../app.css";
  import { COMPANY, MORTAR } from "#lib/company.ts";
  import geistMono from "@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2?url";
  import instrumentItalic from "@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-italic.woff2?url";
  import instrument from "@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-normal.woff2?url";

  // The faces the first screen sets, fetched with the page so they do not swap in and move it.
  const FONTS = [instrument, instrumentItalic, geistMono];

  const TITLE = "Alpine Digital: the company behind Mortar";
  const DESCRIPTION =
    "Alpine Digital is the Australian company behind Mortar, the product that lets a pharmacy group on Minfos see every store as one. It is the only thing we make.";

  let { children } = $props();

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.name,
    legalName: COMPANY.legalName,
    url: COMPANY.url,
    email: COMPANY.email,
    logo: `${COMPANY.url}/alpine-digital.svg`,
    areaServed: "AU",
    owns: { "@type": "SoftwareApplication", name: "Mortar", url: MORTAR.url },
  });
</script>

<svelte:head>
  <title>{TITLE}</title>
  <meta name="description" content={DESCRIPTION} />
  <link rel="canonical" href="{COMPANY.url}/" />
  <meta property="og:url" content="{COMPANY.url}/" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={COMPANY.name} />
  <meta property="og:title" content={TITLE} />
  <meta property="og:description" content={DESCRIPTION} />
  <meta name="twitter:card" content="summary" />
  {#each FONTS as href (href)}
    <link rel="preload" as="font" type="font/woff2" {href} crossorigin="anonymous" />
  {/each}
  <!-- eslint-disable-next-line svelte/no-at-html-tags -- a constant, built above -->
  {@html `<script type="application/ld+json">${jsonLd}<\/script>`}
</svelte:head>

<a
  href="#main"
  class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-night"
>
  Skip to the content
</a>
<div id="top">
  {@render children()}
</div>
