"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useListingContext } from "./ListingContext";
import { productsAPI } from "@/lib/api";

export default function DetailsForm() {
  const { formData, updateData, cleaningEnabled } = useListingContext();
  const [dbCategories, setDbCategories] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    productsAPI.categories().then((res) => {
      if (res.data?.categories) setDbCategories(res.data.categories);
    }).catch(console.error);
  }, []);

  const sizes = ["Extra Small", "Small", "Medium", "Large", "Extra Large"];
  const seasons = ["Spring", "Summer", "Fall", "Winter"];
  const conditions = ["Pristine", "Excellent", "Very Good", "Good", "Like New", "Slightly Worn", "Still Looks Good"];
  const cancellations = [
    "Aggressive (Item may be cancelled without penalty 9 days and up prior the rental period)",
    "Moderate (Item may be cancelled without penalty 6-8 days prior the rental period)"
  ];
  const alterations = ["Yes", "No"];

  return (
    <div className="space-y-4 md:space-y-8">
      <p className="text-[11px] tracking-[0.25em] uppercase text-muted">
        Piece details
      </p>

      <Input 
        label="Piece name" 
        placeholder="e.g. Jacquemus bag" 
        value={formData.name} 
        onChange={(v) => updateData({ name: v })} 
      />
      <Input 
        label="Designer / Brand" 
        placeholder="e.g. Jacquemus" 
        value={formData.designer} 
        onChange={(v) => updateData({ designer: v })} 
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <CustomSelect 
          label="Category" 
          options={dbCategories.map(c => c.name)} 
          selected={dbCategories.find(c => c.id.toString() === formData.category_id)?.name || ""} 
          onSelect={(opt) => {
            const match = dbCategories.find(c => c.name === opt);
            if (match) updateData({ category_id: match.id.toString() });
          }} 
        />
        <CustomSelect 
          label="Size" 
          options={sizes} 
          selected={formData.size} 
          onSelect={(v) => updateData({ size: v })} 
        />
        <Input 
          label="Color" 
          placeholder="e.g. Green" 
          value={formData.color} 
          onChange={(v) => updateData({ color: v })} 
        />
        <CustomSelect 
          label="Season" 
          options={seasons} 
          selected={formData.season} 
          onSelect={(v) => updateData({ season: v })} 
        />
        <CustomSelect 
          label="Alteration" 
          options={alterations} 
          selected={formData.alteration} 
          onSelect={(v) => updateData({ alteration: v })} 
        />
      </div>

      {/* CONDITION */}
      <div className="space-y-2">
        <p className="text-[11px] tracking-[0.25em] uppercase text-muted">
          Condition
        </p>

        <div className="flex gap-2 flex-wrap">
          {conditions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => updateData({ condition: item })}
              className={`px-4 py-2 text-xs border transition cursor-pointer
              ${
                formData.condition === item
                  ? "bg-black text-white border-black"
                  : "border-border text-muted hover:border-black"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-[11px] tracking-[0.25em] uppercase text-muted">
          Cancellation Policy
        </p>
        <CustomSelect 
          label="" 
          options={cancellations} 
          selected={formData.cancellation} 
          onSelect={(v) => updateData({ cancellation: v })} 
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input type="number" label="Price per day ($)" placeholder="0" value={formData.price} onChange={(v) => updateData({ price: v })} />
        <Input type="number" label="Retail price ($)" placeholder="0" value={formData.retail_price} onChange={(v) => updateData({ retail_price: v })} />
        {cleaningEnabled && (
          <Input type="number" label="Cleaning fee ($)" placeholder="0" value={formData.cleaning_price} onChange={(v) => updateData({ cleaning_price: v })} />
        )}
      </div>

      <textarea
        className="w-full border border-border p-4 text-sm h-32 focus:border-black outline-none"
        placeholder="Describe the piece..."
        value={formData.description}
        onChange={(e) => updateData({ description: e.target.value })}
      />
    </div>
  );
}

/* INPUT */
function Input({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (val: string) => void;
}) {
  return (
    <div>
      {label && (
        <p className="text-[11px] uppercase tracking-[0.25em] text-muted mb-2">
          {label}
        </p>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value || ""}
        onChange={(e) => onChange && onChange(e.target.value)}
        className="w-full border border-border px-3 py-3 text-sm focus:border-black outline-none"
      />
    </div>
  );
}

/* CUSTOM SELECT */
function CustomSelect({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: string[];
  selected?: string;
  onSelect?: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {label && (
        <p className="text-[11px] uppercase tracking-[0.25em] text-muted mb-2">
          {label}
        </p>
      )}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full border border-border px-3 py-3 text-sm flex justify-between items-center text-left"
      >
        <span className={selected ? "text-black truncate pr-4" : "text-muted"}>
          {selected || "Select"}
        </span>
        <ChevronDown size={16} className="flex-shrink-0" />
      </button>

      {open && (
        <div className="absolute z-20 w-full bg-white border border-border mt-1 shadow-sm max-h-48 overflow-y-auto">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                if (onSelect) onSelect(opt);
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
