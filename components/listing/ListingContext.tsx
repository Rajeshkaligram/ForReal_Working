"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface ListingFormData {
  name: string;
  designer: string;
  price: string;
  retail_price: string;
  color: string;
  size: string;
  season: string;
  description: string;
  cancellation: string;
  alteration: string;
  cleaning_price: string;
  condition: string;
  category_id: string;
}

interface ListingContextType {
  formData: ListingFormData;
  updateData: (fields: Partial<ListingFormData>) => void;
  // Photo files
  photos: File[];
  photoPreviews: string[];
  addPhoto: (file: File) => void;
  removePhoto: (index: number) => void;
  // Toggles
  authEnabled: boolean;
  setAuthEnabled: (v: boolean) => void;
  cleaningEnabled: boolean;
  setCleaningEnabled: (v: boolean) => void;
  // Calendar
  blockedDates: Date[];
  toggleBlockedDate: (date: Date) => void;
  // Reset
  resetForm: () => void;
}

const defaultFormData: ListingFormData = {
  name: "",
  designer: "",
  price: "",
  retail_price: "",
  color: "",
  size: "",
  season: "",
  description: "",
  cancellation: "Moderate (Item may be cancelled without penalty 6-8 days prior the rental period)",
  alteration: "No",
  cleaning_price: "0",
  condition: "Good",
  category_id: "1",
};

const ListingContext = createContext<ListingContextType | undefined>(undefined);

export function ListingProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<ListingFormData>(defaultFormData);
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [authEnabled, setAuthEnabled] = useState(false);
  const [cleaningEnabled, setCleaningEnabled] = useState(false);
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);

  const updateData = (fields: Partial<ListingFormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const addPhoto = (file: File) => {
    if (photos.length >= 8) return;
    setPhotos((prev) => [...prev, file]);
    // Create preview URL
    const url = URL.createObjectURL(file);
    setPhotoPreviews((prev) => [...prev, url]);
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setPhotoPreviews((prev) => {
      // Revoke the old URL to prevent memory leaks
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const toggleBlockedDate = (date: Date) => {
    setBlockedDates((prev) => {
      const exists = prev.some((d) => d.toDateString() === date.toDateString());
      if (exists) {
        return prev.filter((d) => d.toDateString() !== date.toDateString());
      }
      return [...prev, date];
    });
  };

  const resetForm = () => {
    setFormData(defaultFormData);
    // Revoke all preview URLs
    photoPreviews.forEach((url) => URL.revokeObjectURL(url));
    setPhotos([]);
    setPhotoPreviews([]);
    setAuthEnabled(false);
    setCleaningEnabled(false);
    setBlockedDates([]);
  };

  return (
    <ListingContext.Provider
      value={{
        formData,
        updateData,
        photos,
        photoPreviews,
        addPhoto,
        removePhoto,
        authEnabled,
        setAuthEnabled,
        cleaningEnabled,
        setCleaningEnabled,
        blockedDates,
        toggleBlockedDate,
        resetForm,
      }}
    >
      {children}
    </ListingContext.Provider>
  );
}

export function useListingContext() {
  const context = useContext(ListingContext);
  if (!context) {
    throw new Error("useListingContext must be used within a ListingProvider");
  }
  return context;
}
