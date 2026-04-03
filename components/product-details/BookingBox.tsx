"use client";

export default function BookingBox() {
  return (
    <div className="border p-5 space-y-4">

      <div className="flex justify-between text-sm">
        <span>$38 × 4 days</span>
        <span>$152</span>
      </div>

      <div className="flex justify-between text-sm">
        <span>Service fee</span>
        <span>$0</span>
      </div>

      <div className="flex justify-between border-t pt-3 font-medium">
        <span>Total</span>
        <span>$152</span>
      </div>

      <button className="w-full bg-black text-white py-3 text-sm">
        REQUEST TO RENT
      </button>

      <button className="w-full border py-3 text-sm">
        MESSAGE SELLER
      </button>

    </div>
  );
}