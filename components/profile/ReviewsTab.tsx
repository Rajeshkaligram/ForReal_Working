"use client";

import { useState, useEffect } from "react";
import { reviewsAPI, Review } from "@/lib/api";
import { Loader2 } from "lucide-react";

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
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    reviewsAPI
      .list(productId)
      .then((res) => {
        setReviews(Array.isArray(res.data) ? res.data : []);
      })
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
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

  const visibleReviews = showAll ? reviews : reviews.slice(0, 2);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-muted" size={24} />
      </div>
    );
  }

  if (totalReviews === 0) {
    return (
      <div className="text-center py-16 text-muted text-sm">
        No reviews yet.
      </div>
    );
  }

  return (
    <div className="space-y-6 container">
      {/* SUMMARY */}
      <div className="border-border border  p-6 flex flex-col md:flex-row gap-10">
        <div>
          <p className="text-4xl">{averageRating}</p>
          <Stars rating={Math.round(averageRating)} />
          <p className="text-xs">{totalReviews} review{totalReviews !== 1 ? "s" : ""}</p>
        </div>

        <div className="flex-1 space-y-2 md:space-y-3">
          {ratingStats.map((item) => {
            const percent = totalReviews > 0 ? (item.count / totalReviews) * 100 : 0;
            return (
              <div key={item.star} className="flex items-center gap-3">
                <span className="text-xs w-3">{item.star}</span>
                <div className="flex-1 h-1 bg-primary/10">
                  <div className="h-1 bg-muted" style={{ width: `${percent}%` }} />
                </div>
                <span className="text-xs w-4 text-right">{item.count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* REVIEWS */}
      <div>
        {visibleReviews.map((review) => (
          <div key={review.id} className="py-6 border-border border-b">
            <div className="flex justify-between">
              <div>
                <p className="font-medium">
                  {review.user
                    ? `${review.user.first_name} ${review.user.last_name}`
                    : "Anonymous"}
                </p>
                <p className="text-xs">
                  {review.created_at
                    ? new Date(review.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })
                    : ""}
                </p>
              </div>
              <Stars rating={review.rating} />
            </div>
            <p className="mt-3 text-sm">&quot;{review.comment}&quot;</p>
          </div>
        ))}
      </div>

      {/* BUTTON */}
      {reviews.length > 2 && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="border-border border px-8 py-3 text-xs tracking-widest hover:bg-black hover:text-white cursor-pointer"
          >
            {showAll ? "SEE LESS" : "SEE MORE"}
          </button>
        </div>
      )}
    </div>
  );
}
