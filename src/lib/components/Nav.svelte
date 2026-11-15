<!-- The bar: the logo, where Mortar is, and the one action. It sits on the night ground and gains a hairline once the page scrolls. -->
<script lang="ts">
  import { COMPANY, MORTAR } from "#lib/company.ts";
  import Arrow from "./Arrow.svelte";
  import Logo from "./Logo.svelte";

  let scrolled = $state(false);
</script>

<svelte:window onscroll={() => (scrolled = window.scrollY > 8)} />

<header
  class="sticky top-0 z-40 border-b bg-night transition-colors duration-300 {scrolled
    ? 'border-line'
    : 'border-transparent'}"
>
  <nav class="wrap flex h-16 items-center justify-between gap-4" aria-label="Main">
    <a href="#top" class="tap" aria-label="{COMPANY.name}, top of the page">
      <Logo class="h-8 w-auto" />
    </a>
    <div class="flex items-center gap-5 text-small text-ink-2 sm:gap-8">
      <a class="tap hidden hover:text-ink sm:block" href="mailto:{COMPANY.email}">{COMPANY.email}</a
      >
      <a class="m-btn m-btn-primary" href={MORTAR.url}>See Mortar <Arrow out /></a>
    </div>
  </nav>
</header>
