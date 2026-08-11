import { TopoBackdrop } from "@/components/brand/TopoBackdrop";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * Shared header for inner pages. Carries the topo motif so every page reads as
 * part of the same system.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line">
      <TopoBackdrop intensity="subtle" />

      <Container size="wide" className="relative py-20 sm:py-28">
        <div className="max-w-3xl">
          <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
          <h1 className="text-(length:--text-display-lg) text-ink">{title}</h1>
          {description ? (
            <div className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              {description}
            </div>
          ) : null}
          {children ? <div className="mt-9">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
