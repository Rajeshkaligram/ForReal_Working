"use client";

type ToggleItemProps = {
  title: string;
  description: string;
  enabled: boolean;
  setEnabled: (v: boolean) => void;
};

export default function ToggleItem({
  title,
  description,
  enabled,
  setEnabled,
}: ToggleItemProps) {
  return (
    <div className="border border-gray-300 p-5">

      <div className="flex justify-between items-start gap-4">

        {/* TEXT */}
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-sm text-muted mt-1">
            {description}
          </p>
        </div>

        {/* TOGGLE */}
        <button
          type="button"
          onClick={() => setEnabled(!enabled)}
          className={`relative w-12 h-7 rounded-full transition
          ${enabled ? "bg-black" : "bg-muted/20"}`}
        >
          <span
            className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition
            ${enabled ? "translate-x-5" : "translate-x-0"}`}
          />
        </button>

      </div>

    </div>
  );
}