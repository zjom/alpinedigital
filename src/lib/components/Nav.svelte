<!-- The bar: the logo, where Mortar is, and the one action. It sits on the night ground and, where the browser can tie an animation to scrolling, gains its hairline once the page scrolls; elsewhere the hairline is always there. CSS only. -->
<script lang="ts">
  import { COMPANY, MORTAR } from "#lib/company.ts";
  import Arrow from "./Arrow.svelte";
  import Email from "./Email.svelte";
  import Logo from "./Logo.svelte";
</script>

<header class="bar sticky top-0 z-40 border-b border-line bg-night">
  <nav class="wrap flex min-h-16 items-center justify-between gap-4 py-2" aria-label="Main">
    <a href="#top" class="tap shrink-0" aria-label="{COMPANY.name}, top of the page">
      <Logo class="h-5 w-auto" />
    </a>
    <div class="flex min-w-0 items-center gap-5 text-small text-ink-2 sm:gap-8">
      <a class="tap hidden hover:text-ink lg:block" href="mailto:{COMPANY.email}"><Email /></a>
      <a class="m-btn m-btn-primary" href={MORTAR.url}>See Mortar <Arrow out /></a>
    </div>
  </nav>
</header>

<style>
  @supports (animation-timeline: scroll()) {
    @media (prefers-reduced-motion: no-preference) {
      .bar {
        animation: hairline linear both;
        animation-timeline: scroll();
        animation-range: 0 1rem;
      }
      @keyframes hairline {
        from {
          border-color: transparent;
        }
      }
    }
  }
</style>
