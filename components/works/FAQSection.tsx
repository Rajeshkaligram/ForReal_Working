"use client";

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

export default function FAQSection() {
  const faqs = [
    {
      q: "What if the item is damaged?",
      a: "We cover damages with protection policy.",
    },
    {
      q: "What if my rental doesn't fit?",
      a: "You can return or exchange based on policy.",
    },
    { q: "How are items cleaned?", a: "All items are professionally cleaned." },
    {
      q: "Can I cancel booking?",
      a: "Yes, cancellation available before shipping.",
    },
    { q: "How long can I rent?", a: "Rental duration depends on product." },
    {
      q: "Do you provide delivery?",
      a: "Yes, delivery available in selected cities.",
    },
    { q: "Is payment secure?", a: "All payments are encrypted." },
    { q: "Can I list my clothes?", a: "Yes, owners can list items." },
    { q: "Do I need account?", a: "Yes, account required for booking." },
    { q: "Is support available?", a: "24/7 support available." },
  ];

  const [open, setOpen] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = faqs.filter((f) =>
    f.q.toLowerCase().includes(search.toLowerCase()),
  );

  const visibleFaqs = showAll ? filtered : filtered.slice(0, 7);

  return (
    <section className="py-8 md:py-32" id="FAQ">
      <div className="max-w-5xl mx-auto px-4">
        {/* TITLE */}
        <p className="sec_tagline">QUESTIONS</p>
        <h2 className="sec_title font-serif!">Everything you need to know.</h2>

        {/* SEARCH WITH ICON */}
        <div className="relative my-5 md:my-10">
          <Search
            size={18}
            className="absolute left-0 top-1/2 -translate-y-1/2 text-muted"
          />

          <input
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border-b border-border focus:border-primary bg-transparent py-3 pl-7 outline-none"
          />
        </div>

        {/* FAQ LIST */}
        {visibleFaqs.map((item, i) => (
          <div
            key={i}
            className="border-b border-border py-4 md:py-6 cursor-pointer"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <div className="flex justify-between items-center text-primary">
              <h3 className="text-sm md:text-base font-medium">{item.q}</h3>

              <ChevronDown
                size={18}
                className={`transition duration-300 text-muted ${
                  open === i ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* SMOOTH DROPDOWN */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                open === i ? "max-h-40 mt-4" : "max-h-0"
              }`}
            >
              <p className="text-muted text-sm max-w-xl">{item.a}</p>
            </div>
          </div>
        ))}

        <div className="border-b border-border" />

        {/* BUTTON */}
        <div className="text-center mt-8">
          {!showAll ? (
            <button
              onClick={() => setShowAll(true)}
              className="btn-transparent text-black! border border-primary! hover:bg-primary! hover:text-white! "
            >
              Show More
            </button>
          ) : (
            <button
              onClick={() => setShowAll(false)}
              className="btn-transparent text-black! border border-primary! hover:bg-primary! hover:text-white! "
            >
              Show Less
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
