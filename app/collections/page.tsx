"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Heart, Loader2 } from "lucide-react";
import { productsAPI, Product } from "@/lib/api";

export default function Collections() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products without category filter just for the demo collection
    productsAPI
      .search({ results_per_page: "8" })
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : (res.data as any)?.products || [];
        setProducts(data);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-8 md:py-16 min-h-screen">
      <div className="container">
        {/* BACK LINK */}
        <Link
          href="/discover"
          className="flex items-center gap-2 text-sm mb-6 text-primary hover:opacity-70 transition"
        >
          <ChevronLeft size={16} />
          Back to Discover
        </Link>

        {/* HEADER */}
        <div className="mb-8 md:mb-12">
          <h1 className="font-serif text-3xl md:text-5xl mb-3 font-medium">
            Featured Collection
          </h1>

          <p className="text-primary text-xs md:text-base mb-4">
            Elegant pieces for celebrations and formal events
          </p>

          <p className="text-sm text-muted">
            <span className="mr-3">{products.length} pieces</span> • Curated for wedding,
            formal, celebration, elegant, black tie
          </p>
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-border h-60 sm:h-80 w-full" />
                <div className="mt-3 space-y-2">
                  <div className="bg-border h-2 w-16" />
                  <div className="bg-border h-3 w-3/4" />
                  <div className="bg-border h-3 w-12" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-muted">No items in this collection yet.</p>
          </div>
        ) : (
          /* PRODUCTS GRID */
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            {products.map((item, i) => {
               const imgUrl = item.images && item.images.length > 0 ? item.images[0] : (item.picture || "/assets/images/p1.jpeg");
               
               return (
                <div
                  key={item.id || i}
                  className="group bg-white transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-lg relative"
                >
                  {/* IMAGE */}
                  <div className="relative overflow-hidden w-full h-auto">
                    <div style={{ paddingBottom: "125%" }} className="relative">
                      <Image
                        src={imgUrl}
                        alt={item.name || item.title || "Product"}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = "/assets/images/p1.jpeg";
                        }}
                      />
                    </div>

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-500 pointer-events-none" />

                    {/* BADGE */}
                    {i < 2 && (
                      <span className="absolute top-3 left-3 bg-white text-[10px] px-2 py-1 tracking-widest uppercase shadow-sm">
                        Popular
                      </span>
                    )}

                    {/* WISHLIST */}
                    <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-md">
                      <Heart size={14} className="text-muted-foreground" />
                    </button>

                    {/* HOVER BUTTON (Now wrapped properly and covering click area on link) */}
                    <div className="absolute inset-0 flex items-end justify-center pointer-events-none pb-4">
                      <Link
                        href={`/product-details?id=${item.id}`}
                        className="pointer-events-auto text-center translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all cursor-pointer duration-500 ease-out bg-black text-white text-xs px-6 py-2.5 tracking-wide uppercase w-[90%] hover:bg-neutral-800"
                      >
                        View Item
                      </Link>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-2 md:p-4">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-muted mb-1 line-clamp-1">
                      {item.brand || "FoReal"}
                    </p>

                    <h3 className="text-sm md:text-base font-medium line-clamp-1">
                      <Link href={`/product-details?id=${item.id}`} className="hover:text-primary">
                        {item.name || item.title}
                      </Link>
                    </h3>

                    <p className="text-sm mt-1">
                      ${item.price || "—"} <span className="text-muted text-xs">/ day</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
