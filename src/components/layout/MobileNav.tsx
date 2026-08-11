"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { nav, site, bookingUrl } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Full-screen mobile navigation.
 *
 * Handles the three things a hand-rolled dialog usually gets wrong: it locks
 * body scroll while open, traps Tab within the panel, and restores focus to the
 * trigger on close. Escape closes it.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Close on route change — otherwise the panel survives navigation. Adjusted
  // during render rather than in an effect, so the panel never paints open on
  // the new route (see react.dev "adjusting state when a prop changes").
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    // Captured now: the ref may point elsewhere by the time cleanup runs.
    const trigger = triggerRef.current;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    // Move focus into the panel so the next Tab lands somewhere sensible.
    panelRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      (previouslyFocused ?? trigger)?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label="Open menu"
        className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong bg-surface/60 text-ink transition-colors hover:border-ice/50 lg:hidden"
      >
        <Menu aria-hidden className="size-5" />
      </button>

      <div
        id="mobile-nav-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        tabIndex={-1}
        hidden={!open}
        className={cn(
          "fixed inset-0 z-50 flex flex-col bg-base/97 backdrop-blur-2xl lg:hidden",
        )}
      >
        <div className="flex h-16 items-center justify-end px-5 sm:h-20 sm:px-8">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong bg-surface/60 text-ink transition-colors hover:border-ice/50"
          >
            <X aria-hidden className="size-5" />
          </button>
        </div>

        <nav
          aria-label="Mobile"
          className="flex flex-1 flex-col justify-center gap-1 px-5 sm:px-8"
        >
          {[...nav, { label: "Contact", href: "/contact" }].map(
            (item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between border-b border-line py-5 font-display text-3xl font-bold tracking-tight text-ink transition-colors hover:text-ice"
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-faint">
                    0{index + 1}
                  </span>
                  {item.label}
                </span>
                <ArrowRight
                  aria-hidden
                  className="size-6 text-faint transition-all group-hover:translate-x-1 group-hover:text-ice"
                />
              </Link>
            ),
          )}
        </nav>

        <div className="flex flex-col gap-3 px-5 pb-10 sm:px-8">
          <Button
            href={bookingUrl}
            size="lg"
            className="w-full"
            {...(bookingUrl.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            Book a free call
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button
              href={`tel:${site.contact.phone}`}
              variant="secondary"
              size="md"
            >
              <Phone aria-hidden className="size-4" />
              Call
            </Button>
            <Button
              href={`mailto:${site.contact.email}`}
              variant="secondary"
              size="md"
            >
              <Mail aria-hidden className="size-4" />
              Email
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
