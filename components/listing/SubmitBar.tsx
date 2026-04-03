import React from "react";

export default function SubmitBar() {
  return (
    <>
      <button className="w-full bg-black text-white py-3 text-xs hover:opacity-90 cursor-pointer mb-2!">
        PUBLISH LISTING
      </button>
      <p className="text-muted text-xs text-center">Your listing will be reviewed before going live.</p>
    </>
  );
}
