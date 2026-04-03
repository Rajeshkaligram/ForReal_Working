"use client";

import { useState } from "react";
import { Search, Star } from "lucide-react";

export default function CleaningPanel() {
  const [selectedCleaner, setSelectedCleaner] = useState<any>(null);

  return (
    <div className="space-y-8 border-t border-border pt-6">
      {/* HEADER */}
      <div>
        <h2 className="text-xl font-serif">Offer Professional Cleaning</h2>
        <p className="text-sm text-muted mt-2 max-w-xl">
          Let renters receive your item fresh, clean, and ready to wear. Choose
          a nearby professional cleaner and add a fair cleaning fee.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT */}
        <div className="space-y-6">
          {selectedCleaner ? (
            <div className="border border-border p-5 space-y-4 bg-muted/10">
              <p className="text-[11px] tracking-[0.25em] uppercase text-muted">
                Selected Cleaner
              </p>

              <h3 className="text-lg font-medium">{selectedCleaner.name}</h3>

              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted text-xs uppercase">Estimated Cost</p>
                  <p>{selectedCleaner.price}</p>
                </div>

                <div>
                  <p className="text-muted text-xs uppercase">
                    Recommended Cleaning Fee
                  </p>
                  <p>€16</p>
                </div>

                <div>
                  <p className="text-muted text-xs uppercase">Turnaround</p>
                  <p>{selectedCleaner.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="bg-black text-white px-4 py-2 text-xs tracking-wide">
                  ✓ PROFESSIONAL CLEANING INCLUDED
                </button>

                <button
                  onClick={() => setSelectedCleaner(null)}
                  className="text-xs underline text-muted"
                >
                  CHANGE CLEANER
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* ORIGINAL PRICE UI */}
              <div className="space-y-4">
                <div>
                  <p className="text-[11px] tracking-[0.25em] uppercase text-muted">
                    Estimated cleaner price
                  </p>
                  <p className="text-xl md:text-2xl font-medium mt-1">
                    €14 – €18
                  </p>
                </div>

                <div>
                  <p className="text-[11px] tracking-[0.25em] uppercase text-muted">
                    Recommended renter charge
                  </p>
                  <p className="text-xl font-medium mt-1">€16</p>
                  <p className="text-xs text-muted mt-1">
                    We recommend charging close to the cleaner's price.
                  </p>
                </div>
              </div>

              {/* BREAKDOWN */}
              <div className="border border-border p-5 space-y-3 text-sm bg-muted/10">
                <p className="text-[11px] tracking-[0.25em] uppercase text-muted">
                  Price breakdown
                </p>

                <div className="flex justify-between">
                  <span>Cleaner cost</span>
                  <span>€15</span>
                </div>

                <div className="flex justify-between">
                  <span>Recommended fee</span>
                  <span>€16</span>
                </div>

                <div className="border-t pt-3 flex justify-between font-medium">
                  <span>Your earnings after platform fee</span>
                  <span>€14.20</span>
                </div>

                <button className="mt-3 bg-black text-white px-4 py-2 text-xs tracking-wide">
                  ✓ FAIR PRICE
                </button>
              </div>
            </>
          )}
        </div>

        {/* RIGHT */}
        <div className="space-y-4 bg-white p-4 border border-border">
          {/* SEARCH */}
          <div className="border border-border px-3 py-2 flex items-center gap-2">
            <Search size={16} className="text-muted" />
            <input
              placeholder="Search for cleaners near address"
              className="w-full text-sm outline-none"
            />
          </div>

          {/* MAP */}
          <div className="h-40 bg-muted/20 flex items-center justify-center text-xs text-muted">
            Map preview here
          </div>

          {/* LIST */}
          <div className="max-h-87.5 overflow-y-auto space-y-4">
            <p className="text-[11px] tracking-[0.25em] uppercase text-muted">
              Nearby Cleaners
            </p>

            <CleanerCard
              name="Blanche Pressing"
              distance="1.8 km away"
              price="€14 – €18"
              time="24–48 hours"
              rating="4.7"
              selected={selectedCleaner?.name === "Blanche Pressing"}
              onSelect={() =>
                setSelectedCleaner({
                  name: "Blanche Pressing",
                  price: "€15",
                  time: "24–48 hours",
                })
              }
            />

            <CleanerCard
              name="Pressing Luxe Paris"
              distance="2.3 km away"
              price="€15 – €20"
              time="24 hours"
              rating="4.9"
              selected={selectedCleaner?.name === "Pressing Luxe Paris"}
              onSelect={() =>
                setSelectedCleaner({
                  name: "Pressing Luxe Paris",
                  price: "€16",
                  time: "24 hours",
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* CLEANER CARD */
function CleanerCard({
  name,
  distance,
  price,
  time,
  rating,
  onSelect,
  selected,
}: any) {
  return (
    <div
      className={`border border-border p-4 space-y-3 ${
        selected ? "border-black" : ""
      }`}
    >
      <div className="flex justify-between items-center">
        <p className="font-medium text-sm">{name}</p>
        <div className="flex items-center gap-1 text-xs">
          <Star size={12} className="text-yellow-500" />
          {rating}
        </div>
      </div>

      <p className="text-xs text-muted">{distance}</p>

      <div className="flex justify-between text-xs">
        <div>
          <p className="text-muted uppercase tracking-widest text-[10px]">
            Estimated price
          </p>
          <p>{price}</p>
        </div>

        <div>
          <p className="text-muted uppercase tracking-widest text-[10px]">
            Turnaround
          </p>
          <p>{time}</p>
        </div>
      </div>

      <button
        onClick={onSelect}
        className={`w-full py-2 text-xs tracking-wide cursor-pointer
        ${
          selected
            ? "bg-black text-white"
            : "border border-border hover:bg-muted/10"
        }`}
      >
        {selected ? "SELECTED" : "SELECT CLEANER"}
      </button>
    </div>
  );
}
