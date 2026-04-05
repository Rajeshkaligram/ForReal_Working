"use client";

import { useState, useEffect } from "react";
import { reviewsAPI, myProductsAPI, rentedAPI, Review, Product } from "@/lib/api";
import { Loader2, Star } from "lucide-react";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="text-black text-lg">
      {"★".repeat(Math.min(rating, 5))}
      {"☆".repeat(5 - Math.min(rating, 5))}
    </div>
  );
}

interface ReviewsTabProps {
  productId?: number | string;
}

export default function ReviewsTab({ productId }: ReviewsTabProps) {
  const [reviews, setReviews] = useState<(Review & { productName?: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (productId) {
      // Single product mode — fetch reviews for one product
      setLoading(true);
      reviewsAPI
        .list(productId)
        .then((res) => {
          setReviews(Array.isArray(res.data) ? res.data : []);
        })
        .catch(() => setReviews([]))
        .finally(() => setLoading(false));
    } else {
      // Profile mode — aggregate reviews from all user's posted products
      (async () => {
        setLoading(true);
        try {
          const productsRes = await myProductsAPI.list(1, 50);
          const data = productsRes.data;
          let products: Product[] = [];
          if (Array.isArray(data)) {
            products = data;
          } else if (data && typeof data === "object" && "products" in data) {
            products = (data as { products: Product[] }).products || [];
          }

          // Also try fetching from rented items if no posted products found
          if (products.length === 0) {
            try {
              const rentedRes = await rentedAPI.list({ results_per_page: 50 });
              const rentedProducts = (rentedRes?.data || [])
                .map((r) => r.product)
                .filter((p): p is Product => !!p);
              // Get unique product ids
              const seen = new Set<number>();
              rentedProducts.forEach((p) => {
                if (p.id && !seen.has(p.id)) {
                  seen.add(p.id);
                  products.push(p);
                }
              });
            } catch {
              // continue
            }
          }

          if (products.length === 0) {
            setReviews([]);
            setLoading(false);
            return;
          }

          const allReviews: (Review & { productName?: string })[] = [];
          const promises = products.map(async (p) => {
            try {
              const reviewRes = await reviewsAPI.list(p.id);
              const pReviews = Array.isArray(reviewRes.data) ? reviewRes.data : [];
              pReviews.forEach((r) => {
                allReviews.push({ ...r, productName: p.name || p.title });
              });
            } catch {
              // skip
            }
          });

          await Promise.all(promises);

          // Sort by date descending
          allReviews.sort(
            (a, b) =>
              new Date(b.created_at || 0).getTime() -
              new Date(a.created_at || 0).getTime()
          );
          setReviews(allReviews);
        } catch {
          setReviews([]);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [productId]);

  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? +(reviews.reduce((s, r) => s + (r.rating || 0), 0) / totalReviews).toFixed(1)
      : 0;

  const ratingStats = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  const visibleReviews = showAll ? reviews : reviews.slice(0, 4);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-muted" size={24} />
      </div>
    );
  }

  if (totalReviews === 0) {
    return (
      <div className="text-center py-16">
        <Star size={40} className="mx-auto mb-4 text-muted opacity-40" />
        <p className="text-muted text-sm mb-1">No reviews yet</p>
        <p className="text-muted text-xs">
          Reviews from renters will appear here once people rent your items.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 container">
      {/* SUMMARY */}
      <div className="border-border border p-6 flex flex-col md:flex-row gap-10">
        <div>
          <p className="text-4xl font-serif">{averageRating}</p>
          <Stars rating={Math.round(averageRating)} />
          <p className="text-xs text-muted mt-1">
            {totalReviews} review{totalReviews !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex-1 space-y-2 md:space-y-3">
          {ratingStats.map((item) => {
            const percent = totalReviews > 0 ? (item.count / totalReviews) * 100 : 0;
            return (
              <div key={item.star} className="flex items-center gap-3">
                <span className="text-xs w-3">{item.star}</span>
                <div className="flex-1 h-1.5 bg-primary/10 rounded-full overflow-hidden">
                  <div
                    className="h-1.5 bg-black rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="text-xs w-6 text-right text-muted">{item.count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* REVIEWS */}
      <div>
        {visibleReviews.map((review) => (
          <div key={review.id} className="py-6 border-border border-b">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">
                  {review.user
                    ? `${review.user.first_name} ${review.user.last_name}`
                    : "Anonymous"}
                </p>
                <div className="flex items-center gap-3 mt-0.5">
                  {(review as { productName?: string }).productName && (
                    <p className="text-[10px] tracking-widest text-muted uppercase">
                      {(review as { productName?: string }).productName}
                    </p>
                  )}
                  <p className="text-xs text-muted">
                    {review.created_at
                      ? new Date(review.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : ""}
                  </p>
                </div>
              </div>
              <Stars rating={review.rating} />
            </div>
            <p className="mt-3 text-sm text-muted leading-6">
              &quot;{review.comment}&quot;
            </p>
          </div>
        ))}
      </div>

      {/* BUTTON */}
      {reviews.length > 4 && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="border-border border px-8 py-3 text-xs tracking-widest hover:bg-black hover:text-white cursor-pointer transition-colors"
          >
            {showAll ? "SEE LESS" : `SEE ALL ${totalReviews} REVIEWS`}
          </button>
        </div>
      )}
    </div>
  );
}
