import React from "react";
import FAQSection from "@/components/works/FAQSection";
import ForOwners from "@/components/works/ForOwners";
import ForRenters from "@/components/works/ForRenters";
import PricingStats from "@/components/works/PricingStats";
import ReadySection from "@/components/works/ReadySection";
import WardrobeHero from "@/components/works/WardrobeQuote";
import WorkHero from "@/components/works/WorkHero";

export default function work() {
  return (
    <>
      <WorkHero />
      <ForRenters />
      <WardrobeHero />
      <ForOwners />
      <PricingStats />
      <FAQSection />
      <ReadySection />
    </>
  );
}
