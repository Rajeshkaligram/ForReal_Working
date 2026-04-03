"use client";

import { useState } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface CalendarBoxProps {
  unavailableFrom?: string;
  unavailableTo?: string;
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
}

export default function CalendarBox({ unavailableFrom, unavailableTo, dateRange, setDateRange }: CalendarBoxProps) {
  const disabledDays = [];
  
  if (unavailableFrom && unavailableTo) {
    const from = new Date(unavailableFrom);
    const to = new Date(unavailableTo);
    if (!isNaN(from.getTime()) && !isNaN(to.getTime())) {
      disabledDays.push({ from, to });
    }
  }

  // Also disable past dates
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  disabledDays.push({ before: today });

  return (
    <div className="border border-gray-200 p-6 bg-[#FAF9F8] mt-8 hidden md:block overflow-hidden">
      <p className="text-[10px] tracking-[0.3em] text-muted mb-4 uppercase">Availability</p>
      <div className="flex justify-center w-full overflow-x-auto pb-4">
        <DayPicker
          mode="range"
          selected={dateRange}
          onSelect={setDateRange}
          numberOfMonths={2}
          pagedNavigation
          showOutsideDays
          disabled={disabledDays}
          fromYear={today.getFullYear()}
          className="custom-calendar flex justify-center w-full"
        />
      </div>
      <p className="text-xs text-muted mt-4 text-center">
        Grey dates are not available to be booked. Max. 30 days.
      </p>
    </div>
  );
}
