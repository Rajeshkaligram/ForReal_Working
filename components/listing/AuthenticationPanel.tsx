"use client";

import { AlertCircle, Info } from "lucide-react";

export default function AuthenticationPanel() {
  return (
    <div className="space-y-6 border border-gray-200 bg-white p-6 rounded-sm">
      {/* HEADER */}
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
          <AlertCircle className="text-orange-500" size={18} />
        </div>

        <div>
          <p className="font-medium text-sm">Authenticity Check</p>
          <p className="text-sm text-muted mt-1">
            Our system automatically scans listings to help prevent counterfeit
            items.
          </p>
        </div>
      </div>

      {/* STATUS BOX */}
      <div className="border border-orange-200 bg-orange-50 p-5 rounded-sm space-y-3">
        <div className="flex items-center gap-2 text-orange-700 font-medium text-sm">
          <AlertCircle size={16} />
          Authentication Pending
        </div>

        <p className="text-sm text-orange-600">
          Your listing requires manual review by our authenticity team. This
          typically takes 24–48 hours.
        </p>

        <button className="inline-block border border-orange-500 text-orange-600 px-4 py-2 text-xs tracking-wide hover:bg-orange-100 transition rounded-sm">
          UNDER REVIEW
        </button>
      </div>

      {/* UPLOAD SECTION */}
      <div className="border border-border  p-5 rounded-sm space-y-4">
        <div>
          <p className="text-sm font-medium">
            Upload Purchase Receipt (Optional)
          </p>
          <p className="text-xs text-muted mt-1">
            Add proof of purchase to strengthen verification. This is private
            and never shown to renters.
          </p>
        </div>

        {/* DROP AREA */}
        <div className="border border-dashed border-gray-300 h-36 flex flex-col items-center justify-center text-center text-sm text-muted">
          <div className="mb-2 text-muted">📄</div>

          <p>
            Drop receipt here or{" "}
            <span className="underline text-black cursor-pointer">
              click to upload
            </span>
          </p>

          <p className="text-[11px] uppercase tracking-widest mt-2">
            JPG, PNG, PDF accepted
          </p>
        </div>

        {/* PRIVACY NOTE */}
        <div className="flex items-start gap-2 bg-muted/10 p-3 rounded-sm text-xs text-muted">
          <Info size={14} className="mt-0.5" />
          <p>
            Your privacy is protected. Receipts are encrypted and only reviewed
            by our verification team. They are never displayed to renters or
            other users.
          </p>
        </div>
      </div>
    </div>
  );
}
