"use client";

import { useState, useEffect } from "react";
import { myProductsAPI, Product } from "@/lib/api";
import { Loader2, Package, Trash2, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PostingsTab() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<number | null>(null);

  const fetchProducts = () => {
    setLoading(true);
    myProductsAPI
      .list()
      .then((res) => {
        const payload = res.data as any;
        
        if (Array.isArray(payload)) {
          setProducts(payload);
        } else if (payload?.my_products && Array.isArray(payload.my_products)) {
          setProducts(payload.my_products);
        } else if (payload?.data && Array.isArray(payload.data)) {
          setProducts(payload.data);
        } else if (payload?.products) {
          if (Array.isArray(payload.products)) {
            setProducts(payload.products);
          } else if (payload.products.data && Array.isArray(payload.products.data)) {
            setProducts(payload.products.data);
          } else {
            setProducts([]);
          }
        } else {
          setProducts([]);
        }
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleRemove = async (productId: number) => {
    if (!confirm("Are you sure you want to remove this listing?")) return;
    setRemoving(productId);
    try {
      await myProductsAPI.remove(productId);
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to remove product");
    } finally {
      setRemoving(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-muted" size={24} />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <Package size={40} className="mx-auto text-muted mb-4" />
        <p className="text-muted text-sm mb-2">You haven&apos;t listed any items yet.</p>
        <p className="text-muted text-xs">Start renting out your wardrobe to earn money!</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          const img =
            product.picture || product.thumbnail || "/assets/images/placeholder.png";
          const name = product.name || product.title || "Untitled";

          return (
            <div
              key={product.id}
              className="border border-border bg-white group"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                <Image
                  src={img}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="350px"
                />
                {product.is_rented && (
                  <span className="absolute top-3 left-3 bg-black text-white text-[10px] tracking-widest px-3 py-1 uppercase">
                    Rented
                  </span>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-medium text-sm truncate">{name}</h3>
                {product.brand && (
                  <p className="text-muted text-xs mt-1">{product.brand}</p>
                )}
                <p className="text-sm mt-2">
                  ${typeof product.price === "string" ? product.price : product.price?.toFixed(2)}
                  <span className="text-muted text-xs"> / rental</span>
                </p>

                <div className="flex gap-2 mt-4">
                  <Link
                    href={`/product-details?id=${product.id}`}
                    className="flex-1 flex items-center justify-center gap-1.5 border border-border px-3 py-2 text-xs hover:bg-secondary transition-colors"
                  >
                    <Eye size={13} />
                    View
                  </Link>
                  <button
                    onClick={() => handleRemove(product.id)}
                    disabled={removing === product.id}
                    className="flex items-center justify-center gap-1.5 border border-red-200 text-red-600 px-3 py-2 text-xs hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    {removing === product.id ? (
                      <Loader2 size={13} className="animate-spin" />
                    ) : (
                      <Trash2 size={13} />
                    )}
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}