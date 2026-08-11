import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { StatCounter } from "@/components/ui/StatCounter";
import { stats } from "@/content/stats";

/**
 * Note the dt/dd ordering below: a `div` wrapper inside a `dl` may only contain
 * `dt` and `dd`, and `dt` must come first — so the note lives inside the `dt`
 * and `flex-col-reverse` puts the number on top visually.
 */
export function ProofStats() {
  return (
    <section className="relative py-20 sm:py-28">
      <Container size="wide">
        <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 0.08}
              className="flex flex-col-reverse justify-end gap-2 bg-base p-7 sm:p-8"
            >
              <dt className="font-medium text-ink">
                {stat.label}
                {stat.note ? (
                  <span className="mt-1 block text-sm leading-relaxed font-normal text-faint">
                    {stat.note}
                  </span>
                ) : null}
              </dt>
              <dd className="font-display text-(length:--text-display-sm) font-bold text-gradient">
                <StatCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
