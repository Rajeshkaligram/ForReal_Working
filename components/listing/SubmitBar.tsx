"use client";

import React, { useState } from "react";
import { useListingContext } from "./ListingContext";
import { myProductsAPI } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SubmitBar() {
  const { formData, photos, resetForm } = useListingContext();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  // Helper to convert File to Base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async () => {
    setErrorMsg("");

    // Basic validation
    if (!formData.name || photos.length === 0 || !formData.category_id || !formData.price || !formData.designer) {
      setErrorMsg("Please fill out all required fields, including at least one picture.");
      return;
    }

    setLoading(true);
    try {
      const formPayload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formPayload.append(key, value);
      });

      // Convert main photo to base64 for the primary API
      const mainPhotoBase64 = await fileToBase64(photos[0]);
      formPayload.append("picture", mainPhotoBase64);

      const response = await myProductsAPI.add(formPayload);
      
      if (response && (response as any).status !== 200 && (response as any).status !== 201 && (response as any).status !== true && (response as any).status !== "success" && (response as any).status !== undefined) {
         throw new Error((response as any).message || JSON.stringify(response));
      }

      const productId = response.data?.id || (response as any)?.product?.id || (response as any)?.id;

      // Upload extra photos if any
      if (productId && photos.length > 1) {
        for (let i = 1; i < photos.length; i++) {
          try {
            await myProductsAPI.uploadPhoto(productId, photos[i]);
          } catch (uploadErr) {
            console.error("Failed to upload extra photo:", uploadErr);
          }
        }
      }

      resetForm();
      router.push("/profile?tab=postings");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to publish listing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      {errorMsg && <p className="text-red-500 text-sm text-center">{errorMsg}</p>}
      <button 
        onClick={handleSubmit}
        disabled={loading}
        className="w-full justify-center flex items-center gap-2 bg-black text-white py-3 text-xs hover:opacity-90 cursor-pointer mb-2!"
      >
        {loading && <Loader2 size={16} className="animate-spin" />}
        PUBLISH LISTING
      </button>
      <p className="text-muted text-xs text-center">Your listing will be reviewed before going live.</p>
    </div>
  );
}
