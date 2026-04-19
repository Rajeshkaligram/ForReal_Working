"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { DateRange } from "react-day-picker";

import {
  productsAPI,
  reviewsAPI,
  localCartAPI,
  cartAPI,
  wishlistAPI,
  Product,
  Review,
} from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

import ImageGallery from "@/components/product-details/ImageGallery";
import CalendarBox from "@/components/product-details/CalendarBox";
import Category from "@/components/product-details/Category";
import ProductInfo from "@/components/product-details/ProductInfo";
import RelatedProducts from "@/components/product-details/RelatedProducts";

import { Loader2 } from "lucide-react";

export default function ProductPage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary" size={32} /></div>}>
      <ProductContent />
    </Suspense>
  );
}

function ProductContent() {
  const params = useSearchParams();
  const productId = params.get("id");

  const { isLoggedIn } = useAuth();

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // Cart / Wishlist State
  const [wishlisted, setWishlisted] = useState(false);
  const [wishLoading, setWishLoading] = useState(false);

  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [addingToCart, setAddingToCart] = useState(false);
  const [cartMsg, setCartMsg] = useState("");

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    productsAPI
      .detail(productId)
      .then((res) => {
        const pd = res?.data?.product_detail;
        if (!pd) {
          setProduct(null);
          return;
        }

        // Map backend images to frontend format
        let allPhotos: string[] = [];
        if (pd.picture) allPhotos.push(pd.picture);
        if (pd.product_photos) {
          allPhotos = [
            ...allPhotos,
            ...pd.product_photos.map((p: any) => p.sub_photo),
          ];
        }
        pd.images = allPhotos.length > 0 ? allPhotos : ["/assets/images/p1.jpeg"];

        setProduct(pd);

        // Reviews
        if (pd.reviews && pd.reviews.length > 0) {
          setReviews(pd.reviews);
        }
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));

    // Also fetch reviews specifically just in case
    reviewsAPI
      .list(productId)
      .then((res) => {
        if (res?.data && res.data.length > 0) {
          setReviews(res.data);
        }
      })
      .catch(() => { });
  }, [productId]);

  // Once product is loaded and user is logged in, check wishlist explicitly
  useEffect(() => {
    if (isLoggedIn && product) {
      wishlistAPI.get().then((res: any) => {
        let items: any[] = [];
        if (Array.isArray(res)) {
          items = res;
        } else if (Array.isArray(res?.data)) {
          items = res.data;
        } else if (res?.data?.wishlist && Array.isArray(res.data.wishlist)) {
          items = res.data.wishlist;
        }
        const isW = items.some((i: any) => String(i.product?.id || i.id) === String(product.id));
        setWishlisted(isW);
      }).catch(() => {});
    }
  }, [isLoggedIn, product]);

  const toggleWishlist = async () => {
    if (!isLoggedIn || !product || wishLoading) {
      if (!isLoggedIn) alert("Please sign in to add to wishlist");
      return;
    }
    setWishLoading(true);
    try {
      if (wishlisted) {
        // If it was already true, click removes it
        await wishlistAPI.remove(product.id);
        setWishlisted(false);
      } else {
        // If false, click adds it
        await wishlistAPI.add(product.id);
        setWishlisted(true);
      }
    } catch (err: any) {
      console.error("Wishlist error:", err);
      const msg = err.message || "";
      if (msg.toLowerCase().includes("already")) {
        // Assume it means "already added". So we can just silently act like it worked!
        setWishlisted(true);
      } else {
        // Alert the user so they know about other failures
        alert(msg || "Failed to add to wishlist");
      }
    } finally {
      setWishLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      setCartMsg("Please sign in to rent.");
      return;
    }
    if (!dateRange?.from || !dateRange?.to) {
      setCartMsg("Please select rental dates.");
      return;
    }

    // Convert to strict YYYY-MM-DD
    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const startDate = formatDate(dateRange.from);
    const endDate = formatDate(dateRange.to);

    setAddingToCart(true);
    setCartMsg("");

    const diffDays = Math.max(Math.ceil(Math.abs(dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)) + 1, 0);
    const price = product!.price ? Number(product!.price) : 0;
    const cleaningPrice = product!.cleaning_price ? Number(product!.cleaning_price) : 1.00; // default $1.00 fallback if API doesn't specify but implies it
    const orderTotal = (price * diffDays) + cleaningPrice;

    try {
      await cartAPI.add({
        product_id: product!.id.toString(),
        rental_start_date: startDate,
        rental_end_date: endDate,
        delivery_option: "Regular mail",
        street_number: "N/A",
        address: "N/A",
        city: "N/A",
        state: "N/A",
        postal_code: "00000",
        contact_number: "0000000000",
        country: "US",
      });

      localCartAPI.add({
        cart_id: Date.now().toString(),
        product_id: product!.id,
        product_detail: product!,
        rental_start_date: startDate,
        rental_end_date: endDate,
        total_price: price * diffDays,
      });

      setCartMsg("✓ Added to cart successfully!");
    } catch (err: unknown) {
      localCartAPI.add({
        cart_id: Date.now().toString(),
        product_id: product!.id,
        product_detail: product!,
        rental_start_date: startDate,
        rental_end_date: endDate,
        total_price: orderTotal,
      });

      const msg = err instanceof Error ? err.message : "";
      if (msg.includes("already") || msg.includes("exists")) {
        setCartMsg("✓ Item already in cart!");
      } else {
        setCartMsg("✓ Added to cart (saved locally)");
      }
    } finally {
      setAddingToCart(false);
    }
  };

  // Calculated rental total
  const rentalDays = dateRange?.from && dateRange?.to
    ? Math.max(Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)) + 1, 0)
    : 0;
  const dailyPrice = product?.price ? Number(product.price) : 0;
  const cleaningFee = product?.cleaning_price ? Number(product.cleaning_price) : (product?.id ? 1.00 : 0);
  const rentalTotal = dailyPrice * rentalDays;
  const totalPrice = rentalDays > 0 ? rentalTotal + cleaningFee : 0;

  // ─── LOADING SKELETON ───
  if (loading) {
    return (
      <section className="py-12 md:py-16 min-h-screen" style={{ backgroundColor: 'rgb(248 246 243)' }}>
        <div className="container max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <div className="space-y-4">
              <div className="bg-gray-100 animate-pulse aspect-[4/5] w-full" />
            </div>
            <div className="space-y-5 pt-4">
              <div className="bg-gray-100 animate-pulse h-3 w-24 rounded" />
              <div className="bg-gray-100 animate-pulse h-8 w-3/4 rounded" />
              <div className="bg-gray-100 animate-pulse h-4 w-1/3 rounded" />
              <div className="bg-gray-100 animate-pulse h-32 w-full mt-10" />
              <div className="bg-gray-100 animate-pulse h-12 w-full mt-10" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ─── NOT FOUND ───
  if (!product) {
    return (
      <section className="py-16 text-center min-h-screen">
        <p className="text-muted text-lg mb-4">Product not found.</p>
        <Link href="/discover" className="btn-bg px-8 py-3 bg-black text-white text-xs tracking-widest uppercase">
          Browse All Pieces
        </Link>
      </section>
    );
  }

  // Tag extraction for Category
  let mappedTags = ["DATE NIGHT", "WEEKEND", "EVENING EVENTS"];
  if (product.season) mappedTags.push(product.season.toUpperCase());
  if (product.condition) mappedTags.push(product.condition.toUpperCase());
  if (product.color) mappedTags.push(product.color.toUpperCase());

  return (
    <div className="text-primary pb-16 pt-24 lg:pt-15" style={{ backgroundColor: 'rgb(248 246 243)' }}>
      <div className="container max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-8 lg:pt-12">
        <button onClick={() => window.history.back()} className="flex items-center text-xs tracking-[0.2em] text-muted uppercase hover:text-black transition-colors mb-6 pb-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m15 18-6-6 6-6" /></svg>
          BACK
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 w-full">
          {/* L E F T   C O L U M N */}
          <div className="flex flex-col space-y-0">
            <ImageGallery
              images={product.images || []}
              isRented={product.is_rented}
              wishlisted={wishlisted}
              onWishlistToggle={toggleWishlist}
              wishLoading={wishLoading}
            />
            <CalendarBox
              unavailableFrom={product.unavailable_for_rent_from}
              unavailableTo={product.unavailable_for_rent_to}
              dateRange={dateRange}
              setDateRange={setDateRange}
            />
            <Category tags={mappedTags} />
          </div>

          {/* R I G H T   C O L U M N */}
          <div className="flex flex-col space-y-6">
            <ProductInfo
              product={product}
              rentalDays={rentalDays}
              dailyPrice={dailyPrice}
              totalPrice={totalPrice}
              addingToCart={addingToCart}
              onAddToCart={handleAddToCart}
              cartMsg={cartMsg}
            />
          </div>
        </div>

        {/* B O T T O M   S E C T I O N */}
        <div className="mt-20">
          <RelatedProducts
            currentId={product.id}
            categoryId={product.category_id}
            categoryName={product.category_name}
          />
        </div>
      </div>
    </div>
  );
}
