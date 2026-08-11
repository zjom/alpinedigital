import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TopoBackdrop } from "@/components/brand/TopoBackdrop";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { nav } from "@/content/site";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden">
      <TopoBackdrop intensity="hero" />

      <Container size="default" className="relative py-24 text-center">
        <Eyebrow className="mb-6">Error 404</Eyebrow>

        <h1 className="text-(length:--text-display-lg) text-ink">
          This page is off the map.
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-muted">
          The page you&rsquo;re after has moved or never existed. Here&rsquo;s
          the way back down.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/" size="lg">
            Back to home
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform group-hover:translate-x-1"
            />
          </Button>
          <Button href="/contact" variant="secondary" size="lg">
            Get in touch
          </Button>
        </div>

        <nav
          aria-label="Site sections"
          className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-sm text-muted transition-colors hover:text-ice"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </section>
  );
}
