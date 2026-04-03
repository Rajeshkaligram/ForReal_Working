"use client";

import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { MapPin, Calendar } from "lucide-react";

export default function ProfileHero() {
  const { user } = useAuth();

  const displayName = user
    ? `${user.first_name || ""} ${user.last_name || ""}`.trim()
    : "Your Profile";

  const avatarSrc = user?.profile_image || "/assets/images/profile.jpeg";
  const username = user?.email?.split("@")[0] || "member";

  return (
    <section className="relative w-full h-[70vh] md:h-[70vh] overflow-hidden">
      {/* Background */}
      <Image
        src="/assets/images/profiles.jpeg"
        alt="profile background"
        width={1920}
        height={600}
        priority
        className="object-cover h-full w-full object-[center_20%]"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(20,14,12,0.82)_0%,rgba(20,14,12,0.18)_48%,transparent_100%)]" />
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-10 left-6 md:left-16 text-white z-10 flex items-end gap-6">
        {/* Avatar */}
        <div className="hidden md:block relative">
          <Image
            src={avatarSrc}
            alt={displayName}
            width={96}
            height={96}
            className="w-24 h-24 rounded-full object-cover border-2 border-white/30"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/assets/images/profile.jpeg";
            }}
          />
        </div>

        {/* Info */}
        <div>
          <p className="sec_tagline text-white! mb-2">PROFILE</p>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-medium">
            {displayName}
          </h1>
          <div className="flex items-center gap-4 mt-2 text-offwhite text-xs">
            <span>@{username}</span>
            {user?.location && (
              <span className="flex items-center gap-1">
                <MapPin size={11} />
                {user.location}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar size={11} />
              Member since 2025
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
