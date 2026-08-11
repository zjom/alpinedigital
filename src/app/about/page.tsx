import {
  MessageSquare,
  Gauge,
  ShieldCheck,
  Lightbulb,
  HeartHandshake,
} from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { CtaBand } from "@/components/sections/CtaBand";
import { ProofStats } from "@/components/sections/ProofStats";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata = buildMetadata({
  title: "About",
  description:
    "We're a young, fast digital consultancy for established Australian and New Zealand businesses. Strong offline operators who need the online half built properly — with no jargon, no lock-in and no surprise invoices.",
  path: "/about",
});

const VALUES = [
  {
    icon: MessageSquare,
    title: "Plain English, always",
    body: "If you don't understand what we've said, that's our failure, not yours. We explain things in the language of your business rather than ours, and we'll never make you feel slow for asking.",
  },
  {
    icon: Gauge,
    title: "Fast, without being sloppy",
    body: "We're a small team without layers of account management, so decisions happen in hours rather than weeks. That speed comes from having less bureaucracy, not from cutting corners on the build.",
  },
  {
    icon: ShieldCheck,
    title: "Honest about what you need",
    body: "We regularly talk clients out of spending money. If your existing site is fine, or a feature won't pay for itself, we'll say so. The long relationship is worth more than the extra invoice.",
  },
  {
    icon: Lightbulb,
    title: "No such thing as can't",
    body: "If the tool you need doesn't exist, we'll build it. Most of our best work started with a client saying 'I don't suppose you could...' and us going away to work out how.",
  },
  {
    icon: HeartHandshake,
    title: "The client comes first",
    body: "Not the project, not the invoice, not our portfolio. If something goes wrong we fix it and tell you straight. That's the entire business model.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <PageHeader
        eyebrow="Who we are"
        title={
          <>
            Young, fast, and genuinely{" "}
            <span className="text-gradient">obsessed</span> with getting this
            right.
          </>
        }
        description="Alpine Digital exists because there's a gap between what established businesses need online and what the market actually offers them. On one side, cheap template shops that disappear after launch. On the other, big agencies that charge like a wounded bull and hand you to a junior. We're the third option."
      />

      {/* Story */}
      <section className="py-20 sm:py-24">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-ice">
                The short version
              </h2>
            </Reveal>

            <div className="flex flex-col gap-6 text-lg leading-relaxed text-muted">
              <Reveal>
                <p>
                  We kept meeting the same business. Thirty years of trading, a
                  reputation nobody could buy, a customer base that would follow
                  them anywhere — and a website that looked like it had been
                  abandoned in 2013. Or no website at all. The owners weren&rsquo;t
                  lazy or uninterested. They were flat out running a business
                  that worked, and every quote they&rsquo;d received for fixing
                  the online half was either suspiciously cheap or completely
                  incomprehensible.
                </p>
              </Reveal>
              <Reveal>
                <p>
                  That gap is the whole reason we exist. These businesses are
                  often the best in their category and they&rsquo;re losing
                  ground to competitors who are worse at the actual work but
                  better at being found. It&rsquo;s a genuinely solvable problem,
                  and solving it changes what a business is capable of — we&rsquo;ve
                  watched a supplier go from a fax machine to millions online
                  inside two years.
                </p>
              </Reveal>
              <Reveal>
                <p>
                  So we built the consultancy we&rsquo;d want if we were on the
                  other side of the table. Fixed prices quoted up front. Plain
                  English. Training included as standard, because a system you
                  can&rsquo;t run yourself isn&rsquo;t an asset. And absolute
                  clarity that everything we make belongs to you — your domain,
                  your accounts, your data, your code.
                </p>
              </Reveal>
              <Reveal>
                <p className="text-ink">
                  We&rsquo;re young, we move quickly, and we take on things other
                  people say can&rsquo;t be done. That combination is the point,
                  not a disclaimer.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <ProofStats />

      {/* Values */}
      <section className="border-y border-line bg-surface/25 py-20 sm:py-24">
        <Container size="wide">
          <SectionHeading
            eyebrow="How we work"
            title="Five things we won't compromise on."
            align="center"
            className="mx-auto"
          />

          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((value, index) => {
              const Icon = value.icon;

              return (
                <Reveal
                  key={value.title}
                  as="li"
                  delay={(index % 3) * 0.08}
                  className="h-full"
                >
                  <Card className="flex h-full flex-col gap-4 p-7">
                    <span className="inline-flex size-11 items-center justify-center rounded-xl border border-ice/25 bg-ice/10 text-ice">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <h3 className="font-display text-lg font-bold text-ink">
                      {value.title}
                    </h3>
                    <p className="leading-relaxed text-muted">{value.body}</p>
                  </Card>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Where we work */}
      <section className="py-20 sm:py-24">
        <Container size="default">
          <Reveal className="flex flex-col items-center text-center">
            <h2 className="text-(length:--text-display-sm) text-ink">
              {site.location.serviceArea}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              Most of our work runs remotely without issue, and we have clients
              in five states and both islands. For bigger builds we&rsquo;ll come
              to you — for some projects there&rsquo;s no substitute for standing
              in the warehouse and watching how things actually get done.
            </p>
          </Reveal>
        </Container>
      </section>

      <CtaBand
        eyebrow="Say hello"
        title="We'd like to hear about your business."
        description="Genuinely — the first call is the part we enjoy most. Tell us what you do, what's frustrating you online, and we'll tell you honestly whether we can help."
      />
    </>
  );
}
