"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MobileNav } from "./MobileNav";
import { nav, site, bookingUrl } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Sticky header. The "Book a free call" button is deliberately present at every
 * scroll position on every page — it is the site's primary persistent CTA.
 *
 * The header goes opaque on scroll so copy never competes with the topo motif
 * behind it.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-line bg-base/80 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <Container size="wide" className="flex h-16 items-center gap-4 sm:h-20">
        <Logo />

        <nav
          aria-label="Main"
          className="ml-auto hidden items-center gap-1 lg:flex"
        >
          {nav.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm transition-colors",
                  isActive
                    ? "text-ink"
                    : "text-muted hover:text-ink hover:bg-surface-2/60",
                )}
              >
                {item.label}
                {isActive ? (
                  <span
                    aria-hidden
                    className="absolute inset-x-4 -bottom-0.5 h-px bg-ice"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-4">

          <Button
            href={bookingUrl}
            size="sm"
            className="hidden sm:inline-flex"
            {...(bookingUrl.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            Book a free call
          </Button>

          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
