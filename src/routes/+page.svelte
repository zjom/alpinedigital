<!-- The page: how the company came to be, down one line: the jobs behind the counter, the group it was built in, the product, the company, and the reader's group next. Where the browser can tie an animation to scrolling, the line fills as the page is read. -->
<script lang="ts">
  import { COMPANY, FOUNDER, MORTAR, TPN } from "#lib/company.ts";
  import Actions from "#lib/components/Actions.svelte";
  import Arrow from "#lib/components/Arrow.svelte";
  import Footer from "#lib/components/Footer.svelte";
  import Nav from "#lib/components/Nav.svelte";

  const earlier = FOUNDER.jobs.slice(0, -1);
</script>

<Nav />
<main id="main">
  <section class="wrap pt-12 pb-14 sm:pt-20 sm:pb-20">
    <h1 class="display rise max-w-4xl text-display tracking-[-0.04em]">
      From the stock room to a <em>company.</em>
    </h1>
    <p class="lede rise mt-8 max-w-[38rem]" style="--i:1">
      {COMPANY.name} is the company behind Mortar. It didn’t start as a company. It started with deliveries
      to unpack.
    </p>
  </section>

  <section class="wrap pb-20 sm:pb-28">
    <ol class="line">
      <li>
        <h2>Every job in a pharmacy but pharmacist</h2>
        <p>
          Across {FOUNDER.years}, {FOUNDER.name} unpacks the delivery, works the till, the shop floor
          and the dispensary, then manages, and keeps running into the same problems.
        </p>
        <ul class="jobs" aria-label="The jobs, first to last">
          {#each earlier as job (job)}<li>{job}</li>{/each}
        </ul>
      </li>
      <li>
        <h2>Three stores, three separate systems</h2>
        <p>
          Zihan comes to run the systems at {TPN.name}, a group of three pharmacies. Each store’s
          Minfos is its own database, so the group can’t see itself as one business.
        </p>
      </li>
      <li>
        <h2>Mortar is built inside the group</h2>
        <p>
          It joins the stores, so stock, special orders, clearance, stocktakes and sales read as one
          group. Minfos stays the system of record.
        </p>
        <a class="more tap" href={MORTAR.demos}>Try five of its screens <Arrow out /></a>
      </li>
      <li>
        <h2>Every store uses it, every day</h2>
        <p>
          {TPN.name} runs special orders, clearance and sales against target on it. About 1,400 automated
          tests keep it working as it changes.
        </p>
      </li>
      <li class="now">
        <h2>{COMPANY.name} offers it to other groups</h2>
        <p>
          {COMPANY.legalName} is the company behind Mortar, and Mortar is all it makes. Each group gets
          a database of its own, hosted in Australia, exported or deleted when it asks.
        </p>
      </li>
      <li class="next">
        <h2>Your group</h2>
        <p>It starts with a walkthrough: a call with Zihan, on your group’s questions.</p>
        <div class="mt-6"><Actions lg /></div>
      </li>
    </ol>
  </section>
</main>
<Footer />

<style>
  .line {
    --gutter: 2.25rem;
    position: relative;
    max-width: 46rem;
    padding-left: var(--gutter);
    view-timeline: --line block;
  }
  /* The rule, and over it the part already read. */
  .line::before,
  .line::after {
    content: "";
    position: absolute;
    top: 0.75rem;
    bottom: 0;
    left: 0.4375rem;
    width: 1px;
    background: var(--color-line-strong);
  }
  .line::after {
    display: none;
    background: var(--color-ink);
    transform-origin: top;
  }
  .line > li {
    position: relative;
    padding-bottom: 3.5rem;
  }
  .line > li:last-child {
    padding-bottom: 0;
  }
  /* A ring on the line for each station, a filled dot for where things stand now. */
  .line > li::before {
    content: "";
    position: absolute;
    z-index: 1;
    top: 0.5rem;
    left: calc(var(--gutter) * -1);
    width: 0.9375rem;
    height: 0.9375rem;
    border: 1px solid var(--color-ink-3);
    border-radius: 999px;
    background: var(--color-night);
  }
  .line > li.now::before {
    border-color: var(--color-ink);
    background: var(--color-ink);
    box-shadow: 0 0 0 5px var(--color-night);
  }
  .line > li.next::before {
    border-style: dashed;
  }
  h2 {
    font-size: var(--text-title);
    font-weight: 600;
    letter-spacing: -0.035em;
    line-height: 1.05;
    text-wrap: balance;
    overflow-wrap: break-word;
  }
  .line > li > p {
    max-width: 36rem;
    margin-top: 0.875rem;
    color: var(--color-ink-2);
    font-size: var(--text-lede);
  }
  .jobs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1.25rem;
  }
  .jobs li {
    max-width: 100%;
    overflow-wrap: anywhere;
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    box-shadow: inset 0 0 0 1px var(--color-line-strong);
    color: var(--color-ink-2);
    font-size: var(--text-caption);
  }
  .more {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1.125rem;
    font-size: var(--text-small);
    font-weight: 500;
  }
  .more :global(.arrow) {
    transition: transform 200ms var(--ease-out-quint);
  }
  .more:hover :global(.arrow) {
    transform: translate(2px, -2px);
  }
  @media (min-width: 768px) {
    .line {
      --gutter: 4rem;
    }
    .line > li {
      padding-bottom: 5rem;
    }
  }
  @supports (animation-timeline: view()) {
    @media (prefers-reduced-motion: no-preference) {
      .line::after {
        display: block;
        animation: read linear both;
        animation-timeline: --line;
        animation-range: entry 60% exit 40%;
      }
      @keyframes read {
        from {
          transform: scaleY(0);
        }
      }
    }
  }
</style>
