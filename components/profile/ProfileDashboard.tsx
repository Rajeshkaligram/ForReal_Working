"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useSearchParams, useRouter } from "next/navigation";
import OverviewTab from "./OverviewTab";
import RentingTab from "./RentingTab";
import PostingsTab from "./PostingsTab";
import ReviewsTab from "./ReviewsTab";
import SettingsTab from "./SettingsTab";

export default function ProfileDashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTab = searchParams.get("tab") || "overview";
  const [tab, setTab] = useState(initialTab);

  useEffect(() => {
    const queryTab = searchParams.get("tab");
    if (queryTab && queryTab !== tab) {
      setTab(queryTab);
    }
  }, [searchParams]);

  const handleTabChange = (newTab: string) => {
    setTab(newTab);
    router.replace(`/profile?tab=${newTab}`);
  };

  const { user, refreshProfile } = useAuth();

  // Refresh profile data on mount to get latest stats
  useEffect(() => {
    refreshProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "renting", label: "Renting" },
    { id: "postings", label: "Postings" },
    { id: "reviews", label: "Reviews" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div>
      {/* TOP STATS */}
      <div className="py-8 md:py-16">
        <div className="container-md grid grid-cols-3 sm:grid-cols-5 gap-2 md:gap-6 text-center">
          <div>
            <h2 className="text-xl md:text-2xl font-medium mb-1 font-serif">
              {user?.rentals_count ?? "—"}
            </h2>
            <p className="text-xs tracking-widest text-muted font-medium">RENTALS</p>
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-medium mb-1 font-serif">
              {user?.listings_count ?? "—"}
            </h2>
            <p className="text-xs tracking-widest text-muted font-medium">LISTINGS</p>
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-medium mb-1 font-serif">
              {user?.following_count ?? "—"}
            </h2>
            <p className="text-xs tracking-widest text-muted font-medium">FOLLOWING</p>
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-medium mb-1 font-serif">
              {user?.followers_count ?? "—"}
            </h2>
            <p className="text-xs tracking-widest text-muted font-medium">FOLLOWERS</p>
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-medium mb-1 font-serif">
              {user?.rating ?? "—"}
            </h2>
            <p className="text-xs tracking-widest text-muted font-medium">RATING</p>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="border-b border-border">
        <div className="container-md mx-auto flex gap-8 text-sm overflow-x-auto">
          {tabs.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`relative py-3 md:py-4 transition-all duration-300 cursor-pointer whitespace-nowrap ${
                tab === item.id
                  ? "text-black font-medium"
                  : "text-muted hover:text-black"
              }`}
            >
              {item.label}
              {tab === item.id && (
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-black rounded-full transition-all duration-300" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="container-md mx-auto py-10">
        {tab === "overview" && <OverviewTab setTab={handleTabChange} />}
        {tab === "renting" && <RentingTab />}
        {tab === "postings" && <PostingsTab />}
        {tab === "reviews" && <ReviewsTab />}
        {tab === "settings" && <SettingsTab />}
      </div>
    </div>
  );
}
