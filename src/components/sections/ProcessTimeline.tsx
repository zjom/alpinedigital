import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/content/process";

/**
 * Compact process view for the home page. The full detail lives on /process.
 */
export function ProcessTimeline() {
  return (
    <section className="relative py-20 sm:py-28">
      <Container size="wide">
        <SectionHeading
          eyebrow="How it works"
          title="You'll always know exactly what happens next."
          description="No mystery, no disappearing for six weeks. Here's the whole engagement, start to finish."
          align="center"
          className="mx-auto"
        />

        <ol className="relative mt-14 grid gap-8 md:grid-cols-3 lg:grid-cols-5">
          {/* Connector line, desktop only. */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-5 hidden h-px bg-gradient-to-r from-transparent via-line-strong to-transparent lg:block"
          />

          {processSteps.map((step, index) => (
            <Reveal
              key={step.number}
              as="li"
              delay={index * 0.08}
              className="relative flex flex-col gap-3"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-full border border-ice/30 bg-base font-mono text-xs font-bold text-ice">
                {step.number}
              </span>
              <h3 className="font-display text-lg font-bold text-ink">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {step.summary}
              </p>
              <span className="mt-auto pt-2 font-mono text-xs text-faint">
                {step.duration}
              </span>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.2} className="mt-12 flex justify-center">
          <Link
            href="/process"
            className="group inline-flex items-center gap-2 font-mono text-sm text-ice transition-colors hover:text-ice-soft"
          >
            See the process in full detail
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
