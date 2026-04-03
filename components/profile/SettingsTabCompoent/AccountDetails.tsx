"use client";

import { useState } from "react";
import Section from "./Section";
import { MapPin, Pencil } from "lucide-react";

export default function AccountDetails({
  location,
  openLocation,
}: {
  location: string;
  openLocation: () => void;
}) {
  const [editField, setEditField] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "Mia Leclair",
    email: "mia@foreal.co",
    phone: "+44 7700 900000",
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCancel = (key: string, original: string) => {
    setForm((prev) => ({ ...prev, [key]: original }));
    setEditField(null);
  };

  return (
    <Section title="ACCOUNT DETAILS">
      {/* FULL NAME */}
      <div className="flex items-center justify-between py-4 px-5 border-b border-border">
        <p className="text-xs text-muted tracking-widest w-40">
          FULL NAME
        </p>

        {editField === "name" ? (
          <>
            <input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="flex-1 border px-3 py-2 text-sm outline-none"
            />

            <div className="flex gap-4 ml-4 text-xs tracking-widest">
              <button
                onClick={() => setEditField(null)}
                className="text-muted hover:text-black"
              >
                SAVE
              </button>

              <button
                onClick={() =>
                  handleCancel("name", "Mia Leclair")
                }
                className="text-muted hover:text-black"
              >
                CANCEL
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="flex-1 text-sm text-primary">
              {form.name}
            </p>

            <button
              onClick={() => setEditField("name")}
              className="text-xs text-muted tracking-widest hover:text-black"
            >
              EDIT
            </button>
          </>
        )}
      </div>

      {/* EMAIL */}
      <div className="flex items-center justify-between py-4 px-5 border-b border-border">
        <p className="text-xs text-muted tracking-widest w-40">
          EMAIL
        </p>

        {editField === "email" ? (
          <>
            <input
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="flex-1 border px-3 py-2 text-sm outline-none"
            />

            <div className="flex gap-4 ml-4 text-xs tracking-widest">
              <button
                onClick={() => setEditField(null)}
                className="text-muted hover:text-black"
              >
                SAVE
              </button>

              <button
                onClick={() =>
                  handleCancel("email", "mia@foreal.co")
                }
                className="text-muted hover:text-black"
              >
                CANCEL
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="flex-1 text-sm text-primary">
              {form.email}
            </p>

            <button
              onClick={() => setEditField("email")}
              className="text-xs text-muted tracking-widest hover:text-black"
            >
              EDIT
            </button>
          </>
        )}
      </div>

      {/* LOCATION */}
      <div className="flex items-center justify-between py-4 px-5 border-b border-border">
        <p className="text-xs text-muted tracking-widest w-40">
          LOCATION
        </p>

        <div className="flex-1">
          <button
            onClick={openLocation}
            className="flex items-center gap-2 border px-3 py-2 rounded-lg text-sm text-primary hover:bg-muted/20"
          >
            <MapPin size={14} />
            {location}
            <Pencil size={14} />
          </button>
        </div>
      </div>

      {/* PHONE */}
      <div className="flex items-center justify-between py-4 px-5">
        <p className="text-xs text-muted tracking-widest w-40">
          PHONE
        </p>

        {editField === "phone" ? (
          <>
            <input
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="flex-1 border px-3 py-2 text-sm outline-none"
            />

            <div className="flex gap-4 ml-4 text-xs tracking-widest">
              <button
                onClick={() => setEditField(null)}
                className="text-muted hover:text-black"
              >
                SAVE
              </button>

              <button
                onClick={() =>
                  handleCancel("phone", "+44 7700 900000")
                }
                className="text-muted hover:text-black"
              >
                CANCEL
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="flex-1 text-sm text-primary">
              {form.phone}
            </p>

            <button
              onClick={() => setEditField("phone")}
              className="text-xs text-muted tracking-widest hover:text-black"
            >
              EDIT
            </button>
          </>
        )}
      </div>
    </Section>
  );
}