"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function ProductGrid({ products, view }: any) {
  return (
    <div
      className={
        view === "grid"
          ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-6 mt-8 items-stretch"
          : "flex flex-col mt-4 md:mt-8"
      }
    >
      {products.map((item: any) => (
        <div
          key={item.id}
          className={`group transition-all duration-300 ${
            view === "list"
              ? "flex flex-wrap gap-2 items-center justify-between py-4 border-b border-border hover:bg-white px-2 cursor-pointer transition"
              : "cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-1 flex flex-col bg-white"
          }`}
        >
          {/* ================= LIST VIEW ================= */}
          {view === "list" ? (
            <>
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 overflow-hidden">
                  <Image
                    src={item.img || item.picture || "/assets/images/p1.jpeg"}
                    alt={item.title || item.name || "Product"}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-110"
                  />
                </div>

                <div>
                  <p className="text-[11px] tracking-wide text-muted">
                    {item.brand}
                  </p>

                  <h3 className="text-sm text-black mt-1">{item.title}</h3>

                  <span className="text-xs border border-border px-2 py-1 mt-2 inline-block text-muted">
                    {item.size}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <p className="text-sm text-black">
                  {item.price}
                  <span className="text-xs text-muted"> / day</span>
                </p>

                {/* wishlist */}
                <button className="p-2 border border-border rounded-full hover:bg-black hover:text-white transition">
                  <Heart
                    size={14}
                    className="transition group-hover:scale-110"
                  />
                </button>

                <Link
                  href={`/product-details?id=${item.id}`}
                  className="btn-bg bg-transparent! border border-border text-primary! py-2! px-4!  justify-center flex  group-hover:bg-primary! group-hover:text-white!"
                >
                  VIEW ITEM
                </Link>
              </div>
            </>
          ) : (
            /* ================= GRID VIEW ================= */
            <>
              {/* IMAGE */}
              <div className="relative overflow-hidden w-full h-50 md:h-80">
                <Image
                  src={item.img || item.picture || "/assets/images/p1.jpeg"}
                  alt={item.title || item.name || "Product"}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-end justify-center pb-5 transition duration-300">
                  <Link
                    href={`/product-details?id=${item.id}`}
                    className="btn-bg w-full mx-2 justify-center flex py-3!"
                  >
                    VIEW ITEM
                  </Link>
                </div>

                {/* tag */}
                <span className="absolute top-3 left-3 bg-white text-xs px-2 py-1">
                  TRENDING
                </span>

                {/* wishlist */}
                <button className="absolute top-3 cursor-pointer right-3 bg-white/80 p-2 rounded-full transition hover:bg-black hover:text-white">
                  <Heart size={14} className="transition" />
                </button>
              </div>

              {/* info */}
              <div className="p-2 sm:p-4 flex flex-col flex-1">
                <p className="text-xs text-muted">{item.brand}</p>

                <h3 className="text-sm mt-1 sm:mt-2 truncate">{item.title}</h3>

                <div className="flex justify-between mt-auto pt-3">
                  <p className="text-xs">{item.price}</p>

                  <span className="text-xs border border-border px-2 py-1">
                    {item.size}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
