import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { CtaBand } from "@/components/sections/CtaBand";
import { Container } from "@/components/ui/Container";
import { Card, CardGlow } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { caseStudies } from "@/content/caseStudies";

export const metadata = buildMetadata({
  title: "Case studies",
  description:
    "Real Australian and New Zealand businesses, real numbers. Trade ecommerce turning over millions, custom job scheduling, wholesale channels built from a single storefront.",
  path: "/work",
});

function formatMetric(value: number, decimals?: number) {
  return value.toLocaleString("en-AU", {
    minimumFractionDigits: decimals ?? 0,
    maximumFractionDigits: decimals ?? 0,
  });
}

export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Case studies", path: "/work" },
        ])}
      />

      <PageHeader
        eyebrow="Our work"
        title="Real businesses. Real numbers."
        description="Every one of these started with an owner who was excellent at their trade and stuck on the technology. We've included what actually happened, including the parts that were hard."
      />

      <section className="py-16 sm:py-20">
        <Container size="wide">
          <ul className="grid gap-4 lg:grid-cols-2">
            {caseStudies.map((study, index) => (
              <Reveal
                key={study.slug}
                as="li"
                delay={(index % 2) * 0.08}
                className="h-full"
              >
                <Card interactive as="article" className="h-full">
                  <CardGlow className="opacity-0 group-hover:opacity-100" />
                  <Link
                    href={`/work/${study.slug}`}
                    className="flex h-full flex-col gap-5 p-8"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge tone="ice">{study.industry}</Badge>
                      <Badge>{study.location}</Badge>
                      <Badge>{study.year}</Badge>
                    </div>

                    <h2 className="font-display text-2xl font-bold text-ink">
                      {study.headline}
                    </h2>

                    <p className="flex-1 leading-relaxed text-muted">
                      {study.summary}
                    </p>

                    <dl className="grid grid-cols-3 gap-4 border-t border-line pt-6">
                      {study.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="flex flex-col-reverse justify-end"
                        >
                          <dt className="mt-1 text-xs leading-snug text-faint">
                            {metric.label}
                          </dt>
                          <dd className="font-display text-xl font-bold text-gradient">
                            {metric.prefix}
                            {formatMetric(metric.value, metric.decimals)}
                            {metric.suffix}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-faint transition-colors group-hover:text-ice">
                      Read the full story
                      <ArrowRight
                        aria-hidden
                        className="size-3.5 transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </Card>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        eyebrow="Your turn"
        title="What would yours look like?"
        description="Every project on this page started with a 45-minute call and no obligation. Tell us what's holding your business back online and we'll tell you what it'd take to fix it."
      />
    </>
  );
}
