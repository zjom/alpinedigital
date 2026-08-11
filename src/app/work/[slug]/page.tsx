import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Quote, Check } from "lucide-react";
import { TopoBackdrop } from "@/components/brand/TopoBackdrop";
import { CtaBand } from "@/components/sections/CtaBand";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { StatCounter } from "@/components/ui/StatCounter";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, caseStudyJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { caseStudies, getCaseStudy } from "@/content/caseStudies";

/** Fully static — every study is known at build time. */
export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    return buildMetadata({
      title: "Case study not found",
      description: "This case study could not be found.",
      path: "/work",
      noIndex: true,
    });
  }

  return buildMetadata({
    title: study.headline,
    description: study.summary,
    path: `/work/${study.slug}`,
  });
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) notFound();

  const currentIndex = caseStudies.findIndex((c) => c.slug === study.slug);
  const next = caseStudies[(currentIndex + 1) % caseStudies.length];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Case studies", path: "/work" },
            { name: study.client, path: `/work/${study.slug}` },
          ]),
          caseStudyJsonLd({
            headline: study.headline,
            description: study.summary,
            slug: study.slug,
            datePublished: `${study.year}-01-01`,
          }),
        ]}
      />

      {/* Header */}
      <section className="relative isolate overflow-hidden border-b border-line">
        <TopoBackdrop intensity="subtle" />

        <Container size="wide" className="relative py-16 sm:py-24">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-ice"
          >
            <ArrowLeft
              aria-hidden
              className="size-4 transition-transform group-hover:-translate-x-1"
            />
            All case studies
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <Badge tone="ice">{study.industry}</Badge>
            <Badge>{study.location}</Badge>
            <Badge>{study.year}</Badge>
          </div>

          <h1 className="mt-6 max-w-4xl text-(length:--text-display-lg) text-ink">
            {study.headline}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {study.summary}
          </p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {study.services.map((service) => (
              <li
                key={service}
                className="rounded-full border border-line bg-surface/60 px-3 py-1.5 font-mono text-xs text-muted"
              >
                {service}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Results rail */}
      <section className="border-b border-line bg-surface/25 py-12">
        <Container size="wide">
          <dl className="grid gap-8 sm:grid-cols-3">
            {study.metrics.map((metric, index) => (
              <Reveal
                key={metric.label}
                delay={index * 0.08}
                className="flex flex-col-reverse justify-end"
              >
                <dt className="mt-2 font-medium text-ink">
                  {metric.label}
                  {metric.note ? (
                    <span className="mt-1 block text-sm font-normal text-faint">
                      {metric.note}
                    </span>
                  ) : null}
                </dt>
                <dd className="font-display text-(length:--text-display-md) font-bold text-gradient">
                  <StatCounter
                    value={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                    decimals={metric.decimals}
                  />
                </dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* Narrative */}
      <section className="py-20 sm:py-24">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            {/* Approach rail */}
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-ink">
                How we approached it
              </h2>
              <ul className="mt-6 flex flex-col gap-4">
                {study.approach.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check
                      aria-hidden
                      className="mt-0.5 size-4 shrink-0 text-ice"
                    />
                    <span className="text-sm leading-relaxed text-muted">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <div className="flex flex-col gap-12">
              <Reveal>
                <h2 className="text-(length:--text-display-sm) text-ink">
                  The challenge
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-muted">
                  {study.challenge}
                </p>
              </Reveal>

              <Reveal>
                <h2 className="text-(length:--text-display-sm) text-ink">
                  What we built
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-muted">
                  {study.build}
                </p>
              </Reveal>

              <Reveal>
                <h2 className="text-(length:--text-display-sm) text-ink">
                  The result
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-muted">
                  {study.result}
                </p>
              </Reveal>

              {study.quote ? (
                <Reveal>
                  <Card className="p-8 sm:p-10">
                    <Quote aria-hidden className="size-8 text-ice/30" />
                    <blockquote className="mt-5 text-xl leading-relaxed text-ink">
                      &ldquo;{study.quote.text}&rdquo;
                    </blockquote>
                    <footer className="mt-6 border-t border-line pt-5">
                      <p className="font-semibold text-ink">
                        {study.quote.author}
                      </p>
                      <p className="font-mono text-xs text-faint">
                        {study.quote.role}
                      </p>
                    </footer>
                  </Card>
                </Reveal>
              ) : null}
            </div>
          </div>
        </Container>
      </section>

      {/* Next study */}
      {next && next.slug !== study.slug ? (
        <section className="border-t border-line py-12">
          <Container size="wide">
            <Link
              href={`/work/${next.slug}`}
              className="group flex flex-col gap-3 rounded-2xl border border-line bg-surface/50 p-8 transition-all hover:-translate-y-1 hover:border-ice/40 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-faint">
                  Next case study
                </p>
                <p className="mt-2 font-display text-xl font-bold text-ink">
                  {next.headline}
                </p>
              </div>
              <ArrowRight
                aria-hidden
                className="size-6 shrink-0 text-ice transition-transform group-hover:translate-x-1"
              />
            </Link>
          </Container>
        </section>
      ) : null}

      <CtaBand
        eyebrow="Sound familiar?"
        title="Let's talk about your business."
        description="If any of this looks like your situation, the next step is a free 45-minute call. No pitch, no obligation, and a straight answer about what it would take."
      />
    </>
  );
}
