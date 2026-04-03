"use client";

import { useState } from "react";
import { X, MapPin, Check, Search } from "lucide-react";

type Location = {
  city: string;
  country: string;
  region: string;
};

const LOCATIONS: Location[] = [
  { city: "Paris", country: "France", region: "Europe" },
  { city: "London", country: "United Kingdom", region: "Europe" },
  { city: "Berlin", country: "Germany", region: "Europe" },
  { city: "Madrid", country: "Spain", region: "Europe" },
  { city: "Rome", country: "Italy", region: "Europe" },
  { city: "Amsterdam", country: "Netherlands", region: "Europe" },
];

export default function LocationModal({
  open,
  onClose,
  selected,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  selected: string;
  onSelect: (value: string) => void;
}) {
  const [search, setSearch] = useState("");

  if (!open) return null;

  const filtered = LOCATIONS.filter((loc) =>
    `${loc.city} ${loc.country}`.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 space-y-5 shadow-lg mx-4">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-sm tracking-widest font-medium">
            CHANGE LOCATION
          </h2>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* SEARCH */}
        <div className="flex items-center border rounded-lg px-3 py-3 gap-2 bg-offwhite">
          <Search size={16} className="text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search location"
            className="w-full outline-none text-sm"
          />
        </div>

        {/* LIST */}
        <div className="max-h-75 overflow-y-auto space-y-2 pr-1">
          {filtered.length === 0 && (
            <p className="text-sm text-muted text-center py-4">
              No locations found
            </p>
          )}

          {filtered.map((loc, i) => {
            const value = `${loc.city}, ${loc.country}`;
            const isActive = selected === value;

            return (
              <div
                key={i}
                onClick={() => {
                  onSelect(value);
                  onClose();
                }}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition ${
                  isActive ? "bg-offwhite" : "hover:bg-muted/10"
                }`}
              >
                {/* LEFT */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full ${
                      isActive
                        ? "bg-black text-white"
                        : "bg-muted/20 text-muted"
                    }`}
                  >
                    <MapPin size={16} />
                  </div>

                  <div>
                    <p className="text-sm font-medium">{loc.city}</p>
                    <p className="text-xs text-muted">
                      {loc.country} • {loc.region}
                    </p>
                  </div>
                </div>

                {/* RIGHT */}
                {isActive && <Check size={18} className="text-black" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
