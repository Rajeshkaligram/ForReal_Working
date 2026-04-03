"use client";

import Section from "./Section";
import { ArrowBigRight, ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Arrow } from "radix-ui/internal";

export default function HelpSection() {
  const items = [
    { label: "Contact support", href: "/contact" },
    { label: "How it works", href: "/works" },
    { label: "Help center", href: "/contact" },
    { label: "Terms of service", href: "/terms" },
    { label: "Privacy policy", href: "/privacy" },
  ];

  return (
    <Section title="HELP">
      {items.map((item, i) => (
        <Link
          key={i}
          href={item.href}
          className="flex justify-between text-sm p-5 border-b border-border last:border-none hover:bg-muted/10 transition"
        >
          <p>{item.label}</p>
          <ArrowRight size={16} />
        </Link>
      ))}
    </Section>
  );
}
