import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/content/testimonials";

/**
 * Renders nothing when there are no testimonials.
 *
 * That's deliberate: if real client quotes aren't collected yet, emptying
 * src/content/testimonials.ts removes the section entirely rather than leaving
 * fabricated quotes on a live site.
 */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="relative py-20 sm:py-28">
      <Container size="wide">
        <SectionHeading
          eyebrow="In their words"
          title="What clients actually say."
          align="center"
          className="mx-auto"
        />

        <ul className="mt-14 grid gap-4 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Reveal
              key={testimonial.quote}
              as="li"
              delay={(index % 2) * 0.08}
              className="h-full"
            >
              <Card className="flex h-full flex-col gap-5 p-8">
                <Quote aria-hidden className="size-7 text-ice/30" />

                <blockquote className="flex-1 text-lg leading-relaxed text-ink">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      {testimonial.author}
                    </p>
                    <p className="font-mono text-xs text-faint">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                  {testimonial.metric ? (
                    <p className="font-mono text-xs text-ice">
                      {testimonial.metric}
                    </p>
                  ) : null}
                </footer>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
