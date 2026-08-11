"use client";

import { useEffect, useState } from "react";
import { Phone, CalendarDays } from "lucide-react";
import { site, bookingUrl } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Mobile-only sticky action bar.
 *
 * For a phone-first SMB audience this is the single highest-leverage conversion
 * element on the site. It appears only after the user has scrolled past the
 * hero — showing it immediately would just cover the hero's own CTAs.
 */
export function StickyMobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isExternalBooking = bookingUrl.startsWith("http");

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-base/92 backdrop-blur-xl transition-transform duration-300 ease-out lg:hidden",
        // Clears the iOS home indicator.
        "pb-[env(safe-area-inset-bottom)]",
        visible ? "translate-y-0" : "translate-y-full",
      )}
      // Hidden from AT and unfocusable while off-screen; the header and footer
      // already expose these same actions, so nothing is lost.
      aria-hidden={!visible}
      inert={!visible}
    >
      <div className="grid grid-cols-2 gap-2 p-3">
        <a
          href={`tel:${site.contact.phone}`}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-line-strong bg-surface text-sm font-medium text-ink transition-colors active:bg-surface-2"
        >
          <Phone aria-hidden className="size-4 text-ice" />
          Call us
        </a>
        <a
          href={bookingUrl}
          {...(isExternalBooking
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-ice text-sm font-semibold text-base transition-colors active:bg-ice-dim"
        >
          <CalendarDays aria-hidden className="size-4" />
          Book a free call
        </a>
      </div>
    </div>
  );
}
