"use client";

import Section from "./Section";
import { Shield, Mail, Phone, AlertCircle } from "lucide-react";

export default function IdentityVerification({
  onVerify,
}: {
  onVerify: (type: "email" | "phone") => void;
}) {
  return (
    <Section title="IDENTITY VERIFICATION">
      <div className="border border-border rounded-md overflow-hidden ">
        {/* HEADER */}
        <div className="flex gap-4 px-6 py-5 border-b border-border bg-muted/10">
          <div className="w-11 h-11 flex items-center justify-center rounded-full bg-offwhite">
            <Shield size={18} className="text-muted" />
          </div>

          <div>
            <p className="text-[15px] font-medium text-black/70">
              Identity Verification
            </p>
            <p className="text-[12px] text-muted mt-1">
              Verify your identity to build trust
            </p>

            <p className="text-[12px] text-muted mt-3 max-w-130 leading-relaxed">
              Verified accounts build trust with the community. Verify your
              email and phone number to show others you're a real person.
            </p>
          </div>
        </div>

        {/* EMAIL */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border bg-white">
          <div className="flex gap-4 items-center">
            <div className="w-11 h-11 flex items-center justify-center rounded-full bg-offwhite ">
              <Mail size={18} className="text-muted" />
            </div>

            <div>
              <p className="text-[13px] font-medium text-black/70">
                Email Address
              </p>
              <p className="text-[12px] text-muted mt-1">mia@foreal.co</p>
            </div>
          </div>

          <button
            onClick={() => onVerify("email")}
            className="border border-black cursor-pointer rounded-md px-4 py-1.5 text-[12px] text-black hover:bg-black hover:text-white transition"
          >
            Verify Email
          </button>
        </div>

        {/* PHONE */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div className="flex gap-4 items-center">
            <div className="w-11 h-11 flex items-center justify-center rounded-full bg-offwhite">
              <Phone size={18} className="text-muted" />
            </div>

            <div>
              <p className="text-[13px] font-medium text-black/70">Phone Number</p>
              <p className="text-[12px] text-muted mt-1">+44 7700 900000</p>
            </div>
          </div>

          <button
            onClick={() => onVerify("phone")}
            className="border border-black cursor-pointer rounded-md px-4 py-1.5 text-[12px] text-black hover:bg-black hover:text-white transition"
          >
            Verify Phone
          </button>
        </div>

        {/* FOOTER INFO */}
        <div className="flex gap-3 items-start px-6 py-4 bg-[#f7f4ef]">
          <AlertCircle size={18} className="text-[#d48a1f] mt-0.5" />

          <p className="text-[12px] text-muted leading-relaxed">
            <span className="text-black font-medium">Why verify?</span> Verified
            accounts have higher trust scores, get better placement in search
            results, and renters are more likely to book from verified owners.
          </p>
        </div>
      </div>
    </Section>
  );
}
