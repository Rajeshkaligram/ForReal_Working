import CTASection from "@/components/home/CTASection";
import Hero from "@/components/home/Hero";
import Process from "@/components/home/ProcessSection";
import ProductSlider from "@/components/home/ProductSlider";
import WhySection from "@/components/home/WhySection";
import React from "react";

export default function Home() {
  return (
    <>
      <Hero />
      <Process />
      <WhySection/>
      <ProductSlider/>
      <CTASection/>
      
    </>
  );
}
