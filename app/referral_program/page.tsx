import BenefitsSection from "@/components/referral/BenefitsSection";
import HowItWorks from "@/components/referral/HowItWorks";
import ReferralQuoteSection from "@/components/referral/ReferralQuoteSection";
import ReferralSection from "@/components/referral/ReferralSection";
import React from "react";

export default function ReferralProgram() {
  return (
    <>
      <ReferralSection />
      <ReferralQuoteSection />
      <HowItWorks />
      <BenefitsSection />
    </>
  );
}
