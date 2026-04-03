"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Heart, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import { productsAPI, wishlistAPI, Product } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function ProductSlider() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [wishlisted, setWishlisted] = useState<Set<number>>(new Set());
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    // Use product-search (confirmed working via proxy) instead of new-added-product
    productsAPI
      .search({ search: "a", results_per_page: "10", page: "1" })
      .then((res) => {
        const d = res?.data as Record<string, unknown> | unknown[];
        const items: Product[] = Array.isArray(d)
          ? (d as Product[])
          : Array.isArray((d as Record<string, unknown>)?.products)
          ? ((d as { products: Product[] }).products)
          : [];
        if (items.length) setProducts(items);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const toggleWishlist = async (productId: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoggedIn) return;
    try {
      if (wishlisted.has(productId)) {
        await wishlistAPI.remove(productId);
        setWishlisted((prev) => {
          const next = new Set(prev);
          next.delete(productId);
          return next;
        });
      } else {
        await wishlistAPI.add(productId);
        setWishlisted((prev) => {
          const next = new Set(prev);
          next.add(productId);
          return next;
        });
      }
    } catch (err) {
      console.error("Wishlist error:", err);
    }
  };

  const getImage = (p: Product) =>
    p.picture || p.images?.[0] || p.thumbnail || "/assets/images/p1.jpeg";
  const getName = (p: Product) => p.name || p.title || "Untitled";

  // Placeholder skeleton cards
  const skeletonCount = 5;

  return (
    <section className="py-8 md:py-32 relative">
      <div className="mx-auto">
        <div className="flex justify-between container-md">
          <div className="pb-5! md:pb-10!">
            <p className="text-xs tracking-[4px] text-muted mb-4">NEW ARRIVALS</p>
            <h2 className="sec_title">
              Pieces now <br /> available to you.
            </h2>
          </div>
          <div>
            <Link
              href="/discover"
              className="flex gap-2 items-center text-muted font-medium shrink-0 border-b border-muted pb-2 text-xs tracking-widest hover:text-primary transition-all duration-200 hover:border-primary"
            >
              VIEW ALL
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Custom Arrows */}
        <div className="absolute top-1/2 left-10 z-10 -translate-y-1/2">
          <button className="swiper-prev bg-white hover:bg-primary hover:text-white text-primary p-3 rounded-full shadow cursor-pointer border-border border">
            <ChevronLeft size={20} />
          </button>
        </div>
        <div className="absolute top-1/2 right-10 z-10 -translate-y-1/2">
          <button className="swiper-next bg-white hover:bg-primary hover:text-white text-primary p-3 rounded-full shadow cursor-pointer border-border border">
            <ChevronRight size={20} />
          </button>
        </div>

        {loading ? (
          /* Skeleton */
          <div className="flex gap-4 px-16 py-6 overflow-hidden">
            {Array.from({ length: skeletonCount }).map((_, i) => (
              <div key={i} className="w-64 flex-shrink-0 animate-pulse">
                <div className="bg-border h-80 w-full" />
                <div className="mt-3 space-y-2">
                  <div className="bg-border h-2 w-24 rounded" />
                  <div className="bg-border h-3 w-36 rounded" />
                  <div className="bg-border h-2 w-16 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            loop={products.length > 4}
            centeredSlides={true}
            spaceBetween={15}
            speed={900}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            slidesPerView={1}
            navigation={{ prevEl: ".swiper-prev", nextEl: ".swiper-next" }}
            pagination={{ clickable: true, el: ".custom-pagination" }}
            breakpoints={{
              400: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
            className="py-6! sm:py-12!"
          >
            {products.map((item) => (
              <SwiperSlide key={item.id}>
                {({ isActive }) => (
                  <div
                    className={`transition-all duration-900 ${
                      isActive
                        ? "sm:scale-105 opacity-100 -translate-y-5"
                        : "scale-75 opacity-40"
                    }`}
                  >
                    <div className="relative group overflow-hidden">
                      <Image
                        src={getImage(item)}
                        alt={item.name || item.title || "Product"}
                        width={400}
                        height={500}
                        className="object-cover w-full group-hover:scale-104 transition-all duration-500"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            "/assets/images/p1.jpeg";
                        }}
                      />
                      {isActive && (
                        <div className="absolute inset-0 flex items-end justify-center pb-6">
                          <Link
                            href={`/product-details?id=${item.id}`}
                            className="bg-black text-white text-xs tracking-widest px-6 py-2 uppercase opacity-0 group-hover:opacity-100 transition-all"
                          >
                            Rent this piece
                          </Link>
                        </div>
                      )}
                      <button
                        onClick={(e) => toggleWishlist(item.id, e)}
                        className="absolute top-3 right-3 bg-white/80 p-2 rounded-full z-10 group/heart"
                      >
                        <Heart
                          size={16}
                          className={`transition-all duration-300 stroke-black ${
                            wishlisted.has(item.id)
                              ? "fill-black"
                              : "fill-transparent group-hover/heart:fill-black"
                          }`}
                        />
                      </button>
                    </div>
                    <div className="mt-4 flex justify-between text-sm px-2 sm:p-0">
                      <div>
                        <p className="text-[10px] tracking-[0.2em] uppercase text-muted">
                          {item.brand || item.category_name || "FoReal"}
                        </p>
                        <p className="text-primary font-bold">{item.title}</p>
                        <p className="text-xs text-muted">{item.size || "—"}</p>
                      </div>
                      <p className="font-medium whitespace-nowrap">
                        {item.price ? `$${item.price}` : "—"}{" "}
                        <span className="text-xs text-muted">/ day</span>
                      </p>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <div className="custom-pagination flex justify-center gap-1.5" />
      </div>

      <style>{`
        .custom-pagination .swiper-pagination-bullet {
          width: 6px; height: 6px;
          background: #ccc; opacity: 1;
          border-radius: 999px; transition: all 0.3s ease;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          width: 24px; background: #000;
        }
      `}</style>
    </section>
  );
}
