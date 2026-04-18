"use client";

import Image from "next/image";
import { Heart, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface ImageGalleryProps {
  images: string[];
  isRented?: boolean;
  wishlisted?: boolean;
  onWishlistToggle?: () => void;
  wishLoading?: boolean;
}

export default function ImageGallery({ images, isRented, wishlisted, onWishlistToggle, wishLoading }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const displayImages = images?.length > 0 ? images : ["/assets/images/p1.jpeg"];
  const currentImage = displayImages[currentIndex];

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative group overflow-hidden bg-[#F8F8F8]">
      {/* BADGE */}
      <div className="absolute top-5 left-5 z-20 bg-white text-black font-semibold text-[9px] px-3 py-1.5 tracking-[0.15em] uppercase shadow-sm">
        {isRented ? "RENTED" : "TRENDING"}
      </div>

      {/* WISHLIST */}
      <button 
        onClick={onWishlistToggle}
        disabled={wishLoading}
        className={`absolute top-5 right-5 z-20 h-10 w-10 flex items-center justify-center rounded-full shadow-sm hover:scale-105 transition-all ${
          wishlisted ? "bg-black text-white" : "bg-white text-black hover:bg-black hover:text-white"
        }`}
      >
        {wishLoading ? <Loader2 size={16} className="animate-spin" /> : <Heart size={16} className={wishlisted ? "fill-white stroke-white" : ""} />}
      </button>

      {/* ARROWS */}
      {displayImages.length > 1 && (
        <>
          <button 
            onClick={goPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/70 hover:bg-white text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={goNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/70 hover:bg-white text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* MAIN IMAGE */}
      <Image
        src={currentImage}
        alt={`product image ${currentIndex + 1}`}
        width={800}
        height={1000}
        key={currentImage} // forces refresh animation if desired
        priority={true}
        className="object-cover object-top w-full aspect-[3/4]"
        onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/assets/images/p1.jpeg"; }}
      />

      {/* DOTS */}
      {displayImages.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {displayImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                idx === currentIndex ? "bg-black w-3" : "bg-black/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
