"use client";

import { useState } from "react";

export default function ToggleSwitch({
  defaultOn = false,
}: {
  defaultOn?: boolean;
}) {
  const [enabled, setEnabled] = useState(defaultOn);

  return (
    <div
      onClick={() => setEnabled(!enabled)}
      className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition ${
        enabled ? "bg-black" : "bg-gray-300"
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
          enabled ? "translate-x-5" : ""
        }`}
      />
    </div>
  );
}