"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

import AuthenticationPanel from "@/components/listing/AuthenticationPanel";
import CalendarSection from "@/components/listing/CalendarSection";
import CleaningPanel from "@/components/listing/CleaningPanel";
import DetailsForm from "@/components/listing/DetailsForm";
import ListHeader from "@/components/listing/ListHeader";
import OptionsSection from "@/components/listing/OptionsSection";
import PriceTags from "@/components/listing/PriceTags";
import SubmitBar from "@/components/listing/SubmitBar";
import UploadSection from "@/components/listing/UploadSection";
import { ListingProvider, useListingContext } from "@/components/listing/ListingContext";

export default function ListPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-black" size={32} />
      </div>
    );
  }

  return (
    <ListingProvider>
      <section className=" pt-8 md:pt-16 pb-8 md:pb-32">
        <div className="container space-y-10">
          <ListHeader />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT */}
          <div className="space-y-5 md:space-y-10">
            <UploadSection />
            <CalendarSection />
            <PriceTags />
          </div>

          {/* RIGHT */}
          <div className="space-y-5 md:space-y-10">
            <DetailsForm />

            <OptionsSection />
          </div>
        </div>

        {/*  SHOW HERE (MAIN PAGE) */}
        <ConditionalPanels />

        <SubmitBar/>
      </div>
    </section>
    </ListingProvider>
  );
}

function ConditionalPanels() {
  const { authEnabled, cleaningEnabled } = useListingContext();
  return (
    <>
      {authEnabled && <AuthenticationPanel />}
      {cleaningEnabled && <CleaningPanel />}
    </>
  );
}
