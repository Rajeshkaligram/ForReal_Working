"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.password_confirmation) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const isLogged = await register({
        ...form,
        terms_condition: "1",
        device_type: "web",
      });
      if (isLogged) {
        router.push("/profile");
      } else {
        setSuccess("Your account was successfully created. Please check your email to confirm your account.");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const field = (
    key: keyof typeof form,
    label: string,
    type = "text",
    placeholder = ""
  ) => (
    <div>
      <label className="block text-xs font-medium tracking-widest uppercase text-muted mb-2">
        {label}
      </label>
      <input
        type={type}
        required
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        placeholder={placeholder}
        className="w-full border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
      />
    </div>
  );

  return (
    <div className="min-h-screen flex">
      {/* Left — decorative */}
      <div
        className="hidden lg:flex lg:w-1/2 bg-primary items-end p-16 bg-cover bg-center relative"
        style={{ backgroundImage: "url('/assets/images/hero-back.png')" }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 text-white">
          <h2 className="montserrat text-5xl font-medium leading-tight mb-4">
            Your wardrobe,<br />redefined.
          </h2>
          <p className="text-secondary/60 text-sm">
            Join thousands renting &amp; lending designer pieces.
          </p>
        </div>
      </div>

      {/* Right — form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16 bg-secondary">
        <div className="w-full max-w-md">
          <Link href="/" className="text-2xl font-bold montserrat text-primary block mb-10">
            FoReal
          </Link>

          <h1 className="text-3xl font-medium mb-1">Create account</h1>
          <p className="text-muted text-sm mb-8">Join the FoReal community</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 mb-6 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 mb-6 rounded">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {field("first_name", "First Name", "text", "Jane")}
              {field("last_name", "Last Name", "text", "Doe")}
            </div>

            {field("email", "Email", "email", "you@example.com")}

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
                  placeholder="Min 8 characters"
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

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-medium tracking-widest uppercase text-muted mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                required
                value={form.password_confirmation}
                onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
                placeholder="Re-enter password"
                className="w-full border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
              />
            </div>

            <p className="text-xs text-muted">
              By joining you agree to our{" "}
              <Link href="/terms" className="underline hover:text-primary">
                Terms
              </Link>{" "}
              &amp;{" "}
              <Link href="/privacy" className="underline hover:text-primary">
                Privacy Policy
              </Link>
              .
            </p>

            <button
              type="submit"
              disabled={loading}
              className="btn-bg w-full flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading && <Loader2 size={15} className="animate-spin" />}
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-muted">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
