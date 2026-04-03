"use client";

import { useState } from "react";
import Section from "./Section";

export default function AccountAuth() {
  const [edit, setEdit] = useState<"password" | null>(null);
  const [password, setPassword] = useState("");

  return (
    <Section title="ACCOUNT AUTHENTICATION">
      {/* PASSWORD */}
      <div className="flex items-center justify-between py-4 px-5 border-b border-border">
        <p className="text-xs text-muted tracking-widest w-40">
          PASSWORD
        </p>

        {edit === "password" ? (
          <>
            {/* INPUT */}
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 border-border border px-3 py-2 text-sm outline-none"
            />

            {/* ACTIONS */}
            <div className="flex gap-4 ml-4 text-xs tracking-widest">
              <button
                onClick={() => setEdit(null)}
                className="text-muted hover:text-black"
              >
                SAVE
              </button>

              <button
                onClick={() => {
                  setEdit(null);
                  setPassword("");
                }}
                className="text-muted hover:text-black"
              >
                CANCEL
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="flex-1 text-sm">••••••••</p>

            <button
              onClick={() => setEdit("password")}
              className="text-xs text-muted tracking-widest hover:text-black"
            >
              CHANGE
            </button>
          </>
        )}
      </div>

      {/* TWO FACTOR AUTH */}
      <div className="flex items-center justify-between py-4 px-5">
        <p className="text-xs text-muted tracking-widest w-40">
          TWO-FACTOR AUTH
        </p>

        <p className="flex-1 text-sm">Enabled</p>

        <button className="text-xs text-muted tracking-widest hover:text-black">
          MANAGE
        </button>
      </div>
    </Section>
  );
}