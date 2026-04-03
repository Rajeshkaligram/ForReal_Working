"use client";

import { Shield, CreditCard, Activity, Clock } from "lucide-react";

export default function WhySection() {
  const features = [
    {
      icon: Shield,
      title: "Verified users only",
      desc: "Every owner and renter is ID-verified. You're sharing your closet, or borrowing from one.",
    },
    {
      icon: CreditCard,
      title: "Secure payments",
      desc: "Payments are held until rental completion.",
    },
    {
      icon: Activity,
      title: "Quality, always",
      desc: "Every piece is reviewed before and after rental.",
    },
    {
      icon: Clock,
      title: "Earn while you sleep",
      desc: "Your wardrobe is an asset. Post it in minutes.",
    },
  ];

  return (
    <section className="bg-[rgb(18,43,43,0.85)] text-white py-8 md:py-32">
      <div className="max-w-7xl mx-auto text-center px-4">
        {/* Top Label */}
        <p className="text-xs text-secondary/70 tracking-[0.3em]text-muted mb-6">
          WHY FOREAL
        </p>

        {/* Heading */}
        <h2 className="sec_title mb-4 text-secondary!">
          Rent with confidence.
        </h2>

        {/* Subtitle */}
        <p className="text-secondary/70 max-w-xl mx-auto mb-8 md:mb-16 text-sm md:text-base leading-relaxed">
          We built FoReal because access to beautiful things shouldn't be a
          privilege. It should be a choice.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-2  md:grid-cols-4  gap-5  xl:gap-8">
          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex flex-col items-center text-center">
                <Icon className="w-6 h-6 text-offwhite mb-4" />

                <h3 className="font-semibold  text-xs md:text-sm mb-2">
                  {item.title}
                </h3>

                <p className="text-secondary/60 text-xs md:text-[13.2px] leading-relaxed ">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}