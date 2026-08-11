import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card, CardGlow } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/content/services";

export function ServicesGrid() {
  return (
    <section className="relative py-20 sm:py-28">
      <Container size="wide">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="What we do"
            title={
              <>
                Everything you need to be
                <br className="hidden sm:block" /> found, trusted and bought
                from.
              </>
            }
            description="Six services, one team, no handoffs to a third party you've never met. Most clients start with one and add the rest as they grow."
          />
          <Reveal delay={0.1}>
            <Link
              href="/services"
              className="group inline-flex shrink-0 items-center gap-2 font-mono text-sm text-ice transition-colors hover:text-ice-soft"
            >
              All services in detail
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <Reveal
                key={service.id}
                as="li"
                delay={(index % 3) * 0.08}
                className="h-full"
              >
                <Card interactive as="article" className="h-full">
                  <CardGlow className="opacity-0 group-hover:opacity-100" />
                  <Link
                    href={`/services#${service.id}`}
                    className="flex h-full flex-col gap-4 p-7"
                  >
                    <span className="inline-flex size-11 items-center justify-center rounded-xl border border-line bg-surface-2 text-ice transition-colors group-hover:border-ice/40 group-hover:bg-ice/10">
                      <Icon aria-hidden className="size-5" />
                    </span>

                    <h3 className="font-display text-xl font-bold text-ink">
                      {service.title}
                    </h3>

                    <p className="flex-1 leading-relaxed text-muted">
                      {service.summary}
                    </p>

                    <span className="inline-flex items-center gap-2 pt-1 font-mono text-xs uppercase tracking-[0.12em] text-faint transition-colors group-hover:text-ice">
                      Learn more
                      <ArrowRight
                        aria-hidden
                        className="size-3.5 transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </Card>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
