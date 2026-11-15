<!-- The page's legal foot: who the company is in law, how to reach it, and the Minfos line. -->
<script lang="ts">
  import { abnLookup, COMPANY, MORTAR } from "#lib/company.ts";
  import Logo from "./Logo.svelte";

  const abn = abnLookup();
</script>

<footer class="border-t border-line">
  <div class="wrap grid gap-8 py-12 text-small text-ink-2 md:grid-cols-[1fr_auto]">
    <div class="grid gap-5">
      <Logo class="h-10 w-auto justify-self-start text-ink" />
      <p class="max-w-md text-caption text-ink-3">
        Minfos is a trademark of its owner. Mortar is an independent product, and is not affiliated
        with or endorsed by Minfos.
      </p>
    </div>
    <div class="flex flex-wrap content-start gap-x-8 gap-y-2 md:justify-end">
      <a class="tap hover:text-ink" href={MORTAR.url}>Mortar</a>
      <a class="tap hover:text-ink" href={MORTAR.docs}>Mortar’s docs</a>
      <a class="tap hover:text-ink" href={MORTAR.walkthrough}>Book a walkthrough</a>
      <a class="tap hover:text-ink" href="mailto:{COMPANY.email}">{COMPANY.email}</a>
    </div>
    <p class="text-caption text-ink-3 md:col-span-2">
      © {new Date().getFullYear()}
      {COMPANY.legalName}{#if abn}, <a class="link" href={abn}
          >ABN <span class="m-num">{COMPANY.abn}</span></a
        >{/if}{#if COMPANY.location}, {COMPANY.location}{/if}. Made in Australia for Australian
      pharmacy groups.
    </p>
  </div>
</footer>
