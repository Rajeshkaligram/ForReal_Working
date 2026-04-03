"use client";

import { useState } from "react";

import AuthenticationPanel from "@/components/listing/AuthenticationPanel";
import CalendarSection from "@/components/listing/CalendarSection";
import CleaningPanel from "@/components/listing/CleaningPanel";
import DetailsForm from "@/components/listing/DetailsForm";
import ListHeader from "@/components/listing/ListHeader";
import OptionsSection from "@/components/listing/OptionsSection";
import PriceTags from "@/components/listing/PriceTags";
import SubmitBar from "@/components/listing/SubmitBar";
import UploadSection from "@/components/listing/UploadSection";

export default function ListPage() {
  const isAuthenticated = false;

  const [authEnabled, setAuthEnabled] = useState(false);
  const [cleaningEnabled, setCleaningEnabled] = useState(false);

  return (
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

            <OptionsSection
              authEnabled={authEnabled}
              setAuthEnabled={setAuthEnabled}
              cleaningEnabled={cleaningEnabled}
              setCleaningEnabled={setCleaningEnabled}
            />
          </div>
        </div>

        {/*  SHOW HERE (MAIN PAGE) */}
        {authEnabled && <AuthenticationPanel />}
        {cleaningEnabled && <CleaningPanel />}

        <SubmitBar/>
      </div>
    </section>
  );
}
