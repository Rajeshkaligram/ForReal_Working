"use client";

import { useState } from "react";

export default function EditableRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  const [edit, setEdit] = useState(false);
  const [val, setVal] = useState(value);

  return (
    <div className="flex justify-between items-center py-4 px-5 border-b border-border">
      <div className="w-full flex gap-6 items-center">
        <p className="text-xs tracking-widest text-muted font-medium">
          {label}
        </p>

        {edit ? (
          <input
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="mt-1 border px-2 py-1 text-sm w-full outline-none"
          />
        ) : (
          <p className="text-sm">{val}</p>
        )}
      </div>

      <button
        onClick={() => setEdit(!edit)}
        className="text-xs text-muted hover:text-black tracking-widest"
      >
        {edit ? "SAVE" : "EDIT"}
      </button>
    </div>
  );
}