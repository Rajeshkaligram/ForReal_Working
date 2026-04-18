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
    <div className="min-h-screen flex items-center justify-center bg-[#F8F6F3] py-12 px-4">
      <div className="w-full max-w-[440px] bg-transparent border border-gray-200 px-8 py-10 sm:px-10 sm:py-12">
        {/* Header */}
        <h4 className="text-[10px] font-semibold tracking-[0.15em] text-gray-500 uppercase mb-4">
          Welcome back
        </h4>
        <h1 className="text-4xl font-serif mb-12 text-[#111]">
          Sign in to<br />
          <span className="italic">your account.</span>
        </h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 mb-6 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-[10px] font-semibold tracking-[0.15em] text-gray-500 uppercase mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full border border-gray-200 bg-transparent px-4 py-3 text-[15px] outline-none focus:border-black transition-colors"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[10px] font-semibold tracking-[0.15em] text-gray-500 uppercase mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Your password"
                className="w-full border border-gray-200 bg-transparent px-4 py-3 text-[15px] pr-12 outline-none focus:border-black transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#111] hover:bg-black text-white px-4 py-3.5 text-xs font-semibold tracking-[0.15em] uppercase transition-colors flex items-center justify-center gap-2 disabled:opacity-60 mt-2"
          >
            {loading && <Loader2 size={15} className="animate-spin" />}
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-[#F8F6F3] px-4 text-[10px] font-semibold tracking-[0.1em] text-gray-400 uppercase">
              Or continue with
            </span>
          </div>
        </div>

        {/* Social Buttons (UI Only) */}
        <div className="flex gap-3 mb-16">
          <button type="button" onClick={() => alert("Coming soon")} className="flex-1 flex justify-center items-center py-3 border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
             </svg>
          </button>
          <button type="button" onClick={() => alert("Coming soon")} className="flex-1 flex justify-center items-center py-3 border border-gray-200 bg-white hover:bg-gray-50 transition-colors text-black">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
               <path d="M16.365 14.495c.017 3.328 2.894 4.437 2.915 4.444-.021.077-.456 1.558-1.503 3.08-.892 1.298-1.83 2.585-3.267 2.61-1.416.024-1.884-.84-3.486-.84-1.619 0-2.122.818-3.486.864-1.411.047-2.484-1.39-3.385-2.686-1.83-2.645-3.23-7.464-1.353-10.72.932-1.615 2.589-2.64 4.364-2.665 1.385-.022 2.683.93 3.518.93.834 0 2.42-1.127 4.12-.958 1.765.071 3.355.698 4.341 2.138-3.42 2.062-2.868 6.964.538 8.197zM15.114 4.542c.762-.919 1.275-2.196 1.135-3.472-1.096.044-2.434.73-3.218 1.666-.7.838-1.306 2.146-1.146 3.398 1.226.096 2.47-.643 3.229-1.592z"/>
             </svg>
          </button>
          <button type="button" onClick={() => alert("Coming soon")} className="flex-1 flex justify-center items-center py-3 border border-gray-200 bg-white hover:bg-gray-50 transition-colors text-black">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </button>
        </div>

        <p className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-black font-medium border-b border-black pb-0.5 hover:opacity-70 transition-opacity">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
