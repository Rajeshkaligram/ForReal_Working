"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Trash2, ChevronLeft, Loader2 } from "lucide-react";
import { localCartAPI, LocalCartItem } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

// Robustly format a date string for display, handling YYYY-MM-DD, DD-MM-YYYY, etc.
function formatCartDate(dateStr: string): string {
  if (!dateStr) return "—";
  // Try YYYY-MM-DD (from HTML date input)
  const isoMatch = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) return dateStr; // Already clean YYYY-MM-DD
  // Try DD-MM-YYYY
  const dmy = dateStr.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (dmy) return `${dmy[3]}-${dmy[2]}-${dmy[1]}`;
  // Try MM/DD/YYYY
  const mdy = dateStr.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (mdy) return `${mdy[3]}-${mdy[1]}-${mdy[2]}`;
  // Fallback: try to parse as Date
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) return d.toISOString().split("T")[0];
  return dateStr;
}

export default function CartPage() {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  const [cartItems, setCartItems] = useState<LocalCartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removingId, setRemovingId] = useState<string | number | null>(null);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/auth/login");
      return;
    }

    if (isLoggedIn) {
      fetchCart();
    }
  }, [isLoggedIn, isLoading, router]);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const items = localCartAPI.get();
      setCartItems(items);
    } catch (err: any) {
      setError("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId: string | number) => {
    setRemovingId(productId);
    try {
      localCartAPI.remove(productId);
      setCartItems((prev) => prev.filter((item) => item.product_id !== Number(productId)));
    } catch (err: any) {
      alert("Failed to remove item.");
    } finally {
      setRemovingId(null);
    }
  };

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <section className="py-12 md:py-20 min-h-screen bg-neutral-50/50">
      <div className="container max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Link href="/discover" className="text-muted hover:text-primary transition-colors">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-3xl font-serif font-medium flex items-center gap-3">
            <ShoppingBag size={28} /> My Bag
          </h1>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded mb-6 text-sm text-center">
            {error}
          </div>
        )}

        {cartItems.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-xl shadow-sm border border-border">
            <ShoppingBag size={48} className="mx-auto text-muted-foreground mb-4 opacity-20" />
            <h2 className="text-xl font-medium mb-2">Your bag is empty</h2>
            <p className="text-muted text-sm mb-6">Looks like you haven't added anything to rent yet.</p>
            <Link href="/discover" className="btn-bg px-8">
              Start Browsing
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => {
                const pd = item.product_detail || (item as any).product;
                const productImages = pd?.images || [];
                const imgUrl = productImages.length > 0 ? productImages[0] : (pd?.picture || "/assets/images/p1.jpeg");
                
                return (
                  <div key={item.cart_id || item.product_id} className="bg-white p-4 rounded-xl border border-border flex gap-4 md:gap-6 relative group">
                    <div className="w-24 h-32 md:w-32 md:h-40 flex-shrink-0 bg-neutral-100 rounded-lg overflow-hidden relative">
                      <Image
                        src={imgUrl}
                        alt={pd?.name || pd?.title || "Product"}
                        fill
                        className="object-cover"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/assets/images/p1.jpeg"; }}
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <p className="text-xs text-muted uppercase tracking-wider mb-1">
                        {pd?.brand || 'Rent A Suit'}
                      </p>
                      <h3 className="text-lg font-medium font-serif leading-tight mb-2 pr-8">
                        {pd?.name || pd?.title}
                      </h3>
                      
                      <div className="space-y-1 mb-4 text-sm">
                        <p className="text-muted">Rental Starts: <span className="text-black font-medium">{formatCartDate(item.rental_start_date)}</span></p>
                        <p className="text-muted">Rental Ends: <span className="text-black font-medium">{formatCartDate(item.rental_end_date)}</span></p>
                      </div>

                      <p className="text-lg font-medium">
                        ${item.total_price || pd?.price} <span className="text-xs text-muted font-normal">/ day</span>
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => handleRemove(item.product_id || (item as any).product?.id)}
                      disabled={removingId === (item.product_id || (item as any).product?.id)}
                      className="absolute top-4 right-4 p-2 text-muted-foreground hover:bg-red-50 hover:text-red-500 rounded-full transition-colors disabled:opacity-50"
                    >
                      {removingId === (item.product_id || (item as any).product?.id) ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl border border-border shadow-sm sticky top-24">
                <h3 className="text-lg font-medium mb-4">Summary</h3>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted text-sm">Items</span>
                  <span className="font-medium">{cartItems.length}</span>
                </div>
                <div className="flex justify-between items-center py-4 text-lg font-medium">
                  <span>Estimated Total</span>
                  <span>
                    ${cartItems.reduce((acc, item) => acc + (Number(item.total_price) || Number(item.product_detail?.price || (item as any).product?.price) || 0), 0).toFixed(2)}
                  </span>
                </div>
                
                <Link href="/checkout" className="btn-bg w-full block text-center mt-4">
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
