<!-- The page's two actions: book a walkthrough on Mortar's site, or write to the company. -->
<script lang="ts">
  import { COMPANY, MORTAR } from "#lib/company.ts";
  import Arrow from "./Arrow.svelte";
  import Email from "./Email.svelte";

  let { lg = false }: { lg?: boolean } = $props();
</script>

<div class="flex flex-wrap items-center gap-3">
  <a class="m-btn m-btn-primary" class:m-btn-lg={lg} href={MORTAR.walkthrough}>
    Book a walkthrough <Arrow out />
  </a>
  <a class="m-btn m-btn-quiet" class:m-btn-lg={lg} href="mailto:{COMPANY.email}">
    <span><Email /></span>
  </a>
</div>
