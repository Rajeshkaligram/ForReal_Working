"use client";

import { ImageIcon, X } from "lucide-react";
import { useRef } from "react";
import { useListingContext } from "./ListingContext";

export default function UploadSection() {
  const { photos, photoPreviews, addPhoto, removePhoto } = useListingContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Optional: could enforce max photos here
    if (photos.length >= 8) {
      alert("Maximum 8 photos allowed.");
      return;
    }

    addPhoto(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <p className="text-xs text-muted tracking-[.3px]">PHOTOS</p>

        <p className="text-xs text-muted">
          <span className="">{photos.length} / 8</span> · {Math.max(0, 4 - photos.length)} more recommended
        </p>
      </div>

      {/* UPLOAD GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {photoPreviews.map((preview, index) => (
          <div key={preview} className="relative border border-solid border-border rounded-sm aspect-square flex flex-col items-center justify-center bg-gray-50 overflow-hidden">
            <img src={preview} alt={`Uploaded piece ${index + 1}`} className="object-cover h-full w-full" />
            <button
              onClick={() => removePhoto(index)}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
            >
              <X size={16} />
            </button>
          </div>
        ))}

        {photos.length < 8 && (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border border-dashed border-primary rounded-sm aspect-square flex flex-col items-center justify-center text-center px-4 cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <input 
              type="file" 
              accept="image/jpeg, image/png, image/webp" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            {/* ICON */}
            <div className="mb-2 text-muted">
              <ImageIcon size={24} strokeWidth={1.5} />
            </div>

            {/* TEXT */}
            <p className="text-xs text-muted">
              <span className="underline text-black">
                Add photo
              </span>
            </p>
          </div>
        )}
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
