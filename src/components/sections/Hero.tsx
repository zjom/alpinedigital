import { ArrowRight, Check } from "lucide-react";
import { TopoBackdrop } from "@/components/brand/TopoBackdrop";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { bookingUrl } from "@/content/site";

/**
 * Above-the-fold. Deliberately a server component with no entrance animation on
 * the headline — the LCP text paints immediately rather than fading in.
 */
const PROOF_POINTS = [
  "Fixed price, quoted upfront",
  "Training included, always",
  "You own everything",
] as const;

export function Hero() {
  const isExternalBooking = bookingUrl.startsWith("http");

  return (
    <section className="relative isolate overflow-hidden">
      <TopoBackdrop intensity="hero" />

      <Container
        size="wide"
        className="relative flex min-h-[calc(100svh-5rem)] flex-col justify-center py-20 sm:py-28"
      >
        <div className="max-w-4xl">
          <Eyebrow className="mb-7">
            Digital consultancy · Australia &amp; New Zealand
          </Eyebrow>

          <h1 className="text-(length:--text-display-xl) text-ink">
            Your business is brilliant offline.
            <br />
            <span className="text-gradient">
              Let&rsquo;s make it unmissable online.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            We build the websites, online stores and custom systems that
            established businesses need — and we stay to train your team and
            keep it all running. No jargon, no lock-in, no surprise invoices.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
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
              Book a free 45-min call
            </Button>
          </div>

          <ul className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
            {PROOF_POINTS.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2 text-sm text-muted"
              >
                <Check aria-hidden className="size-4 shrink-0 text-ice" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
