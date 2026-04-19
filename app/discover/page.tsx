"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Search, ChevronDown, Grid3X3, List, X, ChevronLeft, ChevronRight, Calendar, MapPin, Loader2 } from "lucide-react";
import { productsAPI, categoriesAPI, wishlistAPI, Product, Category, ProductSearchParams } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

interface CategoryTab {
  id: string;
  name: string;
}

export default function DiscoverPage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary" size={32} /></div>}>
      <DiscoverContent />
    </Suspense>
  );
}

function DiscoverContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryTab[]>([]);
  const [loading, setLoading] = useState(true);
  const [wishlisted, setWishlisted] = useState<Set<number>>(new Set());
  const { isLoggedIn } = useAuth();

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Active category tab
  const [activeCategory, setActiveCategory] = useState("");

  // View mode: grid or list
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filters
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<ProductSearchParams>({
    search: "",
    category_id: "",
    price_min: "",
    price_max: "",
    size: "",
    location: "",
    season: "",
    sort: "",
    page: "1",
  });
  const [searchInput, setSearchInput] = useState("");

  const [filterDates, setFilterDates] = useState({ from: "", to: "" });
  const [filterLocation, setFilterLocation] = useState("");
  const [filterStyles, setFilterStyles] = useState<string[]>([]);
  const [filterSizes, setFilterSizes] = useState<string[]>([]);
  const [filterPriceRange, setFilterPriceRange] = useState<string>("");
  const [filterSort, setFilterSort] = useState<string>("Trending");

  const stylesList = ["Minimalist", "Romantic", "Statement", "Classic"];
  const sizesList = ["XS", "S", "M", "L", "XL", "One size"];
  const priceRanges = ["Under €30", "€30 - €50", "€50 - €80", "€80+"];
  const sortOptions = ["Featured", "Trending", "Newest", "Price: Low to high", "Price: High to low"];

  const toggleArrayItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setter(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  // ── Fetch products ──
  const fetchProducts = useCallback(async (params: ProductSearchParams) => {
    setLoading(true);
    try {
      const clean: Record<string, string> = {
        page: params.page || "1",
        results_per_page: "20",
      };
      for (const [k, v] of Object.entries(params)) {
        if (v && k !== "page") clean[k] = v;
      }

      const res = await productsAPI.search(clean);
      const d = res?.data as Record<string, unknown> | unknown[];
      const items: Product[] = Array.isArray(d)
        ? (d as Product[])
        : Array.isArray((d as Record<string, unknown>)?.products)
          ? ((d as { products: Product[] }).products)
          : [];
      setProducts(items);

      if (!Array.isArray(d) && d?.total !== undefined) {
        const total = Number(d.total) || 0;
        setTotalItems(total);
        setTotalPages(Math.ceil(total / 20));
      } else {
        setTotalItems(items.length);
        setTotalPages(1);
      }
    } catch {
      setProducts([]);
      setTotalItems(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Load categories + initial products ──
  useEffect(() => {
    fetchProducts({ page: "1" });

    // Fetch categories from API
    categoriesAPI.list().then((r: any) => {
      let cats: any[] = [];
      if (Array.isArray(r?.data)) {
        cats = r.data;
      } else if (r?.data?.categories && Array.isArray(r.data.categories)) {
        cats = r.data.categories;
      }
      const mapped: CategoryTab[] = cats.map((c: any) => ({
        id: String(c.id),
        name: c.name,
      }));
      setCategories(mapped);
    }).catch(() => { });
  }, [fetchProducts]);

  // ── Handlers ──
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setActiveCategory("");
    const next = { ...filters, search: searchInput, category_id: "", page: "1" };
    setFilters(next);
    fetchProducts(next);
  };

  const handleCategoryClick = (catId: string) => {
    setActiveCategory(catId);
    setPage(1);
    setSearchInput("");
    const next: ProductSearchParams = {
      search: "",
      category_id: catId,
      price_min: filters.price_min,
      price_max: filters.price_max,
      size: filters.size,
      location: filters.location,
      season: filters.season,
      sort: filters.sort,
      page: "1",
    };
    setFilters(next);
    fetchProducts(next);
  };

  const applyFilters = () => {
    setPage(1);

    let price_min = "";
    let price_max = "";
    if (filterPriceRange) {
      if (filterPriceRange === "Under €30") price_max = "30";
      if (filterPriceRange === "€30 - €50") { price_min = "30"; price_max = "50"; }
      if (filterPriceRange === "€50 - €80") { price_min = "50"; price_max = "80"; }
      if (filterPriceRange === "€80+") price_min = "80";
    }

    let sortVal = "";
    if (filterSort === "Trending") sortVal = "trending";
    if (filterSort === "Newest") sortVal = "newest";
    if (filterSort === "Price: Low to high") sortVal = "price_asc";
    if (filterSort === "Price: High to low") sortVal = "price_desc";

    const next = {
      ...filters,
      category_id: activeCategory,
      page: "1",
      price_min,
      price_max,
      size: filterSizes.length > 0 ? filterSizes.join(",") : "",
      location: filterLocation,
      season: filterStyles.length > 0 ? filterStyles.join(",") : "",
      sort: sortVal,
    };

    setFilters(next);
    fetchProducts(next);
    setShowFilters(false);
  };

  const clearFilters = () => {
    const reset: ProductSearchParams = { search: "", category_id: "", price_min: "", price_max: "", size: "", location: "", season: "", sort: "", page: "1" };
    setFilters(reset);
    setSearchInput("");
    setActiveCategory("");
    setPage(1);

    setFilterDates({ from: "", to: "" });
    setFilterLocation("");
    setFilterStyles([]);
    setFilterSizes([]);
    setFilterPriceRange("");
    setFilterSort("Trending");

    fetchProducts(reset);
    setShowFilters(false);
  };

  const goToPage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    const next = { ...filters, page: newPage.toString() };
    setFilters(next);
    fetchProducts(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleWishlist = async (productId: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
  const getBrand = (p: Product) =>
    p.designer || p.brand || p.added_by?.first_name?.toUpperCase() || "FOREAL";

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("...");
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
        pages.push(i);
      }
      if (page < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <section className="min-h-screen pt-12 lg:pt-18 pb-16" style={{ backgroundColor: 'rgb(248 246 243)' }}>
      <div className="container max-w-[1400px] mx-auto px-4 md:px-8">

        {/* ── HEADER ── */}
        <div className="mb-10">
          <p
            className="text-[11px] tracking-[0.3em] uppercase mb-3"
            style={{ color: "#8B7D6B" }}
          >
            DISCOVER
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h1
              className="text-3xl md:text-4xl lg:text-[42px] leading-tight"
              style={{ fontFamily: "'Playfair Display', 'Georgia', serif", fontWeight: 400 }}
            >
              Browse the Collection
            </h1>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="flex items-center gap-3 lg:w-[420px]">
              <div className="flex items-center flex-1 border-b border-gray-300 pb-1">
                <Search size={16} className="text-gray-400 mr-3 flex-shrink-0" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search brands, styles, locations..."
                  className="flex-1 text-sm outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
                />
              </div>
            </form>
          </div>
        </div>

        {/* ── CATEGORY TABS + FILTER ── */}
        <div className="flex items-center justify-between border-b border-gray-200 mb-8">
          <div className="flex items-center gap-0 overflow-x-auto no-scrollbar">
            {/* "All" tab */}
            <button
              onClick={() => handleCategoryClick("")}
              className={`relative px-5 py-3 text-sm whitespace-nowrap transition-colors ${activeCategory === ""
                ? "text-black font-medium"
                : "text-gray-500 hover:text-black"
                }`}
            >
              All
              {activeCategory === "" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-black" />
              )}
            </button>

            {/* Dynamic category tabs */}
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`relative px-5 py-3 text-sm whitespace-nowrap transition-colors ${activeCategory === cat.id
                  ? "text-black font-medium"
                  : "text-gray-500 hover:text-black"
                  }`}
              >
                {cat.name}
                {activeCategory === cat.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-black" />
                )}
              </button>
            ))}
          </div>

          {/* Filter button */}
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1.5 px-4 py-3 text-sm text-gray-600 hover:text-black transition-colors flex-shrink-0"
            >
              Filter
              <ChevronDown size={14} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </button>

            {/* ── FILTER DROPDOWN ── */}
            {showFilters && (
              <div className="absolute right-0 top-full mt-2 w-[380px] max-h-[75vh] overflow-y-auto bg-[#fafafa] border border-gray-200 shadow-2xl z-50 rounded-sm flex flex-col no-scrollbar">
                <div className="p-6">
                  <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase mb-8 text-black">
                    Filter & Sort
                  </h3>

                  {/* Rental Dates */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Calendar size={14} className="text-gray-400" />
                      <h4 className="text-[10px] font-semibold tracking-[0.15em] text-gray-500 uppercase">
                        Rental Dates
                      </h4>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-[11px] text-gray-400 mb-1.5">From</label>
                        <div className="relative">
                          <input
                            type="date"
                            value={filterDates.from}
                            onChange={(e) => setFilterDates({ ...filterDates, from: e.target.value })}
                            className="w-full text-sm border border-gray-200 bg-white px-3 py-2.5 outline-none focus:border-black transition-colors"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <label className="block text-[11px] text-gray-400 mb-1.5">To</label>
                        <div className="relative">
                          <input
                            type="date"
                            value={filterDates.to}
                            onChange={(e) => setFilterDates({ ...filterDates, to: e.target.value })}
                            className="w-full text-sm border border-gray-200 bg-white px-3 py-2.5 outline-none focus:border-black transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-px bg-gray-200/60 my-6"></div>

                  {/* Location */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin size={14} className="text-gray-400" />
                      <h4 className="text-[10px] font-semibold tracking-[0.15em] text-gray-500 uppercase">
                        Location
                      </h4>
                    </div>
                    <div className="relative">
                      <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search city or location..."
                        value={filterLocation}
                        onChange={(e) => setFilterLocation(e.target.value)}
                        className="w-full text-sm border border-gray-200 bg-white pl-9 pr-3 py-2.5 outline-none focus:border-black transition-colors"
                      />
                    </div>
                  </div>

                  <div className="w-full h-px bg-gray-200/60 my-6"></div>

                  {/* Style */}
                  <div className="mb-6">
                    <h4 className="text-[10px] font-semibold tracking-[0.15em] text-gray-500 uppercase mb-4">
                      Style
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {stylesList.map((style) => (
                        <button
                          key={style}
                          className={`px-4 py-2 text-xs border transition-colors ${filterStyles.includes(style)
                            ? "border-black bg-[#111] text-white"
                            : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                            }`}
                          onClick={() => toggleArrayItem(setFilterStyles, style)}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="w-full h-px bg-gray-200/60 my-6"></div>

                  {/* Size */}
                  <div className="mb-6">
                    <h4 className="text-[10px] font-semibold tracking-[0.15em] text-gray-500 uppercase mb-4">
                      Size
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {sizesList.map((size) => (
                        <button
                          key={size}
                          className={`px-4 py-2 text-xs border transition-colors ${filterSizes.includes(size)
                            ? "border-black bg-[#111] text-white"
                            : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                            }`}
                          onClick={() => toggleArrayItem(setFilterSizes, size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="w-full h-px bg-gray-200/60 my-6"></div>

                  {/* Price / Day */}
                  <div className="mb-6">
                    <h4 className="text-[10px] font-semibold tracking-[0.15em] text-gray-500 uppercase mb-4">
                      Price / Day
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {priceRanges.map((price) => (
                        <button
                          key={price}
                          className={`px-4 py-2 text-xs border transition-colors ${filterPriceRange === price
                            ? "border-black bg-[#111] text-white"
                            : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                            }`}
                          onClick={() => setFilterPriceRange(filterPriceRange === price ? "" : price)}
                        >
                          {price}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="w-full h-px bg-gray-200/60 my-6"></div>

                  {/* Sort By */}
                  <div className="mb-8">
                    <h4 className="text-[10px] font-semibold tracking-[0.15em] text-gray-500 uppercase mb-4">
                      Sort By
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {sortOptions.map((sort) => (
                        <button
                          key={sort}
                          className={`px-4 py-2 text-xs border transition-colors ${filterSort === sort
                            ? "border-black bg-[#111] text-white"
                            : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                            }`}
                          onClick={() => setFilterSort(sort)}
                        >
                          {sort}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sticky Actions */}
                <div className="sticky bottom-0 bg-[#fafafa] border-t border-gray-200 p-6 flex gap-3 mt-auto">
                  <button
                    onClick={clearFilters}
                    className="flex-1 py-3 text-[10px] tracking-widest uppercase border border-gray-200 bg-white text-gray-600 hover:border-black hover:text-black transition-colors"
                  >
                    Clear
                  </button>
                  <button
                    onClick={applyFilters}
                    className="flex-1 py-3 text-[10px] tracking-widest uppercase bg-black text-white hover:bg-gray-800 transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── RESULTS COUNT + VIEW TOGGLE ── */}
        {!loading && (
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm">
              <span className="font-semibold text-black">{totalItems}</span>{" "}
              <span className="text-gray-500">pieces available</span>
            </p>
            <div className="flex items-center border border-gray-200 rounded-sm overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 transition-colors ${viewMode === "grid" ? "bg-black text-white" : "bg-white text-gray-500 hover:text-black"}`}
                title="Grid view"
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 transition-colors ${viewMode === "list" ? "bg-black text-white" : "bg-white text-gray-500 hover:text-black"}`}
                title="List view"
              >
                <List size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ── PRODUCT GRID ── */}
        {loading ? (
          <div className={`grid gap-4 md:gap-5 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"}`}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-100 aspect-[3/4] w-full rounded-sm" />
                <div className="pt-3 space-y-2">
                  <div className="bg-gray-100 h-2 w-16 rounded" />
                  <div className="bg-gray-100 h-3 w-28 rounded" />
                  <div className="bg-gray-100 h-2 w-20 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-400 text-lg mb-4">No pieces found</p>
            <button onClick={clearFilters} className="bg-black text-white text-xs tracking-widest uppercase px-8 py-3 hover:bg-gray-800 transition-colors">
              Browse All
            </button>
          </div>
        ) : viewMode === "grid" ? (
          /* ── Grid View ── */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {products.map((item, i) => (
              <Link
                key={item.id}
                href={`/product-details?id=${item.id}`}
                prefetch={true}
                onMouseEnter={() => productsAPI.detail(item.id).catch(() => { })}
                className="group block bg-white rounded-sm overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
              >
                {/* Image container */}
                <div className="relative overflow-hidden bg-[#F8F8F8]">
                  <Image
                    src={getImage(item)}
                    alt={getName(item)}
                    width={400}
                    height={520}
                    priority={i < 6}
                    className="w-full aspect-[3/4] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/assets/images/style2.jpeg";
                    }}
                  />

                  {/* Badge - dynamic from API is_rented field */}
                  <span
                    className="absolute top-3 left-3 text-white text-[9px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-sm z-10"
                    style={{ backgroundColor: item.is_rented ? "#555" : "#3d6b4f" }}
                  >
                    {item.is_rented ? "RENTED" : "TRENDING"}
                  </span>

                  {/* Wishlist */}
                  <button
                    onClick={(e) => toggleWishlist(item.id, e)}
                    className={`absolute top-3 right-3 z-10 h-8 w-8 flex items-center justify-center rounded-full shadow-sm transition-all duration-300 hover:scale-110 ${wishlisted.has(item.id)
                      ? "bg-black text-white"
                      : "bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-black hover:text-white"
                      }`}
                  >
                    <Heart
                      size={14}
                      className={wishlisted.has(item.id) ? "fill-white stroke-white" : ""}
                    />
                  </button>

                  {/* Hover overlay with VIEW ITEM button */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 pointer-events-none" />
                  <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
                    <span
                      className="pointer-events-auto text-center translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out mb-5 bg-black/80 backdrop-blur-sm text-white text-[11px] font-semibold tracking-[0.15em] uppercase px-8 py-2.5 w-[85%] hover:bg-black cursor-pointer"
                    >
                      VIEW ITEM
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="pt-3 pb-2 px-2">
                  <p className="text-[10px] tracking-[0.18em] uppercase text-gray-400 mb-0.5 truncate">
                    {getBrand(item)}
                  </p>
                  <h3 className="text-[13px] font-medium text-black truncate leading-snug">
                    {getName(item)}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-sm font-semibold text-black">
                      ${Number(item.price || 0).toFixed(2)}
                    </span>
                    <span className="text-[11px] text-gray-400">/ day</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* ── List View ── */
          <div className="space-y-4">
            {products.map((item, i) => (
              <Link
                key={item.id}
                href={`/product-details?id=${item.id}`}
                prefetch={true}
                onMouseEnter={() => productsAPI.detail(item.id).catch(() => { })}
                className="group flex bg-white border border-gray-100 rounded-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              >
                {/* Image */}
                <div className="relative w-32 md:w-44 flex-shrink-0 bg-[#F8F8F8]">
                  <Image
                    src={getImage(item)}
                    alt={getName(item)}
                    width={180}
                    height={240}
                    priority={i < 4}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/assets/images/style2.jpeg";
                    }}
                  />
                  <span
                    className="absolute top-2 left-2 text-white text-[8px] font-bold tracking-[0.12em] uppercase px-2 py-0.5 rounded-sm"
                    style={{ backgroundColor: item.is_rented ? "#555" : "#3d6b4f" }}
                  >
                    {item.is_rented ? "RENTED" : "TRENDING"}
                  </span>
                </div>
                {/* Details */}
                <div className="flex-1 p-4 md:p-6 flex flex-col justify-center">
                  <p className="text-[10px] tracking-[0.18em] uppercase text-gray-400 mb-1">
                    {getBrand(item)}
                  </p>
                  <h3 className="text-base font-medium text-black mb-1">{getName(item)}</h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-lg font-semibold text-black">
                      ${Number(item.price || 0).toFixed(2)}
                    </span>
                    <span className="text-xs text-gray-400">/ day</span>
                  </div>
                  {item.rating !== undefined && item.rating > 0 && (
                    <div className="flex items-center gap-1 mt-2">
                      <span className="text-yellow-500 text-xs">★</span>
                      <span className="text-xs text-gray-500">{item.rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>
                {/* Wishlist */}
                <div className="flex items-center px-4">
                  <button
                    onClick={(e) => toggleWishlist(item.id, e)}
                    className={`h-9 w-9 flex items-center justify-center rounded-full border transition-all hover:scale-110 ${wishlisted.has(item.id)
                      ? "bg-black border-black text-white"
                      : "border-gray-200 text-gray-500 hover:border-black hover:text-black"
                      }`}
                  >
                    <Heart size={14} className={wishlisted.has(item.id) ? "fill-white stroke-white" : ""} />
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* ── PAGINATION ── */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-1 mt-14 pt-8 border-t border-gray-100">
            {/* Previous */}
            <button
              disabled={page === 1}
              onClick={() => goToPage(page - 1)}
              className="h-10 w-10 flex items-center justify-center rounded-sm border border-gray-200 text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black hover:border-black hover:text-white transition-all duration-200"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Page numbers */}
            {getPageNumbers().map((p, i) =>
              typeof p === "string" ? (
                <span key={`dots-${i}`} className="h-10 w-10 flex items-center justify-center text-gray-400 text-sm">
                  ...
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => goToPage(p)}
                  className={`h-10 w-10 flex items-center justify-center rounded-sm text-sm transition-all duration-200 ${page === p
                    ? "bg-black text-white font-medium"
                    : "border border-gray-200 text-gray-600 hover:bg-black hover:border-black hover:text-white"
                    }`}
                >
                  {p}
                </button>
              )
            )}

            {/* Next */}
            <button
              disabled={page === totalPages}
              onClick={() => goToPage(page + 1)}
              className="h-10 w-10 flex items-center justify-center rounded-sm border border-gray-200 text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black hover:border-black hover:text-white transition-all duration-200"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
