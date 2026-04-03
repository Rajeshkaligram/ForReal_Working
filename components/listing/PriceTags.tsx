"use client";

import { useState } from "react";

export default function PriceTags() {
  const tags = [
    "Work",
    "Vacation",
    "Beach",
    "Wedding",
    "Party",
    "Casual",
    "Formal",
    "Date Night",
    "Brunch",
    "Festival",
  ];

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <div className="space-y-5">
      {/* TITLE */}
      <div className="space-y-2">
        <p className="text-[11px] tracking-[0.25em] uppercase text-muted font-semibold">
          Occasion Tags
        </p>

        <p className="text-sm text-muted">
          Help renters find your piece — select all occasions that fit.
        </p>
      </div>

      {/* TAG GRID */}
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => {
          const isActive = selectedTags.includes(tag);

          return (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={`px-5 py-3 text-xs tracking-wide uppercase border transition cursor-pointer
              ${
                isActive
                  ? "bg-black text-white border-black"
                  : "border border-border text-muted  hover:bg-muted/10"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}
