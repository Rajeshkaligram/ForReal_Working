"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/api";

interface ProductInfoProps {
  product: Product;
  rentalDays: number;
  dailyPrice: number;
  totalPrice: number;
  addingToCart: boolean;
  onAddToCart: () => void;
  cartMsg: string;
}

export default function ProductInfo({
  product, rentalDays, dailyPrice, totalPrice, addingToCart, onAddToCart, cartMsg
}: ProductInfoProps) {
  const brand = product.brand || product.designer || product.category_name;
  const cleaningFee = product.cleaning_price ? Number(product.cleaning_price) : (product.id ? 1.00 : 0);

  return (
    <div className="text-primary space-y-3">
      {/* BREADCRUMB */}
      <p className="text-[11px] tracking-widest text-muted uppercase">
        Discover › {product.category_name || "Style"}
      </p>

      {/* BRAND */}
      {brand && (
        <p className="text-[11px] tracking-widest text-muted uppercase mb-2">
          {brand}
        </p>
      )}

      {/* TITLE */}
      <h1 className="text-2xl md:text-4xl font-serif leading-tight">
        {product.name || product.title}
      </h1>

      {/* RATING */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-black">
          {Array.from({ length: 5 }).map((_, i) => (
            i < Math.round(product.rating || 0) ? "★" : "☆"
          ))}
        </span>
        <span className="text-primary">{product.rating || "0.0"}</span>
        <span className="text-muted underline cursor-pointer">
          ({product.reviews_count || 0} reviews)
        </span>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-gray-200" />

      {/* PRICE SECTION */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-[11px] tracking-widest text-muted uppercase">
            Rental Price
          </p>
          <p className="text-xl md:text-3xl font-serif">${dailyPrice.toFixed(2)} /day</p>
        </div>

        {product.retail_price && Number(product.retail_price) > 0 && (
          <div className="text-right">
            <p className="text-[11px] tracking-widest text-muted uppercase">
              Retail Value
            </p>
            <p className="text-muted line-through">${Number(product.retail_price).toFixed(2)}</p>
          </div>
        )}
      </div>

      {/* PAYMENT BOX */}
      <div className="border border-border p-3 md:p-6 space-y-5 bg-white">
        <p className="text-[11px] tracking-widest text-muted uppercase">
          Payment Breakdown
        </p>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span>${dailyPrice.toFixed(2)} × {rentalDays} days</span>
            <span>${(dailyPrice * rentalDays).toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Buyer protection</span>
            <span>$0.00</span>
          </div>

          <div className="flex justify-between">
            <span>VAT (21%)</span>
            <span>$0.00</span>
          </div>

          <div className="flex justify-between">
            <span>Cleaning fee</span>
            <span>${rentalDays > 0 ? cleaningFee.toFixed(2) : "0.00"}</span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
          <span className="text-xs tracking-widest text-muted uppercase">
            Total to pay
          </span>
          <span className="text-2xl font-serif">${totalPrice.toFixed(2)}</span>
        </div>

        {/* SECURITY DEPOSIT */}
        <div className="border border-gray-400 p-4 bg-gray-50 space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span>Security deposit (held on card)</span>
            <span>${((Number(product.retail_price || 200)) * 0.3).toFixed(2)}</span>
          </div>

          <p className="text-xs text-muted">
            Not charged now. Held on your card and released after return
            inspection.
          </p>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="space-y-3 my-5 md:my-10">
        <button 
          onClick={onAddToCart}
          disabled={addingToCart}
          className="w-full cursor-pointer hover:bg-primary bg-black text-white py-3 text-xs tracking-widest flex items-center justify-center gap-2"
        >
          {addingToCart && <Loader2 size={16} className="animate-spin" />}
          REQUEST TO RENT
        </button>

        <button className="w-full cursor-pointer border border-border hover:bg-muted/10 hover:border-primary py-3 text-xs tracking-widest">
          MESSAGE SELLER
        </button>

        {cartMsg && (
          <p className={`text-xs text-center ${cartMsg.startsWith("✓") ? "text-green-600" : "text-red-500"} mt-2`}>
            {cartMsg}
          </p>
        )}
      </div>

      {/* DIVIDER */}
      <div className="border-t border-gray-200" />

      {/* DESCRIPTION */}
      <div className="space-y-2 my-5 md:my-10">
        <p className="text-[11px] tracking-widest text-muted uppercase">
          About this piece
        </p>

        <p className="text-sm text-muted leading-relaxed">
          {product.description || "Perfect for weddings, cocktail events, or any occasion you want to stand out."}
        </p>
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-2 text-sm gap-y-4">
        <div>
          <p className="text-muted text-xs">Brand</p>
          <p className="font-medium">{brand || "FoReal"}</p>
        </div>

        <div>
          <p className="text-muted text-xs">Size</p>
          <div className="flex items-center gap-2">
            <p className="font-medium">{product.size || "Standard"}</p>
            {product.measurement_image && (
              <a 
                href={product.measurement_image} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[10px] underline text-primary hover:text-black opacity-80"
              >
                 Size Chart
              </a>
            )}
          </div>
        </div>

        <div>
          <p className="text-muted text-xs">Condition</p>
          <p className="font-medium">{product.condition || "Very Good"}</p>
        </div>

        <div>
          <p className="text-muted text-xs">Retail</p>
          <p className="font-medium">${Number(product.retail_price || 1000).toFixed(2)}</p>
        </div>

        {product.is_professionally_cleaned === "1" && (
          <div>
            <p className="text-muted text-xs">Authenticated</p>
            <p className="font-medium">Professionally Cleaned</p>
          </div>
        )}

        {product.color && (
          <div>
            <p className="text-muted text-xs">Color</p>
            <p className="font-medium capitalize">{product.color}</p>
          </div>
        )}

        {product.season && (
          <div>
            <p className="text-muted text-xs">Season</p>
            <p className="font-medium capitalize">{product.season}</p>
          </div>
        )}

        {product.alteration && (
          <div className="col-span-2">
            <p className="text-muted text-xs">Alteration Policy</p>
            <p className="font-medium">{product.alteration}</p>
          </div>
        )}

        {product.cancellation && (
          <div className="col-span-2">
            <p className="text-muted text-xs">Cancellation Policy</p>
            <p className="font-medium">{product.cancellation}</p>
          </div>
        )}
      </div>

      {/* DIVIDER */}
      <div className="border-t border-border my-5 md:my-10" />

      {/* REVIEW LISTED BY CARD */}
      <Link
        href={`/seller/${product.added_by?.id || 1}`}
        className="border border-border p-4 flex gap-4 justify-between items-center hover:bg-gray-50 transition-colors"
      >
        <div className="flex gap-2 items-center">
          <Image
            src={product.added_by?.profile_picture || "/assets/images/profile.jpeg"}
            height={50}
            width={50}
            alt="profile"
            className="rounded-full object-cover h-12 w-12 aspect-square"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/assets/images/profile.jpeg"; }}
          />

          <div className="space-y-1">
            <p className="text-sm font-medium">
              {product.added_by ? `${product.added_by.first_name} ${product.added_by.last_name?.charAt(0) || ''}.` : "Aisha K."}
            </p>

            <div className="text-xs text-black">
              ★★★★★ · Rented Jan 2024
            </div>

            <p className="text-sm text-muted">
              Great condition & fast delivery!
            </p>
          </div>
        </div>
        <div className="text-muted">
          <ArrowRight size={14} />
        </div>
      </Link>
    </div>
  );
}
