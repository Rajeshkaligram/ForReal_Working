"use client";

interface CategoryProps {
  tags?: string[];
}

export default function Category({ tags }: CategoryProps) {
  const displayTags = tags && tags.length > 0 ? tags : [
    "WORK",
    "BUSINESS CASUAL",
    "DATE NIGHT",
    "SMART CASUAL",
    "WEEKEND DINNER"
  ];

  return (
    <div className="bg-[#FAF9F8] border border-border p-6 md:p-8 mt-6">
      <p className="text-[10px] tracking-[0.3em] text-muted mb-5">PERFECT FOR</p>
      <div className="flex flex-wrap gap-2 md:gap-3">
        {displayTags.map((tag, i) => (
          <div
            key={i}
            className="border border-gray-200 px-4 py-2 text-[10px] md:text-[11px] font-medium tracking-[0.05em] text-gray-500 bg-[#F5F5F5] hover:bg-white hover:border-gray-300 transition-colors cursor-pointer"
          >
            {tag.toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  );
}
