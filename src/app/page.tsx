import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProofStats } from "@/components/sections/ProofStats";
import { CaseStudyFeature } from "@/components/sections/CaseStudyFeature";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { OwnershipPledge } from "@/components/sections/OwnershipPledge";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBand } from "@/components/sections/CtaBand";

/**
 * Section order is the argument the page makes, in sequence:
 * hook → credibility → what we do → scale → evidence → how it works →
 * de-risk → social proof → ask.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <ProofStats />
      <CaseStudyFeature />
      <ProcessTimeline />
      <OwnershipPledge />
      <Testimonials />
      <CtaBand />
    </>
  );
}
