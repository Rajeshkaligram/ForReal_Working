"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, CheckCircle } from "lucide-react";
import { authAPI } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await authAPI.forgotPassword(email);
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary px-6 py-16">
      <div className="w-full max-w-md">
        <Link href="/" className="text-2xl font-bold montserrat text-primary block mb-10">
          FoReal
        </Link>

        {success ? (
          <div className="text-center py-8">
            <CheckCircle size={48} className="mx-auto mb-4 text-green-600" />
            <h2 className="text-xl font-medium mb-2">Check your email</h2>
            <p className="text-muted text-sm mb-6">
              We&apos;ve sent a password reset link to <strong>{email}</strong>.
            </p>
            <Link href="/auth/login" className="text-primary underline text-sm">
              Back to Sign In
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-medium mb-1">Forgot password?</h1>
            <p className="text-muted text-sm mb-8">
              Enter your email and we&apos;ll send you a reset link.
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 mb-6 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-medium tracking-widest uppercase text-muted mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-bg w-full flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading && <Loader2 size={15} className="animate-spin" />}
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-muted">
              <Link href="/auth/login" className="text-primary hover:underline">
                ← Back to Sign In
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
