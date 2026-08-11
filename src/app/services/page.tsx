import { Check, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { CtaBand } from "@/components/sections/CtaBand";
import { OwnershipPledge } from "@/components/sections/OwnershipPledge";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { services } from "@/content/services";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Websites, ecommerce, Google Ads and Merchant Center, email and domains, bespoke systems, and ongoing care. Everything an established business needs to work online — with training and support included.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />

      <PageHeader
        eyebrow="What we do"
        title="Six services. One team. No handoffs."
        description="Most agencies do one of these and subcontract the rest to someone you never meet. We do all of it in-house, which means nothing falls between the cracks and there's only ever one number to call."
      >
        {/* Jump links — this page is long, and a non-technical visitor should
            not have to scroll hunting for the thing they came for. */}
        <nav aria-label="Services on this page" className="flex flex-wrap gap-2">
          {services.map((service) => (
            <a
              key={service.id}
              href={`#${service.id}`}
              className="rounded-full border border-line-strong bg-surface/60 px-4 py-2 text-sm text-muted transition-colors hover:border-ice/50 hover:text-ice"
            >
              {service.title}
            </a>
          ))}
        </nav>
      </PageHeader>

      <div className="divide-y divide-line">
        {services.map((service, index) => {
          const Icon = service.icon;
          const isEven = index % 2 === 0;

          return (
            <section
              key={service.id}
              id={service.id}
              // scroll-mt clears the fixed header when jumped to via anchor.
              className="scroll-mt-24 py-20 sm:py-24"
            >
              <Container size="wide">
                <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
                  {/* Narrative */}
                  <Reveal className={isEven ? "" : "lg:order-2"}>
                    <div className="flex items-center gap-4">
                      <span className="inline-flex size-12 items-center justify-center rounded-xl border border-ice/25 bg-ice/10 text-ice">
                        <Icon aria-hidden className="size-5" />
                      </span>
                      <span className="font-mono text-xs text-faint">
                        0{index + 1} / 06
                      </span>
                    </div>

                    <h2 className="mt-6 text-(length:--text-display-md) text-ink">
                      {service.title}
                    </h2>

                    <p className="mt-5 text-lg leading-relaxed text-muted">
                      {service.body}
                    </p>

                    <div className="mt-7">
                      <Badge tone="ice">{service.outcome}</Badge>
                    </div>

                    <div className="mt-8">
                      <Button href="/contact" variant="secondary">
                        Talk to us about {service.title.toLowerCase()}
                        <ArrowRight
                          aria-hidden
                          className="size-4 transition-transform group-hover:translate-x-1"
                        />
                      </Button>
                    </div>
                  </Reveal>

                  {/* Deliverables — the specificity is what makes it credible. */}
                  <Reveal delay={0.1} className={isEven ? "" : "lg:order-1"}>
                    <Card className="h-full p-8">
                      <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-faint">
                        What&rsquo;s included
                      </h3>
                      <ul className="mt-6 flex flex-col gap-4">
                        {service.includes.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <Check
                              aria-hidden
                              className="mt-0.5 size-4 shrink-0 text-ice"
                            />
                            <span className="leading-relaxed text-muted">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </Reveal>
                </div>
              </Container>
            </section>
          );
        })}
      </div>

      <OwnershipPledge />

      <CtaBand
        eyebrow="Not sure which you need?"
        title="Tell us the problem. We'll tell you the fix."
        description="You don't need to know whether you need a rebuild, an ads account or a custom system. That's our job. Describe what's frustrating you and we'll tell you honestly what would actually help — including when the answer is 'nothing, save your money'."
      />
    </>
  );
}
