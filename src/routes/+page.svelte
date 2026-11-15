<!-- The page: a reference for the company. Who it is, why it exists, what it makes, who is behind it, how it keeps a group's data, and its details. A row each, label to the left from md up. -->
<script lang="ts">
  import { abnLookup, COMPANY, FOUNDER, MORTAR, TPN } from "#lib/company.ts";
  import Arrow from "#lib/components/Arrow.svelte";
  import Email from "#lib/components/Email.svelte";
  import Footer from "#lib/components/Footer.svelte";
  import Nav from "#lib/components/Nav.svelte";

  const abn = abnLookup();
</script>

<Nav />
<main id="main">
  <section class="wrap pt-12 pb-14 sm:pt-20 sm:pb-20">
    <h1 class="display rise max-w-4xl text-display tracking-[-0.04em]">{COMPANY.name}</h1>
    <p class="lede rise mt-8 max-w-[38rem]" style="--i:1">{COMPANY.line}</p>
  </section>

  <div class="wrap pb-20 sm:pb-28">
    <section class="row">
      <h2>Why we exist</h2>
      <div>
        <p>
          Too much of the software in healthcare is slow, cluttered and hard to use, and the people
          who rely on it spend their day working around it. We build software that is fast, clear
          and well made, so healthcare professionals can stop fighting their systems and focus on
          what matters to them.
        </p>
      </div>
    </section>

    <section class="row">
      <h2>What we make</h2>
      <div>
        <p>
          Mortar connects each store’s dispensary system and puts the group’s stock, special orders,
          clearance, stocktakes and sales in one place. It works with {MORTAR.systems.now} today, and
          integrations with {MORTAR.systems.building} are under way.
        </p>
        <a class="more tap" href={MORTAR.url}>mortar.cc <Arrow out /></a>
      </div>
    </section>

    <section class="row">
      <h2>Who is behind it</h2>
      <div>
        <p>
          {FOUNDER.name} founded {COMPANY.name}. Zihan has {FOUNDER.years}, starting out unpacking
          deliveries and going on to management, and built Mortar while running the systems at
          {TPN.name}, a pharmacy group whose stores still use it every day.
        </p>
      </div>
    </section>

    <section class="row">
      <h2>Your group’s data</h2>
      <div>
        <p>
          Each group’s data is kept in its own database, on servers in Australia. We export it or
          delete it when you ask. Special orders hold customers’ health information, and we treat
          them that way.
        </p>
        <a class="more tap" href={MORTAR.data}>The details on mortar.cc <Arrow out /></a>
      </div>
    </section>

    <section class="row">
      <h2>Company details</h2>
      <dl class="details">
        <dt>Legal name</dt>
        <dd>{COMPANY.legalName}</dd>
        {#if abn}
          <dt>ABN</dt>
          <dd><a class="link m-num" href={abn}>{COMPANY.abn}</a></dd>
        {/if}
        {#if COMPANY.location}
          <dt>Location</dt>
          <dd>{COMPANY.location}</dd>
        {/if}
        <dt>Email</dt>
        <dd><a class="link tap" href="mailto:{COMPANY.email}"><Email /></a></dd>
      </dl>
    </section>
  </div>
</main>
<Footer />

<style>
  .row {
    display: grid;
    gap: 0.875rem;
    padding-block: 2.5rem;
    border-top: 1px solid var(--color-line);
  }
  .row:last-child {
    border-bottom: 1px solid var(--color-line);
  }
  h2 {
    font-size: var(--text-lede);
    font-weight: 600;
    letter-spacing: -0.01em;
  }
  p {
    max-width: 38rem;
    color: var(--color-ink-2);
    font-size: var(--text-lede);
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
  .details {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 0.625rem 2rem;
    font-size: var(--text-lede);
  }
  .details dt {
    color: var(--color-ink-3);
  }
  .details dd {
    overflow-wrap: anywhere;
  }
  @media (min-width: 768px) {
    .row {
      grid-template-columns: 16rem minmax(0, 1fr);
      gap: 2rem;
      padding-block: 3rem;
    }
  }
</style>
