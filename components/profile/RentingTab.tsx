"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { rentedAPI, RentedProduct } from "@/lib/api";
import { Package2, Clock } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-800",
  Active: "bg-green-100 text-green-800",
  Completed: "bg-blue-100 text-blue-800",
  Cancelled: "bg-gray-100 text-gray-600",
  Declined: "bg-red-100 text-red-700",
};

export default function RentingTab() {
  const [items, setItems] = useState<RentedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStatus, setActiveStatus] = useState("all");

  const statuses = ["all", "Pending", "Active", "Completed", "Cancelled"];

  useEffect(() => {
    rentedAPI
      .list()
      .then((res) => setItems(res?.data || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    activeStatus === "all"
      ? items
      : items.filter((i) => i.status === activeStatus);

  const getImage = (item: RentedProduct) => {
    const imgs = item.product?.images || [];
    return imgs.length > 0 ? imgs[0] : (item.product?.picture || "/assets/images/p1.jpeg");
  };

  return (
    <div>
      {/* Status filter tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setActiveStatus(s)}
            className={`px-4 py-1.5 text-xs tracking-widest uppercase whitespace-nowrap border transition-colors ${
              activeStatus === s
                ? "bg-primary text-white border-primary"
                : "border-border text-muted hover:border-primary hover:text-primary"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse flex gap-4 p-4 border border-border bg-white">
              <div className="w-20 h-24 bg-border flex-shrink-0" />
              <div className="flex-1 space-y-2 pt-2">
                <div className="h-3 bg-border w-32 rounded" />
                <div className="h-4 bg-border w-48 rounded" />
                <div className="h-3 bg-border w-24 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <Package2 size={40} className="mx-auto mb-4 text-muted opacity-40" />
          <p className="text-muted mb-4">No rentals found</p>
          <Link href="/discover" className="btn-bg px-8">
            Browse Pieces
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 p-4 border border-border bg-white hover:border-primary/30 transition-colors"
            >
              {/* Image */}
              <Image
                src={getImage(item)}
                alt={item.product?.name || item.product?.title || "Product"}
                width={80}
                height={96}
                className="w-20 h-24 object-cover flex-shrink-0"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/assets/images/p1.jpeg";
                }}
              />

              {/* Details */}
              <div className="flex-1 min-w-0">
                <p className="text-[10px] tracking-widest uppercase text-muted mb-1">
                  {item.product?.brand || "FoReal"}
                </p>
                <h3 className="font-medium text-sm truncate">
                  {item.product?.name || item.product?.title || "Rental item"}
                </h3>

                <div className="flex items-center gap-3 mt-2 text-xs text-muted">
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    {item.rental_start_date} → {item.rental_end_date}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      STATUS_COLORS[item.status] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {item.status}
                  </span>
                  <span className="font-medium text-sm">
                    ${item.total_price}
                    <span className="text-xs text-muted font-normal"> total</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
