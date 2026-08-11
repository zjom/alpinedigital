import { Container } from "@/components/ui/Container";
import { Marquee } from "@/components/ui/Marquee";
import { industries } from "@/content/stats";

/**
 * Industries rather than client logos — honest while the logo wall is still
 * being assembled, and arguably more useful: a prospect scans for their own
 * sector, not for names they don't recognise.
 */
export function TrustBar() {
  return (
    <section
      aria-label="Industries we work in"
      className="border-y border-line bg-surface/30 py-8"
    >
      <Container size="wide" className="mb-6">
        <p className="text-center font-mono text-xs uppercase tracking-[0.18em] text-faint">
          Trusted by established businesses across
        </p>
      </Container>
      <Marquee items={industries} />
    </section>
  );
}
