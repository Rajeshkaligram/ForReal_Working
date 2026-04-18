"use client";

import { useState } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  disabledDays.push((date: Date) => date < today);

  // Manually control the active month to sidestep DayPicker bugs
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(today.getFullYear(), today.getMonth(), 1));

  const handlePrev = () => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  const handleNext = () => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

  return (
    <div className="border border-gray-200 p-6 bg-[#FAF9F8] mt-8 hidden md:block overflow-hidden">
      <p className="text-[10px] tracking-[0.3em] text-muted mb-4 uppercase">Availability</p>
      <div className="flex justify-center w-full overflow-x-auto pb-4 relative custom-calendar-wrapper">
        
        {/* Custom Navigation Override */}
        <div className="absolute top-[50px] w-full flex justify-between z-10 pointer-events-none">
          <button 
            type="button" 
            onClick={handlePrev} 
            className="w-8 h-8 flex items-center justify-center border border-gray-200 bg-white hover:bg-gray-50 pointer-events-auto transition-colors text-black"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            type="button" 
            onClick={handleNext} 
            className="w-8 h-8 flex items-center justify-center border border-gray-200 bg-white hover:bg-gray-50 pointer-events-auto transition-colors text-black"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <DayPicker
          mode="range"
          selected={dateRange}
          onSelect={setDateRange}
          month={currentMonth}
          onMonthChange={setCurrentMonth}
          numberOfMonths={2}
          showOutsideDays
          disabled={disabledDays}
          className="custom-calendar flex justify-center w-full [&_.rdp-nav]:hidden calendar-split-nav"
        />
      </div>
      <p className="text-xs text-muted mt-4 text-center">
        Grey dates are not available to be booked. Max. 30 days.
      </p>
    </div>
  );
}
