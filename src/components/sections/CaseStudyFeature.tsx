import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatCounter } from "@/components/ui/StatCounter";
import { featuredCaseStudies } from "@/content/caseStudies";

/**
 * Metric-forward proof. The first study gets a full-width feature treatment;
 * the rest sit in a two-column grid beneath it.
 */
export function CaseStudyFeature() {
  const [lead, ...rest] = featuredCaseStudies;
  if (!lead) return null;

  return (
    <section className="relative border-y border-line bg-surface/25 py-20 sm:py-28">
      <Container size="wide">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Proof"
            title="Real businesses. Real numbers."
            description="We'd rather show you what happened than tell you how passionate we are."
          />
          <Reveal delay={0.1}>
            <Link
              href="/work"
              className="group inline-flex shrink-0 items-center gap-2 font-mono text-sm text-ice transition-colors hover:text-ice-soft"
            >
              All case studies
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>

        {/* Lead study */}
        <Reveal className="mt-12">
          <Card className="overflow-hidden">
            <div className="grid lg:grid-cols-[1.25fr_1fr]">
              <div className="flex flex-col gap-6 border-b border-line p-8 sm:p-10 lg:border-r lg:border-b-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="ice">{lead.industry}</Badge>
                  <Badge>{lead.location}</Badge>
                  <Badge>{lead.year}</Badge>
                </div>

                <h3 className="text-(length:--text-display-sm) text-ink">
                  {lead.headline}
                </h3>

                <p className="leading-relaxed text-muted">{lead.summary}</p>

                {lead.quote ? (
                  <blockquote className="relative rounded-xl border border-line bg-base/60 p-6">
                    <Quote
                      aria-hidden
                      className="absolute top-5 right-5 size-6 text-ice/20"
                    />
                    <p className="pr-8 leading-relaxed text-ink italic">
                      &ldquo;{lead.quote.text}&rdquo;
                    </p>
                    <footer className="mt-4 font-mono text-xs text-faint not-italic">
                      {lead.quote.role}
                    </footer>
                  </blockquote>
                ) : null}

                <Link
                  href={`/work/${lead.slug}`}
                  className="group inline-flex items-center gap-2 self-start font-mono text-sm text-ice transition-colors hover:text-ice-soft"
                >
                  Read the full story
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>

              {/* Metrics rail */}
              <dl className="grid divide-y divide-line bg-base/40">
                {lead.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="flex flex-col-reverse justify-end gap-1 p-8"
                  >
                    <dt className="text-sm font-medium text-ink">
                      {metric.label}
                      {metric.note ? (
                        <span className="mt-1 block text-xs font-normal text-faint">
                          {metric.note}
                        </span>
                      ) : null}
                    </dt>
                    <dd className="font-display text-(length:--text-display-sm) font-bold text-gradient">
                      <StatCounter
                        value={metric.value}
                        prefix={metric.prefix}
                        suffix={metric.suffix}
                        decimals={metric.decimals}
                      />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Card>
        </Reveal>

        {/* Supporting studies */}
        {rest.length > 0 ? (
          <ul className="mt-4 grid gap-4 lg:grid-cols-2">
            {rest.map((study, index) => (
              <Reveal key={study.slug} as="li" delay={index * 0.08}>
                <Card interactive as="article" className="h-full">
                  <Link
                    href={`/work/${study.slug}`}
                    className="flex h-full flex-col gap-5 p-8"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge tone="ice">{study.industry}</Badge>
                      <Badge>{study.location}</Badge>
                    </div>

                    <h3 className="font-display text-xl font-bold text-ink">
                      {study.headline}
                    </h3>

                    <p className="flex-1 leading-relaxed text-muted">
                      {study.summary}
                    </p>

                    <dl className="flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-5">
                      {study.metrics.slice(0, 2).map((metric) => (
                        <div
                          key={metric.label}
                          className="flex flex-col-reverse justify-end"
                        >
                          <dt className="text-xs text-faint">{metric.label}</dt>
                          <dd className="font-display text-xl font-bold text-ice">
                            {metric.prefix}
                            {metric.value.toLocaleString("en-AU", {
                              minimumFractionDigits: metric.decimals ?? 0,
                              maximumFractionDigits: metric.decimals ?? 0,
                            })}
                            {metric.suffix}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </Link>
                </Card>
              </Reveal>
            ))}
          </ul>
        ) : null}
      </Container>
    </section>
  );
}
