"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { productsAPI, Product } from "@/lib/api";

interface RelatedProductsProps {
  currentId?: number;
  categoryId?: number;
  categoryName?: string;
}

export default function RelatedProducts({ currentId, categoryId, categoryName }: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = categoryId ? { category_id: String(categoryId) } : {};
    productsAPI
      .search(params)
      .then((res) => {
        const d = res?.data as Record<string, unknown> | unknown[];
        const all: Product[] = Array.isArray(d)
          ? (d as Product[])
          : Array.isArray((d as Record<string, unknown>)?.products)
          ? ((d as { products: Product[] }).products)
          : [];
        const filtered = all.filter((p) => p.id !== currentId).slice(0, 4);
        setProducts(filtered);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [currentId, categoryId]);

  if (loading) {
    return (
      <div className="container mt-16 mb-8">
        <p className="sec_tagline">MORE LIKE THIS</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-border h-64 w-full" />
              <div className="mt-2 space-y-1">
                <div className="bg-border h-2 w-20 rounded" />
                <div className="bg-border h-3 w-32 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!products.length) return null;

  const getImage = (p: Product) => p.picture || p.images?.[0] || p.thumbnail || "/assets/images/p1.jpeg";
  const getName = (p: Product) => p.name || p.title || "Untitled";

  return (
    <div className="container mt-16 mb-8">
      <p className="sec_tagline">MORE LIKE THIS</p>
      <h2 className="sec_title mb-8">You might also like</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {products.map((item) => (
          <Link
            key={item.id}
            href={`/product-details?id=${item.id}`}
            className="group bg-white hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="relative overflow-hidden">
              <Image
                src={getImage(item)}
                alt={getName(item)}
                width={400}
                height={500}
                className="w-full h-60 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/assets/images/p1.jpeg";
                }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
            </div>
            <div className="p-3">
              <p className="text-[10px] tracking-[0.2em] uppercase text-muted">
                {item.brand || item.category_name || item.added_by?.first_name || "FoReal"}
              </p>
              <p className="text-sm font-medium mt-0.5 truncate">{getName(item)}</p>
              <p className="text-sm mt-1">
                {item.price ? `$${item.price}` : "—"}
                <span className="text-xs text-muted"> /day</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}