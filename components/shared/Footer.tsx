"use client";

import { Instagram, Linkedin, Github, Music2 } from "lucide-react";
import Link from "next/link";

export default function Footer() {

  return (
    <footer className="bg-primary text-offwhite/80 pt-8 md:pt-16 pb-4 md:pb-8 text-xs md:text-sm">
      <div className="container">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-10">
          {/* Logo */}
          <div>
            <h2 className="text-white text-2xl font-normal montserrat">
              FoReal
            </h2>
            <p className="mt-3 text-sm text-offwhite text-[12.8px] ">
              Real, for the moment
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-offwhite uppercase text-[9.6px] tracking-widest mb-5">
              Platform
            </h3>

            <ul className="space-y-2 md:space-y-4  flex flex-col text-[12.8px]">
              <Link
                href="/discover"
                className="hover:text-white cursor-pointer"
              >
                Browse
              </Link>
              <Link href="/listing" className="hover:text-white cursor-pointer">
                Post a piece
              </Link>
              <Link href="/works" className="hover:text-white cursor-pointer">
                How it works
              </Link>
              <Link
                href="/style_guides"
                className="hover:text-white cursor-pointer"
              >
                Style Guides
              </Link>
              <Link
                href="/referral_program"
                className="hover:text-white cursor-pointer"
              >
                Referral Program
              </Link>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-offwhite uppercase text-[9.6px] tracking-widest mb-5">
              Company
            </h3>

            <ul className="space-y-2 md:space-y-4 flex flex-col text-[12.8px]">
              <Link href="/about" className="hover:text-white cursor-pointer">
                About
              </Link>
              <Link
                href="/works#FAQ"
                className="hover:text-white cursor-pointer"
              >
                FAQ
              </Link>
              <Link href="/contact" className="hover:text-white cursor-pointer">
                Contact
              </Link>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-offwhite uppercase text-[9.5  px] tracking-widest mb-5">
              Legal
            </h3>

            <ul className="space-y-2 md:space-y-4 flex flex-col text-[12.8px]">
              <Link href="/privacy" className="hover:text-white cursor-pointer">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-white cursor-pointer">
                Terms
              </Link>
              <Link
                href="/cookie-policy"
                className="hover:text-white cursor-pointer"
              >
                Cookie policy
              </Link>
              <Link href="/safty" className="hover:text-white cursor-pointer">
                Safety
              </Link>
              <Link
                href="/return-policy"
                className="hover:text-white cursor-pointer"
              >
                Return policy
              </Link>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11.52px] text-offwhite">
            © 2026 FoReal. All rights reserved.
          </p>

          {/* Icons */}
          <div className="flex gap-6 text-offwhite ">
            <Instagram size={18} className="hover:text-white cursor-pointer " />
            <Music2 size={18} className="hover:text-white cursor-pointer " />
            <Github size={18} className="hover:text-white cursor-pointer " />
            <Linkedin size={18} className="hover:text-white cursor-pointer " />
          </div>
        </div>
      </div>
    </footer>
  );
}
