"use client";

import { X, Phone } from "lucide-react";
import { useState, useEffect } from "react";

export default function VerifyModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState<"send" | "verify">("send");
  const [otp, setOtp] = useState("");

  const isOtpComplete = otp.length === 6;

  useEffect(() => {
    if (!open) {
      setStep("send");
      setOtp("");
    }
  }, [open]);

  if (!open) return null;

  const handleOverlayClick = () => {
    onClose();
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div
        onClick={handleModalClick}
        className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden mx-4"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <div className="bg-offwhite p-3 rounded-full">
              <Phone size={18} className="text-muted" />
            </div>
            <h2 className="text-xl md:text-xl font-semibold text-primary">
              Verify Phone Number
            </h2>
          </div>

          <button onClick={onClose}>
            <X size={18} className="text-muted" />
          </button>
        </div>

        <div className="border-t" />

        {/* BODY */}
        <div className="p-6 space-y-6">
          {/* STEP 1 */}
          {step === "send" && (
            <>
              <p className="text-muted text-sm">
                We'll send a verification code to{" "}
                <span className="font-semibold text-primary">
                  +44 7700 900000
                </span>
              </p>

              <p className="text-muted text-sm">
                Click the button below to receive a 6-digit verification code.
                This code will be valid for 10 minutes.
              </p>

              <div className="flex gap-4 pt-2">
                <button
                  onClick={() => setStep("verify")}
                  className="flex-1 h-11 rounded-md btn-bg font-medium"
                >
                  Send Code
                </button>

                <button
                  onClick={onClose}
                  className="px-5 h-11 border-border border rounded-md text-muted hover:border-primary text-sm"
                >
                  Cancel
                </button>
              </div>
            </>
          )}

          {/* STEP 2 */}
          {step === "verify" && (
            <>
              <p className="text-muted text-sm">
                Enter the 6-digit code sent to your phone:
              </p>

              <div className="border-border border rounded-lg h-14 flex items-center justify-center text-2xl tracking-[12px] text-muted bg-offwhite">
                {otp || "000000"}
              </div>

              <input
                type="text"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                className="opacity-0 absolute pointer-events-none"
              />

              <button className="text-sm underline text-primary">
                Resend code
              </button>

              <div className="flex gap-4 pt-2">
                <button
                  disabled={!isOtpComplete}
                  className={`flex-1 h-11 rounded-md font-medium ${
                    isOtpComplete
                      ? "bg-btn text-white"
                      : "bg-gray-300 text-white"
                  }`}
                >
                  Verify
                </button>

                <button
                  onClick={onClose}
                  className="px-5 h-11 border-border border hover:border-primary text-sm rounded-md text-muted"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
