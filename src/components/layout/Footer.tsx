import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { LinkedInIcon, InstagramIcon } from "@/components/brand/SocialIcons";
import { Container } from "@/components/ui/Container";
import { site, footerNav } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-line bg-surface/40">
      <Container size="wide" className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          {/* Identity + direct contact */}
          <div className="flex flex-col gap-6">
            <Logo />
            <p className="max-w-sm leading-relaxed text-muted">
              We take established businesses online — and stay to make sure it
              keeps working. {site.location.serviceArea}.
            </p>

            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <a
                  href={`tel:${site.contact.phone}`}
                  className="inline-flex items-center gap-3 font-mono text-muted transition-colors hover:text-ice"
                >
                  <Phone aria-hidden className="size-4 shrink-0 text-ice" />
                  {site.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="inline-flex items-center gap-3 text-muted transition-colors hover:text-ice"
                >
                  <Mail aria-hidden className="size-4 shrink-0 text-ice" />
                  {site.contact.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-3 text-muted">
                <MapPin aria-hidden className="size-4 shrink-0 text-ice" />
                {site.location.region}
              </li>
            </ul>

            <div className="flex gap-2">
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Alpine Digital on LinkedIn"
                className="inline-flex size-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-ice/50 hover:text-ice"
              >
                <LinkedInIcon className="size-4" />
              </a>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Alpine Digital on Instagram"
                className="inline-flex size-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-ice/50 hover:text-ice"
              >
                <InstagramIcon className="size-4" />
              </a>
            </div>
          </div>

          {/* Sitemap */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {Object.entries(footerNav).map(([heading, links]) => (
              <div key={heading} className="flex flex-col gap-4">
                <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-faint">
                  {heading}
                </h2>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted transition-colors hover:text-ice"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 font-mono text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. ABN {site.contact.abn}.
          </p>
          <p className="text-faint">
            Built by us, obviously. You own everything we make for you.
          </p>
        </div>
      </Container>
    </footer>
  );
}
