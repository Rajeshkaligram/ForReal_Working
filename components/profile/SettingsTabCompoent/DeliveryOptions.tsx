"use client";

import { useState } from "react";

export default function DeliveryOptions() {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [values, setValues] = useState([
    "12 Portobello Road, London W11 2ED",
    "Same as shipping address",
    "Standard shipping (3–5 business days)",
    "Prepaid return label included with all rentals",
  ]);

  const titles = [
    "Shipping address",
    "Pickup location",
    "Default delivery method",
    "Return preferences",
  ];

  const handleChange = (index: number, value: string) => {
    const updated = [...values];
    updated[index] = value;
    setValues(updated);
  };

  return (
    <>
    <p className="text-xs tracking-widest text-muted font-medium uppercase mb-3">Delivery options</p>
   
      <section title="">
        <div className="bg-white border border-border">
          {titles.map((title, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-6 py-5 border-b border-border last:border-none"
            >
              {/* LEFT */}
              <div className="flex items-center gap-6 w-full flex-wrap">
                {/* LABEL */}
                <p className="text-[11px] uppercase cusror-pointer tracking-[2.5px] text-muted min-w-45">
                  {title}
                </p>

                {/* VALUE / INPUT */}
                {editIndex === index ? (
                  <input
                    value={values[index]}
                    onChange={(e) => handleChange(index, e.target.value)}
                    className="w-full border border-border px-3 py-2 text-[13px] text-foreground outline-none bg-white"
                  />
                ) : (
                  <p className="text-[13px] text-foreground leading-relaxed">
                    {values[index]}
                  </p>
                )}
              </div>

              {/* RIGHT */}
              {editIndex === index ? (
                <div className="flex gap-4 ml-4 whitespace-nowrap">
                  <button
                    onClick={() => setEditIndex(null)}
                    className="text-[11px] uppercase cusror-pointer tracking-[2.5px] text-black"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditIndex(null)}
                    className="text-[11px] uppercase cusror-pointer tracking-[2.5px] text-muted"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setEditIndex(index)}
                  className="text-[11px] uppercase cusror-pointer tracking-[2.5px] text-muted hover:text-black"
                >
                  Edit
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
