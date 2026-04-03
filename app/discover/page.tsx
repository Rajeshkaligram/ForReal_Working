"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Search, SlidersHorizontal, X } from "lucide-react";
import { productsAPI, categoriesAPI, wishlistAPI, Product, Category, ProductSearchParams } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function DiscoverPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [wishlisted, setWishlisted] = useState<Set<number>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const { isLoggedIn } = useAuth();

  const [filters, setFilters] = useState<ProductSearchParams>({
    search: "",
    category_id: "",
    min_price: "",
    max_price: "",
    size: "",
  });
  const [searchInput, setSearchInput] = useState("");

  const fetchProducts = useCallback(async (params: ProductSearchParams) => {
    setLoading(true);
    try {
      const clean: Record<string, string> = {};
      for (const [k, v] of Object.entries(params)) {
        if (v) clean[k] = v;
      }
      const res = await productsAPI.search(clean);
      // API returns data.products (array) or data (array) depending on endpoint
      const d = res?.data as Record<string, unknown> | unknown[];
      const items: Product[] = Array.isArray(d)
        ? (d as Product[])
        : Array.isArray((d as Record<string, unknown>)?.products)
        ? ((d as { products: Product[] }).products)
        : [];
      setProducts(items);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts({});
    categoriesAPI.list().then((r) => {
      const cats = Array.isArray(r?.data) ? r.data : (r?.data as { categories?: unknown[] })?.categories || [];
      setCategories(cats as Category[]);
    }).catch(() => {});
  }, [fetchProducts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const next = { ...filters, search: searchInput };
    setFilters(next);
    fetchProducts(next);
  };

  const applyFilters = () => {
    fetchProducts(filters);
    setShowFilters(false);
  };

  const clearFilters = () => {
    const reset = { search: "", category_id: "", min_price: "", max_price: "", size: "" };
    setFilters(reset);
    setSearchInput("");
    fetchProducts({});
    setShowFilters(false);
  };

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
      console.error("Wishlist toggle error:", err);
    }
  };

  const getImage = (p: Product) =>
    p.picture || p.images?.[0] || p.thumbnail || "/assets/images/style2.jpeg";
  const getName = (p: Product) => p.name || p.title || "Untitled";

  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "One Size"];

  return (
    <section className="py-8 md:py-16 min-h-screen">
      <div className="container">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <p className="sec_tagline">BROWSE</p>
          <h1 className="sec_title mb-4">Discover Pieces</h1>

          {/* Search + Filter row */}
          <div className="flex gap-3 mt-6">
            <form onSubmit={handleSearch} className="flex flex-1 border border-border bg-white">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by brand, style, item..."
                className="flex-1 px-4 py-3 text-sm outline-none bg-transparent"
              />
              <button type="submit" className="px-4 text-muted hover:text-primary transition-colors">
                <Search size={18} />
              </button>
            </form>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 border border-border bg-white text-sm text-muted hover:text-primary transition-colors"
            >
              <SlidersHorizontal size={16} />
              <span className="hidden sm:block">Filters</span>
            </button>
          </div>

          {/* Filter panel */}
          {showFilters && (
            <div className="mt-4 p-6 border border-border bg-white grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Category */}
              <div>
                <label className="block text-xs tracking-widest uppercase text-muted mb-2">Category</label>
                <select
                  value={filters.category_id}
                  onChange={(e) => setFilters({ ...filters, category_id: e.target.value })}
                  className="w-full border border-border px-3 py-2 text-sm outline-none"
                >
                  <option value="">All Categories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              {/* Size */}
              <div>
                <label className="block text-xs tracking-widest uppercase text-muted mb-2">Size</label>
                <select
                  value={filters.size}
                  onChange={(e) => setFilters({ ...filters, size: e.target.value })}
                  className="w-full border border-border px-3 py-2 text-sm outline-none"
                >
                  <option value="">All Sizes</option>
                  {sizes.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              {/* Min Price */}
              <div>
                <label className="block text-xs tracking-widest uppercase text-muted mb-2">Min Price</label>
                <input
                  type="number"
                  value={filters.min_price}
                  onChange={(e) => setFilters({ ...filters, min_price: e.target.value })}
                  placeholder="$0"
                  className="w-full border border-border px-3 py-2 text-sm outline-none"
                />
              </div>
              {/* Max Price */}
              <div>
                <label className="block text-xs tracking-widest uppercase text-muted mb-2">Max Price</label>
                <input
                  type="number"
                  value={filters.max_price}
                  onChange={(e) => setFilters({ ...filters, max_price: e.target.value })}
                  placeholder="$500"
                  className="w-full border border-border px-3 py-2 text-sm outline-none"
                />
              </div>
              <div className="col-span-2 md:col-span-4 flex gap-3 pt-2">
                <button onClick={applyFilters} className="btn-bg px-6">Apply Filters</button>
                <button onClick={clearFilters} className="flex items-center gap-1 text-sm text-muted hover:text-primary">
                  <X size={14} /> Clear
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results count */}
        {!loading && (
          <p className="text-xs text-muted mb-6 tracking-widest uppercase">
            {products.length} piece{products.length !== 1 ? "s" : ""} found
          </p>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-border h-72 md:h-96 w-full" />
                <div className="p-3 space-y-2">
                  <div className="bg-border h-2 w-20 rounded" />
                  <div className="bg-border h-3 w-32 rounded" />
                  <div className="bg-border h-2 w-14 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-muted text-lg mb-4">No pieces found</p>
            <button onClick={clearFilters} className="btn-bg px-8">Browse All</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            {products.map((item) => (
              <div
                key={item.id}
                className="group bg-white transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-lg cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={getImage(item)}
                    alt={getName(item)}
                    width={400}
                    height={500}
                    className="w-full h-60 sm:h-80 md:h-100 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/assets/images/style2.jpeg";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-500" />
                  {/* Wishlist */}
                  <button
                    onClick={(e) => toggleWishlist(item.id, e)}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm transition-all duration-300 hover:scale-110"
                  >
                    <Heart
                      size={14}
                      className={wishlisted.has(item.id) ? "fill-black stroke-black" : ""}
                    />
                  </button>
                  {/* Hover CTA */}
                  <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
                    <Link
                      href={`/product-details?id=${item.id}`}
                      className="pointer-events-auto text-center translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all cursor-pointer duration-500 ease-out mb-4 bg-black text-white text-xs px-6 py-2.5 tracking-wide uppercase w-[90%] hover:bg-maroon"
                    >
                      View Item
                    </Link>
                  </div>
                </div>
                <div className="p-2 md:p-4">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-muted">
                    {item.brand || item.category_name || item.added_by?.first_name || "FoReal"}
                  </p>
                  <h3 className="text-sm md:text-base font-medium">{getName(item)}</h3>
                  <p className="text-sm mt-1">
                    {item.price ? `$${item.price}` : "—"}{" "}
                    <span className="text-muted text-xs">/ day</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
