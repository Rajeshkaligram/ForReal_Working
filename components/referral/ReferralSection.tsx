"use client";

import { Copy } from "lucide-react";
import { useState } from "react";

export default function ReferralSection() {
  const [copied, setCopied] = useState(false);

  const referralLink = "https://foreal.com/join/FOREAL-MIALECLAIR";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-8 md:py-32">
      <div className="container-md mx-auto px-4 ">
        <div className=" flex-col flex gap-4 md:gap-10">
          <p className="sec_tagline">Referral Program</p>

          <h1 className="text-2xl md:text-4xl md:text-7xl font-serif font-medium">
            Share the access.
            <span className="block italic">Earn the rewards.</span>
          </h1>

          <p className="text-muted text-base md:text-lg max-w-xl leading-snug">
            When you invite friends to FoReal, you're not just sharing a
            platform — you're opening the door to luxury fashion for people who
            deserve it. And we reward that. €25 in credits for you. €25 for
            them. Every time.
          </p>
        </div>

        <div className="border border-border bg-muted/10 p-3 sm:p-6 md:p-12 mt-8 md:mt-16">
          <p className="sec_tagline text-center mb-6">Your Unique Link</p>

          {/* LINK + COPY */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center justify-center">
            <div className="flex-1 border border-border px-4 py-4 text-xs md:text-sm truncate bg-white">
              {referralLink}
            </div>

            <button
              onClick={handleCopy}
              className="flex items-cente cursor-pointer justify-center gap-2 px-6 py-4 bg-black text-white text-sm tracking-wide hover:opacity-90 transition"
            >
              <Copy size={16} />
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-2 text-center mt-8 md:mt-16">
            <div>
              <h2 className=" text-xl sm:text-2xl md:text-4xl font-serif">8</h2>
              <p className="text-xs  tracking-widest mt-2 text-muted font-semibold">
                FRIENDS INVITED
              </p>
            </div>

            <div>
              <h2 className=" text-xl sm:text-2xl md:text-4xl font-serif">5</h2>
              <p className="text-xs  tracking-widest mt-2 text-muted font-semibold">
                FRIENDS JOINED
              </p>
            </div>

            <div>
              <h2 className=" text-xl sm:text-2xl md:text-4xl font-serif">€125</h2>
              <p className="text-xs  tracking-widest mt-2 text-muted font-semibold">
                CREDITS EARNED
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
