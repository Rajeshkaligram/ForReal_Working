"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function CalendarSection() {
  const [selected, setSelected] = useState<Date | undefined>();

  return (
      <>
       {/* TITLE */}
      <div className="border-t border-border pt-6 md:mt-10">
        <p className="text-xs tracking-[3px] text-muted mb-4 ">AVAILABILITY</p>
      <p className="text-muted text-xs">Click dates to block availability. All dates are available by default.</p>

        </div>



    <div className="border border-border p-6 ">
   

      {/* CALENDAR */}
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        numberOfMonths={2}
        showOutsideDays
        fromYear={2024}
        toYear={2035}
        className="custom-calendar"
      />

      {/* FOOTER */}
      <div className="text-xs text-muted pt-4 border-t border-border flex gap-4 items-center justify-center">
        <div className="flex gap-2">
          {" "}
          <span className="bg-primary  h-3 w-3 block"> </span> Available{" "}
        </div>
        <div className="flex gap-2">
          {" "}
          <span className="bg-muted/20  h-3 w-3 block"> </span> Blocked
        </div>
      </div>
    </div>
    </>
  );
}
