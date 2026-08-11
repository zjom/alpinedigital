import { PageHeader } from "@/components/sections/PageHeader";
import { CtaBand } from "@/components/sections/CtaBand";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { processSteps } from "@/content/process";
import { faqs } from "@/content/faqs";

export const metadata = buildMetadata({
  title: "Our process",
  description:
    "Exactly what happens when you work with us, step by step: a free call, a fixed itemised proposal, designs you sign off, a build you can watch progress, then launch, training and ongoing support.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Our process", path: "/process" },
          ]),
          faqJsonLd(faqs),
        ]}
      />

      <PageHeader
        eyebrow="How it works"
        title="No mystery. No disappearing for six weeks."
        description="The worst part of hiring a technical team, if you're not technical yourself, is not knowing whether things are going well. So here is the entire engagement written down — what happens, when, and what you get at the end of each stage."
      />

      {/* Steps */}
      <section className="py-16 sm:py-24">
        <Container size="wide">
          <ol className="flex flex-col gap-4">
            {processSteps.map((step, index) => (
              <Reveal key={step.number} as="li" delay={index * 0.05}>
                <Card className="grid gap-6 p-8 sm:p-10 lg:grid-cols-[auto_1fr_18rem] lg:gap-10">
                  <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-2xl border border-ice/25 bg-ice/10 font-display text-lg font-bold text-ice">
                    {step.number}
                  </span>

                  <div>
                    <h2 className="font-display text-2xl font-bold text-ink">
                      {step.title}
                    </h2>
                    <p className="mt-4 leading-relaxed text-muted">
                      {step.detail}
                    </p>
                  </div>

                  <dl className="flex flex-col gap-5 border-t border-line pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                    <div>
                      <dt className="font-mono text-xs uppercase tracking-[0.14em] text-faint">
                        You receive
                      </dt>
                      <dd className="mt-2 text-sm leading-relaxed text-ink">
                        {step.deliverable}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-xs uppercase tracking-[0.14em] text-faint">
                        Typical timing
                      </dt>
                      <dd className="mt-2 font-mono text-sm text-ice">
                        {step.duration}
                      </dd>
                    </div>
                  </dl>
                </Card>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-t border-line bg-surface/25 py-20 sm:py-24">
        <Container size="default">
          <SectionHeading
            eyebrow="Questions"
            title="The things everyone asks."
            description="If yours isn't here, just ring us. We'd rather answer it now than have it stop you enquiring."
            align="center"
            className="mx-auto"
          />
          <Accordion items={faqs} className="mt-12" />
        </Container>
      </section>

      <CtaBand
        eyebrow="Step one"
        title="It starts with a conversation."
        description="Forty-five minutes, free, no obligation. We'll ask about your business and give you a straight answer about what would actually help — even if that answer is that you don't need us."
      />
    </>
  );
}
