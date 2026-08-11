import { ArrowRight, Phone } from "lucide-react";
import { TopoBackdrop } from "@/components/brand/TopoBackdrop";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { site, bookingUrl } from "@/content/site";

/**
 * Closing CTA. Reused at the bottom of every page, with the copy varied per
 * page so it never reads as the same block pasted five times.
 */
export function CtaBand({
  eyebrow = "Ready when you are",
  title = "Let's get your business online properly.",
  description = "A free 45-minute call, no pitch and no obligation. Worst case you leave with a clear idea of what you'd need and what it should cost.",
}: {
  eyebrow?: string;
  title?: React.ReactNode;
  description?: string;
}) {
  const isExternalBooking = bookingUrl.startsWith("http");

  return (
    <section className="relative isolate overflow-hidden border-t border-line">
      <TopoBackdrop intensity="hero" />

      <Container size="default" className="relative py-24 sm:py-32">
        <Reveal className="flex flex-col items-center text-center">
          <Eyebrow className="mb-6">{eyebrow}</Eyebrow>

          <h2 className="max-w-3xl text-(length:--text-display-lg) text-ink">
            {title}
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {description}
          </p>

          <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href="/contact" size="lg" className="w-full sm:w-auto">
              Start your project
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-200 group-hover:translate-x-1"
              />
            </Button>
            <Button
              href={bookingUrl}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
              {...(isExternalBooking
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              Book a free call
            </Button>
          </div>

          <p className="mt-8 text-sm text-faint">
            Or just ring us —{" "}
            <a
              href={`tel:${site.contact.phone}`}
              className="inline-flex items-center gap-1.5 font-mono text-ice transition-colors hover:text-ice-soft"
            >
              <Phone aria-hidden className="size-3.5" />
              {site.contact.phoneDisplay}
            </a>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
