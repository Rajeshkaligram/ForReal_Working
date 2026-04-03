"use client";

import { useState, useMemo } from "react";
import { Grid, List } from "lucide-react";

import CollectionHeader from "./CollectionHeader";
import ProductGrid from "./Product";
import FilterPanel from "./FilterPanel";

const categories = ["All", "Dresses", "Bags", "Shoes", "Jackets", "Suits"];

const products = [
  {
    id: 1,
    brand: "BRUNELLO CUCINELLI",
    title: "Cashmere-Blend Blazer",
    price: "$95.00 / day",
    size: "40R",
    img: "/assets/images/jackates (1).jpeg",
    category: "Jackets",
  },
  {
    id: 2,
    brand: "SANDRO",
    title: "Structured Pinstripe Suit",
    price: "$72.00 / day",
    size: "M",
    img: "/assets/images/jackates (2).jpeg",
    category: "Jackets",
  },
  {
    id: 3,
    brand: "GUCCI",
    title: "Horsebit Leather Loafers",
    price: "$58.00 / day",
    size: "43",
    img: "/assets/images/jackates (3).jpeg",
    category: "Jackets",
  },
  {
    id: 4,
    brand: "JACQUEMUS",
    title: "La Robe Midi",
    price: "$48.00 / day",
    size: "M",
    img: "/assets/images/jackates (4).jpeg",
    category: "Jackets",
  },
  {
    id: 5,
    brand: "JACQUEMUS",
    title: "La Robe Midi",
    price: "$48.00 / day",
    size: "M",
    img: "/assets/images/suits (1).jpeg",
    category: "Suits",
  },
  {
    id: 6,
    brand: "JACQUEMUS",
    title: "La Robe Midi",
    price: "$48.00 / day",
    size: "M",
    img: "/assets/images/suits (2).jpeg",
    category: "Suits",
  },
  {
    id: 7,
    brand: "JACQUEMUS",
    title: "La Robe Midi",
    price: "$48.00 / day",
    size: "M",
    img: "/assets/images/suits (3).jpeg",
    category: "Suits",
  },
   {
    id: 8,
    brand: "JACQUEMUS",
    title: "La Robe Midi",
    price: "$48.00 / day",
    size: "M",
    img: "/assets/images/suits (4).jpeg",
    category: "Suits",
  },
   {
    id: 9,
    brand: "JACQUEMUS",
    title: "La Robe Midi",
    price: "$48.00 / day",
    size: "M",
    img: "/assets/images/shoes (1).jpeg",
    category: "Shoes",
  },
   {
    id: 10,
    brand: "JACQUEMUS",
    title: "La Robe Midi",
    price: "$48.00 / day",
    size: "M",
    img: "/assets/images/shoes (2).jpeg",
    category: "Shoes",
  },
  {
    id: 11,
    brand: "JACQUEMUS",
    title: "La Robe Midi",
    price: "$48.00 / day",
    size: "M",
    img: "/assets/images/shoes (3).jpeg",
    category: "Shoes",
  },
  {
    id: 12,
    brand: "JACQUEMUS",
    title: "La Robe Midi",
    price: "$48.00 / day",
    size: "M",
    img: "/assets/images/shoes (4).jpeg",
    category: "Shoes",
  },
   {
    id: 13,
    brand: "JACQUEMUS",
    title: "La Robe Midi",
    price: "$48.00 / day",
    size: "M",
    img: "/assets/images/shoes (3).jpeg",
    category: "Bags",
  },
  {
    id: 14,
    brand: "JACQUEMUS",
    title: "La Robe Midi",
    price: "$48.00 / day",
    size: "M",
    img: "/assets/images/shoes (4).jpeg",
    category: "Dresses",
  },
   {
    id: 15,
    brand: "JACQUEMUS",
    title: "La Robe Midi",
    price: "$48.00 / day",
    size: "M",
    img: "/assets/images/shoes (3).jpeg",
    category: "Bags",
  },
  {
    id: 16,
    brand: "JACQUEMUS",
    title: "La Robe Midi",
    price: "$48.00 / day",
    size: "M",
    img: "/assets/images/shoes (4).jpeg",
    category: "Dresses",
  },
];

export default function CollectionSection() {
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showFilter, setShowFilter] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchCategory = active === "All" || item.category === active;

      const matchSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.brand.toLowerCase().includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [active, search]);

  return (
    <>
      <section className="py-8 md:py-32">
        <div className="container mx-auto px-4">
          <CollectionHeader
            categories={categories}
            active={active}
            setActive={setActive}
            search={search}
            setSearch={setSearch}
            showFilter={showFilter}
            setShowFilter={setShowFilter}
          />

          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-muted">
              <span className="text-black font-medium">
                {filteredProducts.length}
              </span>{" "}
              pieces available
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => setView("grid")}
                className={`p-2 border border-border cursor-pointer ${
                  view === "grid" ? "bg-black text-white" : "bg-white"
                }`}
              >
                <Grid size={16} />
              </button>

              <button
                onClick={() => setView("list")}
                className={`p-2 border border-border cursor-pointer ${
                  view === "list" ? "bg-black text-white" : "bg-white"
                }`}
              >
                <List size={16} />
              </button>
            </div>
          </div>

          <ProductGrid products={filteredProducts} view={view} />
        </div>
      </section>
    </>
  );
}
