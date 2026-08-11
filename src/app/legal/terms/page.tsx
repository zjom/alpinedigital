import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata = buildMetadata({
  title: "Terms of service",
  description: `The terms on which ${site.name} provides its services.`,
  path: "/legal/terms",
});

/**
 * ⚠️ PLACEHOLDER — must be reviewed by a lawyer before launch.
 *
 * These terms are written to match the promises the rest of the site makes
 * (fixed pricing, client ownership, no lock-in). They are not legal advice.
 * Have a solicitor review them, particularly the liability and IP clauses.
 */
export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of service"
        description={`The terms on which ${site.name} provides its services.`}
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
            <h2>These terms</h2>
            <p>
              These terms apply to services provided by {site.legalName} (ABN{" "}
              {site.contact.abn}) trading as {site.name}. Where we have signed a
              separate written agreement or proposal with you, that document
              takes precedence over these terms to the extent of any
              inconsistency.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2>Quotes and pricing</h2>
            <p>
              We quote a fixed price for a defined scope of work before starting.
              That price will not change unless you ask for something outside the
              agreed scope, in which case we will quote the additional work
              separately and in writing before doing it. You will never receive
              an invoice for work you did not agree to.
            </p>
            <p>
              Quotes are valid for 30 days. Unless stated otherwise, prices are
              in Australian dollars and exclude GST.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2>Payment</h2>
            <p>
              Unless agreed otherwise, we invoice a deposit before work begins
              and the balance on completion, with larger projects invoiced in
              agreed milestones. Invoices are payable within 14 days. Ongoing
              care and support plans are billed monthly or annually in advance
              and can be cancelled at any time with 30 days&rsquo; notice.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2>What you need to give us</h2>
            <p>
              Projects need input from you: content, images, product data,
              feedback on designs, and access to any accounts we need to work
              with. Timelines assume you provide these within a reasonable time.
              Where delays in providing materials push a project out, the
              timeline moves accordingly.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2>Ownership</h2>
            <p>
              On full payment, you own everything we create specifically for you,
              including source code, designs and content. Your domain names and
              your accounts with third-party providers are registered in your
              name and remain under your control at all times.
            </p>
            <p>
              We retain ownership of any general-purpose tools, libraries or
              components we developed before or independently of your project.
              Where these are used in your build, you receive a perpetual,
              irrevocable licence to use them as part of your system.
            </p>
            <p>
              Third-party software, plugins and services used in your project
              remain subject to their own licences.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2>Leaving</h2>
            <p>
              You can end an ongoing engagement at any time with 30 days&rsquo;
              notice. There are no exit fees. We will transfer all accounts,
              export your data in a usable format, and provide reasonable
              assistance briefing whoever takes over. Work completed up to the
              end of the notice period is payable.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2>Showing our work</h2>
            <p>
              We may reference your project in our portfolio and case studies. We
              will always ask you before publishing anything specific about your
              business, and we will not publish figures or quotes without your
              written approval. If you would rather we said nothing at all,
              that&rsquo;s fine — just tell us.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2>Warranties and liability</h2>
            <p>
              We will perform our services with due care and skill. We warrant
              that work we deliver will substantially conform to the agreed scope
              and, where we find defects in our own work within 30 days of
              delivery, we will fix them at no charge.
            </p>
            <p>
              Nothing in these terms excludes, restricts or modifies any
              guarantee, right or remedy you have under the Australian Consumer
              Law that cannot lawfully be excluded. To the extent permitted by
              law, our total liability arising from our services is limited to
              re-supplying the services or refunding the amount you paid for
              them, and we are not liable for indirect or consequential loss,
              including loss of profits or revenue.
            </p>
            <p>
              We are not responsible for outages, changes or failures in
              third-party services outside our control, including hosting
              providers, payment gateways, Google, and domain registrars.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2>Governing law</h2>
            <p>
              These terms are governed by the laws of{" "}
              {site.location.state === "VIC"
                ? "Victoria"
                : site.location.state}
              , Australia, and the parties submit to the non-exclusive
              jurisdiction of its courts.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2>Questions</h2>
            <p>
              Ask us — we&rsquo;d rather explain than have you agree to something
              you&rsquo;re unsure about. Email{" "}
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>{" "}
              or call{" "}
              <a href={`tel:${site.contact.phone}`}>
                {site.contact.phoneDisplay}
              </a>
              .
            </p>
          </section>
        </div>
      </Container>
    </>
  );
}
