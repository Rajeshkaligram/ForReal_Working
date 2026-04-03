"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function DetailsForm() {
  const categories = ["Dress", "Top", "Bag", "Shoes"];
  const sizes = ["XS", "S", "M", "L", "XL"];
  const colors = ["Black", "White", "Red", "Blue"];

  const [condition, setCondition] = useState("Good");

  return (
    <div className="space-y-4 md:space-y-8">
      <p className="text-[11px] tracking-[0.25em] uppercase text-muted">
        Piece details
      </p>

      <Input label="Piece name" placeholder="e.g. Jacquemus bag" />
      <Input label="Designer / Brand" placeholder="e.g. Jacquemus" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CustomSelect label="Category" options={categories} />
        <CustomSelect label="Size" options={sizes} />
        <CustomSelect label="Color" options={colors} />
      </div>

      {/* CONDITION */}
      <div className="space-y-2">
        <p className="text-[11px] tracking-[0.25em] uppercase text-muted">
          Condition
        </p>

        <div className="flex gap-2 flex-wrap">
          {["Pristine", "Excellent", "Very Good", "Good"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCondition(item)}
              className={`px-4 py-2 text-xs border transition cursor-pointer
              ${
                condition === item
                  ? "bg-black text-white border-black"
                  : "border-border text-muted hover:border-black"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input type="number" label="Price per day ($)" placeholder="0" />
        <Input type="number" label="Retail price ($)" placeholder="0" />
      </div>

      <textarea
        className="w-full border border-border p-4 text-sm h-32 focus:border-black outline-none"
        placeholder="Describe the piece..."
      />
    </div>
  );
}

/* INPUT */
function Input({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.25em] text-muted mb-2">
        {label}
      </p>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border border-border px-3 py-3 text-sm focus:border-black outline-none"
      />
    </div>
  );
}

/* CUSTOM SELECT */
function CustomSelect({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  return (
    <div className="relative">
      <p className="text-[11px] uppercase tracking-[0.25em] text-muted mb-2">
        {label}
      </p>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full border border-border px-3 py-3 text-sm flex justify-between items-center"
      >
        <span className={selected ? "text-black" : "text-muted"}>
          {selected || "Select"}
        </span>
        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="absolute z-20 w-full bg-white border border-border mt-1 shadow-sm">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                setSelected(opt);
                setOpen(false);
              }}
              className="px-3 py-2 text-sm cursor-pointer hover:bg-border"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
