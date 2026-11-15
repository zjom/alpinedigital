<!-- The arrow a button or link leads with when it goes somewhere. `out` turns it up and right, for a link that leaves the site. -->
<script lang="ts">
  let { out = false }: { out?: boolean } = $props();
</script>

<svg
  class="arrow shrink-0"
  width="16"
  height="16"
  viewBox="0 0 16 16"
  fill="none"
  aria-hidden="true"
>
  <path
    d={out ? "M4.5 11.5 11.5 4.5M5.5 4.5h6v6" : "M3 8h10M9 4l4 4-4 4"}
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
