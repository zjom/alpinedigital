import { Globe, Database, KeyRound, Code2, GraduationCap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * The differentiator section.
 *
 * A very large share of this market has been burned by an agency that held
 * their domain, their Google account or their code hostage. Saying plainly that
 * you won't is disproportionately persuasive — it addresses the fear they
 * haven't articulated yet.
 */
const PLEDGES = [
  {
    icon: Globe,
    title: "Your domain",
    body: "Registered in your name, in an account you control. Not ours, not resold to you.",
  },
  {
    icon: KeyRound,
    title: "Your accounts",
    body: "Google, hosting, email, analytics — you're the owner on every one of them.",
  },
  {
    icon: Database,
    title: "Your data",
    body: "Customers, orders, content. Exportable in a usable format, any time you ask.",
  },
  {
    icon: Code2,
    title: "Your code",
    body: "Everything we build for you belongs to you, including the source.",
  },
  {
    icon: GraduationCap,
    title: "Your team, trained",
    body: "Hands-on training and plain-English docs, so you're never dependent on us.",
  },
] as const;

export function OwnershipPledge() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-surface/25 py-20 sm:py-28">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="Our promise"
              title={
                <>
                  You own <span className="text-gradient">everything</span>.
                  Even if you leave us.
                </>
              }
              description="We've picked up too many clients who were held hostage by their last agency — locked out of their own domain, their own Google account, their own website. We will never be that agency. No lock-in contracts, no exit fees, and if you ever move on we'll hand it all over cleanly and brief whoever takes over."
            />
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {PLEDGES.map((pledge, index) => {
              const Icon = pledge.icon;

              return (
                <Reveal
                  key={pledge.title}
                  as="li"
                  delay={index * 0.07}
                  className="h-full last:sm:col-span-2"
                >
                  <Card className="flex h-full flex-col gap-3 p-6">
                    <span className="inline-flex size-10 items-center justify-center rounded-lg border border-ice/25 bg-ice/10 text-ice">
                      <Icon aria-hidden className="size-[1.125rem]" />
                    </span>
                    <h3 className="font-display text-base font-bold text-ink">
                      {pledge.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {pledge.body}
                    </p>
                  </Card>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
