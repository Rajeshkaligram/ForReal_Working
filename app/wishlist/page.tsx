"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Trash2, ShoppingBag } from "lucide-react";
import { wishlistAPI, cartAPI, WishlistItem } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function WishlistPage() {
  const { isLoggedIn } = useAuth();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<Set<number>>(new Set());
  const [addingToCart, setAddingToCart] = useState<Set<number>>(new Set());
  const [debugLog, setDebugLog] = useState<string>("");

  useEffect(() => {
    if (!isLoggedIn) { setLoading(false); return; }
    wishlistAPI
      .get()
      .then((res: any) => {
        setDebugLog(JSON.stringify(res, null, 2));
        console.log("Wishlist fetch response:", res);
        let fetchedItems: WishlistItem[] = [];
        if (Array.isArray(res)) {
          fetchedItems = res;
        } else if (Array.isArray(res?.data)) {
          fetchedItems = res.data;
        } else if (res?.data?.wishlist && Array.isArray(res.data.wishlist)) {
          fetchedItems = res.data.wishlist;
        }
        setItems(fetchedItems);
      })
      .catch((err) => {
        console.error("Failed to load wishlist:", err);
        setDebugLog("ERROR: " + err?.message + "\n" + JSON.stringify(err?.data || {}));
        setItems([]);
      })
      .finally(() => setLoading(false));
  }, [isLoggedIn]);

  const handleRemove = async (item: WishlistItem) => {
    setRemoving((prev) => new Set(prev).add(item.id));
    try {
      await wishlistAPI.remove(item.product?.id || item.id);
      setItems((prev) => prev.filter((i) => i.id !== item.id));
    } catch (err) {
      console.error("Failed to remove item", err);
    }
    setRemoving((prev) => { const n = new Set(prev); n.delete(item.id); return n; });
  };

  const handleAddToCart = async (item: WishlistItem) => {
    setAddingToCart((prev) => new Set(prev).add(item.id));
    try {
      const today = new Date();
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);
      await cartAPI.add({
        product_id: item.product.id,
        rental_start_date: today.toISOString().split("T")[0],
        rental_end_date: nextWeek.toISOString().split("T")[0],
      });
    } catch {}
    setAddingToCart((prev) => { const n = new Set(prev); n.delete(item.id); return n; });
  };

  const getImage = (item: any) => {
    const p = item.product || item;
    const imgs = p?.images || [];
    return imgs.length > 0 ? imgs[0] : (p?.picture || "/assets/images/style2.jpeg");
  };

  return (
    <section className="py-8 md:py-16 min-h-screen">
      <div className="container">
        <p className="sec_tagline">SAVED</p>
        <h1 className="sec_title mb-8">Your Wishlist</h1>

        {!isLoggedIn ? (
          <div className="text-center py-24">
            <Heart size={48} className="mx-auto mb-4 text-muted opacity-30" />
            <p className="text-muted mb-6">Sign in to view and manage your wishlist</p>
            <Link href="/auth/login" className="btn-bg px-10">Sign In</Link>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-border h-72 w-full" />
                <div className="mt-3 space-y-2">
                  <div className="bg-border h-2 w-20 rounded" />
                  <div className="bg-border h-3 w-32 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-24">
            <Heart size={48} className="mx-auto mb-4 text-muted opacity-30" />
            <p className="text-muted mb-2">Your wishlist is empty</p>
            <p className="text-xs text-muted mb-8">Save pieces you love and come back to rent them.</p>
            <Link href="/discover" className="btn-bg px-10">Discover Pieces</Link>
          </div>
        ) : (
          <>
            <p className="text-xs text-muted tracking-widest uppercase mb-6">
              {items.length} piece{items.length !== 1 ? "s" : ""} saved
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {items.map((item: any) => {
                const p = item.product || item;
                return (
                <div key={item.id || p.id} className="group bg-white relative">
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={getImage(item)}
                      alt={p.name || p.title || "Wishlist item"}
                      width={400}
                      height={500}
                      className="w-full h-60 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/assets/images/style2.jpeg";
                      }}
                    />
                    {/* Remove button */}
                    <button
                      onClick={() => handleRemove(item)}
                      disabled={removing.has(item.id || p.id)}
                      className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow hover:bg-red-50 transition-colors disabled:opacity-50"
                      title="Remove from wishlist"
                    >
                      <Trash2 size={14} className="text-red-500" />
                    </button>
                    {/* Hover CTA */}
                    <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
                      <Link
                        href={`/product-details?id=${p.id}`}
                        className="pointer-events-auto text-center translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 mb-4 bg-black text-white text-xs px-6 py-2.5 tracking-wide uppercase w-[90%]"
                      >
                        View Item
                      </Link>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-muted">
                      {p.brand || "FoReal"}
                    </p>
                    <h3 className="text-sm font-medium mt-0.5 truncate">
                      {p.name || p.title || "Untitled Piece"}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-sm font-medium">
                        {p.price ? `$${p.price}` : "—"}
                        <span className="text-xs text-muted font-normal"> /day</span>
                      </p>
                      <button
                        onClick={() => handleAddToCart(item)}
                        disabled={addingToCart.has(item.id || p.id)}
                        className="p-1.5 border border-border hover:border-primary hover:text-primary transition-colors disabled:opacity-50"
                        title="Add to cart"
                      >
                        <ShoppingBag size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              )})}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
