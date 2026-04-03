"use client";

import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative py-8 md:py-32 px-4 overflow-hidden  border-t border-border">
      {/* Background Watermark */}
      <h1
        className="absolute inset-0 flex items-center justify-center 
text-[clamp(8rem,24vw,22rem)] 
font-normal text-[rgba(20,20,20,0.04)] 
tracking-[-0.02em] whitespace-nowrap 
 montserrat"
      >
        FoReal
      </h1>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Top Label */}
        <p className="text-xs tracking-[0.3em] text-muted mb-6">START TODAY</p>

        {/* Heading */}
        <h2 className="text-[clamp(2.5rem,6vw,5rem)]! sec_title ">
          Your next outfit <br /> awaits.
        </h2>

        {/* Subtitle */}
        <p className="text-muted text-[14.4px]  max-w-90 mx-auto my-8 md:my-10 leading-relaxed">
          Browse thousands of pieces, or turn your wardrobe into income. Either
          way, you're exactly where fashion belongs.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-5 md:mt-10">
          {/* Primary */}
          <Link href="" className="btn-bg">
            Start Browsing
          </Link>

          {/* Secondary */}
          <Link
            href="/listing"
            className="btn-transparent border-border! border text-primary! hover:bg-muted/10!  hover:border-primary! transition-all duration-200"
          >
            Start Posting
          </Link>
        </div>
      </div>
    </section>
  );
}
