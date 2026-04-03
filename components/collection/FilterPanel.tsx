"use client";

import { useState } from "react";
import { CalendarDays, MapPin } from "lucide-react";

type Props = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function FilterPanel({ show, setShow }: Props) {
  const [activeStyle, setActiveStyle] = useState<string | null>(null);
  const [activeSize, setActiveSize] = useState<string | null>(null);
  const [activePrice, setActivePrice] = useState<string | null>(null);
  const [activeSort, setActiveSort] = useState<string>("Trending");

  return (
    <div
      className={`w-80 sm:w-100 max-h-[80vh] bg-secondary p-6  text-primary text-xs
      shadow-xl border border-border overflow-y-auto
      transition-all duration-200
      ${show ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      {/* TITLE */}
      <h2 className=" tracking-[0.2em]  mb-3 md:mb-5">FILTER & SORT</h2>

      {/* RENTAL */}
      <div className="mb-3 md:mb-5">
        <div className="flex items-center gap-2  tracking-wider text-muted mb-3">
          <CalendarDays size={14} />
          RENTAL DATES
        </div>

        <div className="flex gap-2">
          <div className="">
            <label className="tracking-wider text-muted">Form</label>
            <input
              placeholder="dd-mm-yyyy"
              className="input p-2.5 border-border border focus:border-primary outline-0  w-full bg-white mt-2 "
            />
          </div>
          <div className="">
            {" "}
            <label className="tracking-wider text-muted">To</label>
            <input
              placeholder="dd-mm-yyyy"
              className="input p-2.5 border-border border focus:border-primary outline-0  w-full bg-white mt-2 "
            />
          </div>
        </div>
      </div>

      <hr className="mb-3 md:mb-5 border-.2 border-border" />

      {/* LOCATION */}
      <div className="mb-3 md:mb-5">
        <div className="flex items-center gap-2  tracking-wider text-muted mb-3">
          <MapPin size={14} />
          LOCATION
        </div>

        <input
          placeholder="Search city or Location"
          className="input p-2.5 border-border border focus:border-primary outline-0  w-full bg-white "
        />
      </div>

      <hr className="mb-3 md:mb-5 border-.2 border-border" />

      <Section title="STYLE">
        {["Minimalist", "Romantic", "Statement", "Classic"].map((item) => (
          <FilterBtn
            key={item}
            label={item}
            active={activeStyle === item}
            onClick={() => setActiveStyle(item)}
          />
        ))}
      </Section>

      <hr className="my-6 border-.2 border-border" />

      <Section title="SIZE">
        {["XS", "S", "M", "L", "XL"].map((item) => (
          <FilterBtn
            key={item}
            label={item}
            active={activeSize === item}
            onClick={() => setActiveSize(item)}
          />
        ))}
      </Section>

      <hr className="my-6 border-.2 border-border" />

      <Section title="PRICE">
        {["Under €30", "€30–€50", "€50–€80", "€80+"].map((item) => (
          <FilterBtn
            key={item}
            label={item}
            active={activePrice === item}
            onClick={() => setActivePrice(item)}
          />
        ))}
      </Section>

      <hr className="my-6 border-.2 border-border" />

      <Section title="SORT BY">
        {["Trending", "Newest", "Low to High", "High to Low"].map((item) => (
          <FilterBtn
            key={item}
            label={item}
            active={activeSort === item}
            onClick={() => setActiveSort(item)}
          />
        ))}
      </Section>
    </div>
  );
}

/* ---------- small components ---------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className=" tracking-wider text-muted mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterBtn({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 border  transition cursor-pointer
        ${
          active
            ? "bg-black text-white border-black"
            : "border-boreder border text-muted hover:border-black"
        }`}
    >
      {label}
    </button>
  );
}
