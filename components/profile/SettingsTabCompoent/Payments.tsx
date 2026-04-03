"use client";

import { ChevronDown } from "lucide-react";
import Section from "./Section";
import { useState } from "react";

export default function Payments() {
  const [openCards, setOpenCards] = useState(false);
  const [editPayout, setEditPayout] = useState(false);

  const [cards, setCards] = useState([
    {
      id: 1,
      type: "Visa",
      number: "••4242",
      expiry: "12/2026",
      default: true,
    },
    {
      id: 2,
      type: "Mastercard",
      number: "••8765",
      expiry: "09/2027",
      default: false,
    },
  ]);

  const [payout, setPayout] = useState("Bank ••••3456");

  const [currency, setCurrency] = useState("USD ($)");
  const [openCurrency, setOpenCurrency] = useState(false);

  const currencies = ["USD ($)", "EUR (€)", "GBP (£)", "INR (₹)"];

  const setDefault = (id: number) => {
    setCards((prev) =>
      prev.map((c) => ({
        ...c,
        default: c.id === id,
      }))
    );
  };

  const removeCard = (id: number) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <Section title="PAYMENTS">
      
      {/* PAYMENT METHODS */}
      <div
        onClick={() => setOpenCards(!openCards)}
        className="flex justify-between items-center px-5 py-4 border-b border-border cursor-pointer"
      >
        <div>
          <p className="text-[11px] uppercase tracking-[2.5px] text-muted">
            Payment methods
          </p>
          <p className="text-[13px]">{cards.length} cards saved</p>
        </div>

        <p className="text-[11px] uppercase text-muted">
          {openCards ? "Done" : "Manage"}
        </p>
      </div>

      {/* CARD LIST */}
      {openCards && (
        <div className="px-5 py-4 space-y-4 border-b border-border bg-[#fafafa]">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`p-4 border ${
                card.default ? "border-black bg-white" : "border-border bg-white"
              }`}
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-[14px] font-medium">
                    {card.type} {card.number}
                    {card.default && (
                      <span className="ml-2 text-[10px] px-2 py-[2px] border border-border">
                        DEFAULT
                      </span>
                    )}
                  </p>
                  <p className="text-[12px] text-muted mt-1">
                    Expires {card.expiry}
                  </p>
                </div>

                <div className="flex gap-4 text-[11px] uppercase tracking-[2px]">
                  {!card.default && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDefault(card.id);
                      }}
                      className="text-black"
                    >
                      Set Default
                    </button>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeCard(card.id);
                    }}
                    className="text-muted"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAYOUT ACCOUNT */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center w-full gap-6">
          <p className="text-[11px] uppercase tracking-[2.5px] text-muted min-w-[160px]">
            Payout account
          </p>

          {!editPayout ? (
            <p className="text-[13px] text-foreground">{payout}</p>
          ) : (
            <input
              value={payout}
              onChange={(e) => setPayout(e.target.value)}
              className="w-full border border-border px-3 py-2 text-[13px] outline-none"
            />
          )}
        </div>

        {!editPayout ? (
          <button
            onClick={() => setEditPayout(true)}
            className="text-[11px] uppercase tracking-[2.5px] text-muted"
          >
            Edit
          </button>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={() => setEditPayout(false)}
              className="text-[11px] uppercase text-black"
            >
              Save
            </button>
            <button
              onClick={() => setEditPayout(false)}
              className="text-[11px] uppercase text-muted"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* CURRENCY */}
      <div className="flex items-center px-5 py-4 gap-6">
        <p className="text-[11px] uppercase tracking-[2.5px] text-muted min-w-[160px]">
          Currency
        </p>

        <div className="relative w-full">
          <div
            onClick={() => setOpenCurrency(!openCurrency)}
            className="border border-border px-4 py-3 text-[13px] cursor-pointer flex justify-between"
          >
            {currency}
            <span className="text-muted"><ChevronDown size={16}/></span>
          </div>

          {openCurrency && (
            <div className="absolute left-0 w-full border border-border bg-white mt-1 z-10">
              {currencies.map((c, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setCurrency(c);
                    setOpenCurrency(false);
                  }}
                  className={`px-4 py-2 text-[13px] cursor-pointer hover:bg-offwhite ${
                    currency === c ? "bg-muted/10 text-primary" : ""
                  }`}
                >
                  {c}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}