"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import ProfileHero from "@/components/profile/ProfileHero";
import ProfileDashboard from "@/components/profile/ProfileDashboard";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/auth/login");
    }
  }, [isLoggedIn, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-muted" />
      </div>
    );
  }

  if (!isLoggedIn) return null;

  return (
    <>
      <ProfileHero />
      <ProfileDashboard />
    </>
  );
}
