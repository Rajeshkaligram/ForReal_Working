"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CalendarSection() {
  const [selected, setSelected] = useState<Date | undefined>();
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(new Date().getFullYear(), new Date().getMonth(), 1));

  const handlePrev = () => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  const handleNext = () => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

  return (
      <>
       {/* TITLE */}
      <div className="border-t border-border pt-6 md:mt-10">
        <p className="text-xs tracking-[3px] text-muted mb-4 ">AVAILABILITY</p>
      <p className="text-muted text-xs">Click dates to block availability. All dates are available by default.</p>

        </div>



    <div className="border border-border p-6 ">
   

      {/* CALENDAR */}
      <div className="flex justify-center w-full overflow-x-auto py-2 relative custom-calendar-wrapper">
        
        {/* Custom Navigation Override */}
        <div className="absolute top-[50px] w-full flex justify-center gap-[16px] z-10 pointer-events-none">
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
          mode="single"
          selected={selected}
          onSelect={setSelected}
          month={currentMonth}
          onMonthChange={setCurrentMonth}
          numberOfMonths={2}
          showOutsideDays
          className="custom-calendar flex justify-center w-full [&_.rdp-nav]:hidden calendar-center-nav"
        />
      </div>

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
