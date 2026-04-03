"use client";

import { Search, ChevronDown, ChevronUp } from "lucide-react";
import FilterPanel from "./FilterPanel";

type Props = {
  categories: string[];
  active: string;
  setActive: (val: string) => void;
  search: string;
  setSearch: (val: string) => void;
  showFilter: boolean;
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CollectionHeader({
  categories,
  active,
  setActive,
  search,
  setSearch,
  showFilter,
  setShowFilter,
}: Props) {
  return (
    <>
      <p className="sec_tagline">DISCOVER</p>

      <div className="flex flex-col md:flex-row justify-between gap-6">
        <h2 className="sec_title font-serif!">Browse the Collection</h2>

        <div className="flex items-center border-b border-border max-w-md w-full">
          <Search size={16} className="text-muted mr-2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search brands, styles, locations…"
            className="bg-transparent outline-none py-2 w-full text-xs md:text-sm"
          />
        </div>
      </div>

      <div className="flex justify-between items-center mt-5 md:mt-10 border-b border-border border-t  relative gap-10">
        {/* Categories */}
        <div className="flex gap-6 text-sm overflow-x-auto py-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`relative pb-2 cursor-pointer ${
                active === cat ? "text-black" : "text-muted"
              }`}
            >
              {cat}
              {active === cat && (
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-black" />
              )}
            </button>
          ))}
        </div>

        {/* Filter */}
        <div className="relative border-l border-border py-4 pl-4">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-1 text-sm cursor-pointer text-muted"
          >
            Filter
            {/* <span className="bg-primary text-white ml-1 h-4 w-4 p-1 rounded-full flex items-center justify-center text-xs">
              1
            </span> */}
            {showFilter ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showFilter && (
            <div className="absolute right-0 top-full mt-4 z-50">
              <FilterPanel show={showFilter} setShow={setShowFilter} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
