"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Heart, Menu, X, Bell, ShoppingBag } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoggedIn, logout, isLoading } = useAuth();

  // Close menus on route change
  useEffect(() => {
    setOpen(false);
    setMobile(false);
  }, [pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const displayName = user
    ? `${user.first_name || ""} ${user.last_name || ""}`.trim()
    : "Account";

  const avatarSrc = user?.profile_image || "/assets/images/profile.jpeg";

  return (
    <header className="w-full border-b border-border text-xs md:text-sm backdrop-blur-[14px] sticky top-0 z-90 bg-secondary/80">
      <div className="mx-auto h-18 flex items-center justify-between px-4! md:px-10!">
        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setMobile(!mobile)}>
          {mobile ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Left nav — desktop */}
        <div className="hidden md:flex gap-8 text-muted font-medium text-sm">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <Link href="/discover" className="hover:text-primary">
            Discover
          </Link>
          <Link href="/works" className="hover:text-primary">
            How it Works
          </Link>
        </div>

        {/* Logo */}
        <Link
          href="/"
          className="text-xl md:text-3xl xl:text-[40px] font-bold tracking-wide text-primary montserrat"
        >
          FoReal
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3 md:gap-4 relative" ref={dropdownRef}>
          {/* Wishlist */}
          <Link href="/wishlist" aria-label="Wishlist">
            <Heart className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
          </Link>
          
          {/* Cart */}
          <Link href="/cart" aria-label="Cart">
            <ShoppingBag className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
          </Link>

          <div className="hidden md:block w-px h-6 bg-border" />

          {isLoading ? (
            /* Skeleton while auth loads */
            <div className="w-8 h-8 rounded-full bg-border animate-pulse" />
          ) : isLoggedIn ? (
            <>
              {/* Profile trigger */}
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <Image
                  src={avatarSrc}
                  width={32}
                  height={32}
                  alt={displayName}
                  className="rounded-full h-8 w-8 object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "/assets/images/profile.jpeg";
                  }}
                />
                <span className="hidden md:block text-sm font-medium text-muted">
                  {displayName}
                </span>
              </div>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 top-12 w-52 bg-white border border-border/10 shadow-md z-50">
                  <div className="p-4 border-b border-border">
                    <p className="text-xs tracking-wide text-muted">SIGNED IN AS</p>
                    <p className="font-medium">{displayName}</p>
                    <p className="text-xs text-muted truncate">{user?.email}</p>
                  </div>

                  <div className="text-xs">
                    <Link
                      href="/profile"
                      className="block px-4 py-3 hover:text-primary text-muted hover:bg-primary/4 border-b border-border"
                    >
                      View Profile
                    </Link>
                    <Link
                      href="/message"
                      className="block px-4 py-3 hover:text-primary text-muted hover:bg-primary/4 border-b border-border"
                    >
                      Messages
                    </Link>
                    <Link
                      href="/wishlist"
                      className="block px-4 py-3 hover:text-primary text-muted hover:bg-primary/4 border-b border-border"
                    >
                      Wishlist
                    </Link>
                    <Link
                      href="/listing"
                      className="block px-4 py-3 hover:text-primary text-muted hover:bg-primary/4 border-b border-border"
                    >
                      Add a Posting
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-4 py-3 hover:text-primary text-muted hover:bg-primary/4"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Not logged in */
            <div className="flex items-center gap-3">
              <Link
                href="/auth/login"
                className="text-sm font-medium text-muted hover:text-primary transition-colors"
              >
                Sign In
              </Link>
              <Link href="/auth/register" className="btn-bg !py-2 !px-4 text-xs">
                Join
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {mobile && (
        <div className="md:hidden border-t bg-background">
          <Link
            href="/"
            className="block px-4 py-3 border-b"
            onClick={() => setMobile(false)}
          >
            Home
          </Link>
          <Link
            href="/discover"
            className="block px-4 py-3 border-b"
            onClick={() => setMobile(false)}
          >
            Discover
          </Link>
          <Link
            href="/works"
            className="block px-4 py-3 border-b"
            onClick={() => setMobile(false)}
          >
            How it Works
          </Link>
          {isLoggedIn ? (
            <>
              <Link href="/profile" className="block px-4 py-3 border-b" onClick={() => setMobile(false)}>
                Profile
              </Link>
              <Link href="/wishlist" className="block px-4 py-3 border-b" onClick={() => setMobile(false)}>
                Wishlist
              </Link>
              <button
                onClick={() => { setMobile(false); handleLogout(); }}
                className="w-full text-left block px-4 py-3 text-maroon"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="block px-4 py-3 border-b" onClick={() => setMobile(false)}>
                Sign In
              </Link>
              <Link href="/auth/register" className="block px-4 py-3" onClick={() => setMobile(false)}>
                Join FoReal
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
