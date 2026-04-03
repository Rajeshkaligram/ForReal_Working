"use client";

import { ImageIcon } from "lucide-react";

export default function UploadSection() {
  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <p className="text-xs text-muted tracking-[.3px]">PHOTOS</p>

        <p className="text-xs text-muted">
          <span className="">0 / 8</span> · 4 more required
        </p>
      </div>

      {/* UPLOAD BOX */}
      <div className="border border-dashed border-primary rounded-sm h-72 flex flex-col items-center justify-center text-center px-6">
        {/* ICON */}
        <div className="mb-3 text-muted">
          <ImageIcon size={28} strokeWidth={1.5} />
        </div>

        {/* TEXT */}
        <p className="text-sm text-muted">
          Drop photos here or{" "}
          <span className="underline text-black cursor-pointer">
            click to upload
          </span>
        </p>

        {/* SUBTEXT */}
        <p className="text-[11px] tracking-widest text-muted mt-3 uppercase">
          Min. 4 required · Max. 8 · JPG, PNG, WEBP
        </p>
      </div>

      {/* WARNING BOX */}
      <div className="border border-red-300 bg-red-50 p-4 text-sm text-red-600 leading-relaxed">
        <span className="font-medium">Clear photos are mandatory.</span> Include
        detailed shots of labels, tags, seaming, fabric texture, hardware, and
        any marks or wear. These build trust and reduce disputes.
      </div>
    </div>
  );
}
