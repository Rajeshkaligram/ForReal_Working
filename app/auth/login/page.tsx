"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login({ email: form.email, password: form.password });
      router.push("/profile");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Invalid email or password.";
      // Backend sends this when account needs email verification
      if (
        msg.toLowerCase().includes("activation") ||
        msg.toLowerCase().includes("verify") ||
        msg.toLowerCase().includes("confirm")
      ) {
        setError("📧 " + msg);
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left — decorative */}
      <div
        className="hidden lg:flex lg:w-1/2 bg-primary items-end p-16 bg-cover bg-center relative"
        style={{ backgroundImage: "url('/assets/images/hero-back.png')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-white">
          <h2 className="montserrat text-5xl font-medium leading-tight mb-4">
            Real,<br />for the<br />moment.
          </h2>
          <p className="text-secondary/60 text-sm">
            Rent designer fashion. Look extraordinary.
          </p>
        </div>
      </div>

      {/* Right — form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16 bg-secondary">
        <div className="w-full max-w-md">
          <Link href="/" className="text-2xl font-bold montserrat text-primary block mb-10">
            FoReal
          </Link>

          <h1 className="text-3xl font-medium mb-1">Welcome back</h1>
          <p className="text-muted text-sm mb-8">Sign in to your account</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 mb-6 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-medium tracking-widest uppercase text-muted mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium tracking-widest uppercase text-muted mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full border border-border bg-white px-4 py-3 text-sm pr-12 outline-none focus:border-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                href="/auth/forgot-password"
                className="text-xs text-muted hover:text-primary transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-bg w-full flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading && <Loader2 size={15} className="animate-spin" />}
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-muted">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-primary font-medium hover:underline">
              Join FoReal
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
