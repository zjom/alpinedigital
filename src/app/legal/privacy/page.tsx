import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata = buildMetadata({
  title: "Privacy policy",
  description: `How ${site.name} collects, uses and protects your personal information.`,
  path: "/legal/privacy",
});

/**
 * ⚠️ PLACEHOLDER — reviewed by a lawyer before launch.
 *
 * This is a reasonable, honest starting point drafted around the Australian
 * Privacy Principles, but it is not legal advice and has not been reviewed by a
 * solicitor. Have it checked, and update it if you add analytics, advertising
 * pixels, or any third-party tracking.
 */
export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy policy"
        description={`How ${site.name} handles your personal information.`}
      />

      <Container size="narrow" className="py-16 sm:py-20">
        <div className="flex flex-col gap-8 leading-relaxed text-muted [&_h2]:mt-4 [&_h2]:text-xl [&_h2]:text-ink [&_a]:text-ice hover:[&_a]:underline">
          <p className="font-mono text-xs text-faint">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-AU", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          <section className="flex flex-col gap-3">
            <h2>Who we are</h2>
            <p>
              {site.legalName} (ABN {site.contact.abn}) trading as {site.name}{" "}
              (&ldquo;we&rdquo;, &ldquo;us&rdquo;) provides digital consultancy
              services to businesses in Australia. We are bound
              by the Australian Privacy Principles set out in the Privacy Act
              1988 (Cth).
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2>What we collect</h2>
            <p>
              We collect only what we need to respond to you and deliver our
              services. That means the information you give us directly — your
              name, business name, email address, phone number, and whatever you
              tell us about your project through our enquiry form, by email or
              on a call.
            </p>
            <p>
              We also collect basic technical information automatically when you
              visit this site, such as your browser type and the pages you view.
              This is aggregate information and is not used to identify you
              individually.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2>How we use it</h2>
            <p>
              To reply to your enquiry, prepare proposals, deliver and support
              the work you engage us for, send you invoices, and meet our legal
              and tax obligations. We do not sell your information to anyone, and
              we do not send marketing email to people who have not asked for it.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2>Who we share it with</h2>
            <p>
              Only the service providers we need to run the business — for
              example our email provider, hosting provider and accounting
              software. These providers may store data outside Australia. We
              choose providers that offer appropriate protections, and we share
              only what is necessary.
            </p>
            <p>
              We will disclose information where we are required to by law, and
              in no other circumstances.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2>Client data</h2>
            <p>
              Where we build or maintain systems for you, we may have access to
              your business&rsquo;s data and to your customers&rsquo; personal
              information. That data remains yours. We access it only to perform
              the work you have engaged us for, we do not use it for any other
              purpose, and we will export and hand it over to you or your
              nominated provider on request at any time.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2>How long we keep it</h2>
            <p>
              We keep enquiry information for as long as it is useful to the
              conversation, and client records for the period required by
              Australian tax and business records law. After that we delete or
              de-identify it.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2>Security</h2>
            <p>
              We take reasonable steps to protect your information from misuse,
              loss and unauthorised access, including encryption in transit,
              access controls and multi-factor authentication on our accounts. No
              system is perfectly secure, but we treat your data as carefully as
              we would want ours treated.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2>Accessing or correcting your information</h2>
            <p>
              You can ask us what personal information we hold about you, ask us
              to correct it, or ask us to delete it. Email{" "}
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>{" "}
              and we will respond within a reasonable time and at no cost.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2>Complaints</h2>
            <p>
              If you think we have mishandled your information, contact us first
              at{" "}
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>{" "}
              and we will take it seriously. If you are not satisfied with our
              response, you can complain to the Office of the Australian
              Information Commissioner at{" "}
              <a
                href="https://www.oaic.gov.au"
                target="_blank"
                rel="noopener noreferrer"
              >
                oaic.gov.au
              </a>
              .
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2>Contact</h2>
            <p>
              {site.legalName}
              <br />
              <a href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </a>
              <br />
              <a href={`tel:${site.contact.phone}`}>
                {site.contact.phoneDisplay}
              </a>
            </p>
          </section>
        </div>
      </Container>
    </>
  );
}
