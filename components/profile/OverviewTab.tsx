"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import {
  rentedAPI,
  wishlistAPI,
  myProductsAPI,
  reviewsAPI,
  RentedProduct,
  Product,
  Review,
  WishlistItem,
} from "@/lib/api";
import { Loader2, Package2, Heart, Star, Clock } from "lucide-react";

export default function OverviewTab({ setTab }: { setTab: (t: string) => void }) {
  const { user } = useAuth();

  const [rentals, setRentals] = useState<RentedProduct[]>([]);
  const [savedPieces, setSavedPieces] = useState<WishlistItem[]>([]);
  const [recentReviews, setRecentReviews] = useState<(Review & { productName?: string })[]>([]);
  const [loadingRentals, setLoadingRentals] = useState(true);
  const [loadingSaved, setLoadingSaved] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);

  // Fetch currently renting items
  useEffect(() => {
    rentedAPI
      .list({ results_per_page: 3 })
      .then((res) => setRentals(res?.data || []))
      .catch(() => setRentals([]))
      .finally(() => setLoadingRentals(false));
  }, []);

  // Fetch saved/wishlist pieces
  useEffect(() => {
    wishlistAPI
      .get(1, 4)
      .then((res) => setSavedPieces(Array.isArray(res?.data) ? res.data.slice(0, 4) : []))
      .catch(() => setSavedPieces([]))
      .finally(() => setLoadingSaved(false));
  }, []);

  // Fetch recent reviews from user's posted products
  useEffect(() => {
    (async () => {
      try {
        const productsRes = await myProductsAPI.list(1, 10);
        const data = productsRes.data;
        let products: Product[] = [];
        if (Array.isArray(data)) {
          products = data;
        } else if (data && typeof data === "object" && "products" in data) {
          products = (data as { products: Product[] }).products || [];
        }

        // Fetch reviews for each product & aggregate
        const allReviews: (Review & { productName?: string })[] = [];
        const productReviewPromises = products.slice(0, 5).map(async (p) => {
          try {
            const reviewRes = await reviewsAPI.list(p.id);
            const reviews = Array.isArray(reviewRes.data) ? reviewRes.data : [];
            reviews.forEach((r) => {
              allReviews.push({ ...r, productName: p.name || p.title });
            });
          } catch {
            // skip this product
          }
        });

        await Promise.all(productReviewPromises);
        // Sort by created_at descending, take top 3
        allReviews.sort(
          (a, b) =>
            new Date(b.created_at || 0).getTime() -
            new Date(a.created_at || 0).getTime()
        );
        setRecentReviews(allReviews.slice(0, 3));
      } catch {
        setRecentReviews([]);
      } finally {
        setLoadingReviews(false);
      }
    })();
  }, []);

  const handleTabChange = (t: string) => {
    window.scrollTo({ top: 20, behavior: "smooth" });
    setTab(t);
  };

  const getRentalImage = (item: RentedProduct) => {
    const imgs = item.product?.images || [];
    return imgs.length > 0
      ? imgs[0]
      : item.product?.picture || "/assets/images/p1.jpeg";
  };

  const renderStars = (rating: number) => {
    return "★".repeat(Math.min(rating, 5)) + "☆".repeat(5 - Math.min(rating, 5));
  };

  return (
    <div className="space-y-4 md:space-y-8 container">
      {/* ABOUT */}
      <div className="border border-border p-3 md:p-6">
        <div className="flex justify-between items-center mb-4">
          <p className="text-xs tracking-widest text-muted font-medium">
            ABOUT
          </p>
          <button
            onClick={() => handleTabChange("settings")}
            className="text-xs tracking-widest text-muted font-medium hover:text-black cursor-pointer"
          >
            EDIT
          </button>
        </div>

        <div className="text-sm text-muted leading-6 space-y-2">
          <p>
            <span className="font-medium text-foreground">{user?.first_name} {user?.last_name}</span>
            {user?.location && (
              <span className="ml-2 text-xs">— {user.location}</span>
            )}
          </p>
          {user?.email && (
            <p className="text-xs">{user.email}</p>
          )}
          {user?.contact_number && (
            <p className="text-xs">Phone: {user.contact_number}</p>
          )}
          {(user?.size || user?.height) && (
            <p className="text-xs">
              {user.size && <span>Size: {user.size}</span>}
              {user.size && user.height && <span> · </span>}
              {user.height && <span>Height: {user.height}</span>}
            </p>
          )}
          {!user?.location && !user?.contact_number && !user?.size && (
            <p className="text-sm text-muted">
              Complete your profile in{" "}
              <button
                onClick={() => handleTabChange("settings")}
                className="underline hover:text-black cursor-pointer"
              >
                Settings
              </button>{" "}
              to help renters get to know you better.
            </p>
          )}
        </div>
      </div>

      {/* GRID SECTION */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* CURRENTLY RENTING */}
        <div className="border border-border p-3 md:p-6 flex flex-col justify-between">
          <div>
            <p className="text-xs tracking-widest text-muted font-medium mb-6">
              CURRENTLY RENTING
            </p>

            {loadingRentals ? (
              <div className="flex justify-center py-6">
                <Loader2 size={18} className="animate-spin text-muted" />
              </div>
            ) : rentals.length === 0 ? (
              <div className="text-center py-4">
                <Package2
                  size={28}
                  className="mx-auto mb-2 text-muted opacity-40"
                />
                <p className="text-sm text-muted">No active rentals</p>
              </div>
            ) : (
              <div className="space-y-5">
                {rentals.slice(0, 2).map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <Image
                      src={getRentalImage(item)}
                      alt={
                        item.product?.name ||
                        item.product?.title ||
                        "Product"
                      }
                      width={64}
                      height={64}
                      className="w-16 h-16 object-cover flex-shrink-0"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "/assets/images/p1.jpeg";
                      }}
                    />
                    <div>
                      <p className="text-[10px] tracking-widest text-muted uppercase">
                        {item.product?.designer ||
                          item.product?.brand ||
                          "FOREAL"}
                      </p>
                      <p className="text-sm font-medium">
                        {item.product?.name ||
                          item.product?.title ||
                          "Rental item"}
                      </p>
                      <p className="text-xs text-muted flex items-center gap-1 mt-0.5">
                        <Clock size={10} />
                        {item.rental_end_date
                          ? `Return by ${item.rental_end_date}`
                          : item.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => handleTabChange("renting")}
            className="mt-6 border border-border py-3 text-xs tracking-widest text-muted font-medium hover:bg-black hover:text-white transition cursor-pointer"
          >
            VIEW ALL RENTALS
          </button>
        </div>

        {/* SAVED PIECES */}
        <div className="border border-border p-3 md:p-6 flex flex-col justify-between">
          <div>
            <p className="text-xs tracking-widest text-muted font-medium mb-6">
              SAVED PIECES
            </p>

            {loadingSaved ? (
              <div className="flex justify-center py-6">
                <Loader2 size={18} className="animate-spin text-muted" />
              </div>
            ) : savedPieces.length === 0 ? (
              <div className="text-center py-4">
                <Heart
                  size={28}
                  className="mx-auto mb-2 text-muted opacity-40"
                />
                <p className="text-sm text-muted">
                  No saved pieces yet. Start browsing to add favorites.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {savedPieces.map((item) => {
                  const product = item.product;
                  const imgSrc =
                    product?.picture ||
                    product?.thumbnail ||
                    "/assets/images/p1.jpeg";
                  return (
                    <Link
                      key={item.id}
                      href={`/product-details?id=${product?.id}`}
                      className="group"
                    >
                      <div className="aspect-square relative overflow-hidden bg-secondary">
                        <Image
                          src={imgSrc}
                          alt={product?.name || product?.title || "Saved"}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="120px"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                              "/assets/images/p1.jpeg";
                          }}
                        />
                      </div>
                      <p className="text-xs mt-1.5 truncate">
                        {product?.name || product?.title}
                      </p>
                      <p className="text-xs text-muted">
                        ${product?.price}
                      </p>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <Link
            href="/wishlist"
            className="mt-6 border border-border py-3 text-xs tracking-widest text-muted font-medium hover:bg-black hover:text-white transition cursor-pointer text-center block"
          >
            VIEW WISHLIST
          </Link>
        </div>

        {/* RECENT REVIEWS */}
        <div className="border border-border p-3 md:p-6 flex flex-col justify-between">
          <div>
            <p className="text-xs tracking-widest text-muted font-medium mb-6">
              RECENT REVIEWS
            </p>

            {loadingReviews ? (
              <div className="flex justify-center py-6">
                <Loader2 size={18} className="animate-spin text-muted" />
              </div>
            ) : recentReviews.length === 0 ? (
              <div className="text-center py-4">
                <Star
                  size={28}
                  className="mx-auto mb-2 text-muted opacity-40"
                />
                <p className="text-sm text-muted">
                  No reviews yet. Reviews will appear here when renters leave feedback on your items.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {recentReviews.map((review) => (
                  <div key={review.id}>
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium">
                        {review.user
                          ? `${review.user.first_name} ${review.user.last_name}`
                          : "Anonymous"}
                      </p>
                      <p className="text-black text-sm">
                        {renderStars(review.rating)}
                      </p>
                    </div>
                    {review.productName && (
                      <p className="text-[10px] tracking-widest text-muted uppercase mt-0.5">
                        {review.productName}
                      </p>
                    )}
                    <p className="text-sm text-muted mt-1 leading-5 line-clamp-2">
                      &quot;{review.comment}&quot;
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => handleTabChange("reviews")}
            className="mt-6 border border-border py-3 text-xs tracking-widest text-muted font-medium hover:bg-black hover:text-white transition cursor-pointer"
          >
            SEE ALL REVIEWS
          </button>
        </div>
      </div>
    </div>
  );
}
