import { Phone, Mail, CalendarDays, Clock, MapPin } from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { ProjectEnquiryForm } from "@/components/forms/ProjectEnquiryForm";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Accordion } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { site, bookingUrl } from "@/content/site";
import { faqs } from "@/content/faqs";

export const metadata = buildMetadata({
  title: "Contact",
  description: `Tell us about your business and we'll reply ${site.responseTime}. Or book a free 45-minute call — no pitch, no obligation.`,
  path: "/contact",
});

export default function ContactPage() {
  const isExternalBooking = bookingUrl.startsWith("http");

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
          faqJsonLd(faqs),
        ]}
      />

      <PageHeader
        eyebrow="Get in touch"
        title="Tell us what you're trying to fix."
        description={`You don't need to know what you need — that's our job. Fill this in and we'll reply ${site.responseTime} with honest thoughts on what would actually help. If you'd rather just talk, ring us or book a time below.`}
      />

      <section className="py-16 sm:py-20">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-[1.7fr_1fr] lg:gap-14">
            {/* Primary path: the form */}
            <div>
              <ProjectEnquiryForm />
            </div>

            {/* Equal-weight alternates for people who won't fill in a form. */}
            <aside className="flex flex-col gap-4 lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <Card className="flex flex-col gap-4 p-7">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl border border-ice/25 bg-ice/10 text-ice">
                    <CalendarDays aria-hidden className="size-5" />
                  </span>
                  <h2 className="font-display text-lg font-bold text-ink">
                    Rather just talk?
                  </h2>
                  <p className="text-sm leading-relaxed text-muted">
                    Book a free 45-minute call at a time that suits you. No
                    pitch, no slide deck, no obligation — worst case you leave
                    knowing what you&rsquo;d need and roughly what it costs.
                  </p>
                  <a
                    href={bookingUrl}
                    {...(isExternalBooking
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-ice px-5 text-sm font-semibold text-base transition-colors hover:bg-ice-soft"
                  >
                    Book a free call
                  </a>
                </Card>
              </Reveal>

              <Reveal delay={0.08}>
                <Card className="flex flex-col gap-5 p-7">
                  <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-faint">
                    Or reach us directly
                  </h2>

                  <a
                    href={`tel:${site.contact.phone}`}
                    className="group flex items-start gap-3"
                  >
                    <Phone
                      aria-hidden
                      className="mt-0.5 size-4 shrink-0 text-ice"
                    />
                    <span>
                      <span className="block font-mono text-ink transition-colors group-hover:text-ice">
                        {site.contact.phoneDisplay}
                      </span>
                      <span className="text-xs text-faint">
                        Mon–Fri, business hours
                      </span>
                    </span>
                  </a>

                  <a
                    href={`mailto:${site.contact.email}`}
                    className="group flex items-start gap-3"
                  >
                    <Mail
                      aria-hidden
                      className="mt-0.5 size-4 shrink-0 text-ice"
                    />
                    <span>
                      <span className="block text-ink transition-colors group-hover:text-ice">
                        {site.contact.email}
                      </span>
                      <span className="text-xs text-faint">
                        We read every one
                      </span>
                    </span>
                  </a>

                  <div className="flex items-start gap-3">
                    <Clock
                      aria-hidden
                      className="mt-0.5 size-4 shrink-0 text-ice"
                    />
                    <span>
                      <span className="block text-ink">
                        Replies {site.responseTime}
                      </span>
                      <span className="text-xs text-faint">
                        Usually much sooner
                      </span>
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin
                      aria-hidden
                      className="mt-0.5 size-4 shrink-0 text-ice"
                    />
                    <span>
                      <span className="block text-ink">
                        {site.location.region}
                      </span>
                      <span className="text-xs text-faint">
                        Remote, and on-site for bigger builds
                      </span>
                    </span>
                  </div>
                </Card>
              </Reveal>

              <Reveal delay={0.16}>
                <Card className="flex flex-col gap-3 border-ice/20 bg-ice/5 p-7">
                  <h2 className="font-display text-base font-bold text-ink">
                    What happens next
                  </h2>
                  <ol className="flex flex-col gap-2.5 text-sm text-muted">
                    <li className="flex gap-3">
                      <span className="font-mono text-ice">1.</span>
                      We read what you sent, properly.
                    </li>
                    <li className="flex gap-3">
                      <span className="font-mono text-ice">2.</span>
                      We reply {site.responseTime} with initial thoughts.
                    </li>
                    <li className="flex gap-3">
                      <span className="font-mono text-ice">3.</span>
                      If it looks like a fit, we book a free call.
                    </li>
                    <li className="flex gap-3">
                      <span className="font-mono text-ice">4.</span>
                      You get a fixed, itemised proposal.
                    </li>
                  </ol>
                  <p className="mt-2 text-xs leading-relaxed text-faint">
                    No auto-responder sequences, no sales team, no chasing. If
                    we&rsquo;re not the right fit we&rsquo;ll tell you and point
                    you somewhere better.
                  </p>
                </Card>
              </Reveal>
            </aside>
          </div>
        </Container>
      </section>

      {/* FAQ — answers the objections that stop someone completing the form. */}
      <section className="border-t border-line bg-surface/25 py-20 sm:py-24">
        <Container size="default">
          <SectionHeading
            eyebrow="Before you ask"
            title="The questions we get most."
            align="center"
            className="mx-auto"
          />
          <Accordion items={faqs} className="mt-12" />
        </Container>
      </section>
    </>
  );
}
