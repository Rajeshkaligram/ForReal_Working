"use client";

import { useState } from "react";
import { Instagram, Linkedin, Music2, Loader2, CheckCircle } from "lucide-react";
import { miscAPI } from "@/lib/api";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email_address: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await miscAPI.contactUs(form);
      setSuccess(true);
      setForm({ name: "", email_address: "", subject: "", message: "" });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className=" text-black py-8 md:py-32">
      <div className="container-md">
        {/* TOP TEXT */}
        <div className="text-center mb-8 md:mb-16">
          <p className="text-xs tracking-[0.3em] text-muted mb-4 uppercase">
            Connect With Us
          </p>

          <h1 className="font-serif! font-light text-[clamp(3.5rem,8vw,6rem)] leading-none tracking-[-0.02em] mb-10">
            Let&apos;s Talk
          </h1>

          <p className="max-w-xl mx-auto text-sm md:text-base text-primary/70 leading-relaxed">
            We&apos;re here to answer your questions, hear your feedback, and help
            you make the most of your FoReal experience.
          </p>
        </div>

        {/* DIVIDER */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* LEFT SIDE — Contact Form */}
          <div className="space-y-6">
            <div className="border-t border-border pt-6">
              <p className="sec_tagline text-muted uppercase mb-6">
                Send Us a Message
              </p>

              {success ? (
                <div className="flex items-center gap-3 text-green-700 bg-green-50 border border-green-200 px-4 py-4 rounded">
                  <CheckCircle size={20} />
                  <p className="text-sm">Thank you! Your message has been sent. We&apos;ll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium tracking-widest uppercase text-muted mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium tracking-widest uppercase text-muted mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email_address}
                      onChange={(e) => setForm({ ...form, email_address: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium tracking-widest uppercase text-muted mb-2">Subject</label>
                    <input
                      type="text"
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="How can we help?"
                      className="w-full border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium tracking-widest uppercase text-muted mb-2">Message</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us more..."
                      className="w-full border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-bg w-full flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {loading && <Loader2 size={15} className="animate-spin" />}
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            <div className="border-t   border-border pt-6">
              <p className="text-xs tracking-[0.2em] text-muted uppercase mb-6">
                Other Ways to Reach Us
              </p>

              <a
                href="mailto:info@foreal.ca"
                className="text-lg md:text-xl underline text-black/80 block mb-6"
              >
                info@foreal.ca
              </a>

              <p className="text-xs tracking-[0.2em] text-muted uppercase mb-6 mt-10">
                Follow Us
              </p>

              <div className="space-y-5 text-sm">
                <div className="flex items-center gap-3 md:gap-5">
                  <Instagram size={18} className="text-primary/70" />
                  <div>
                    <p className="text-sm md:text-base text-primary/70">Instagram</p>
                    <p className="text-muted text-xs">@forealhq</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 md:gap-5">
                  <Music2 size={18} className="text-primary/70" />
                  <div>
                    <p className="text-sm md:text-base text-primary/70">TikTok</p>
                    <p className="text-muted text-xs">@foreal.ca</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 md:gap-5">
                  <Linkedin size={18} className="text-primary/70" />
                  <div>
                    <p className="text-sm md:text-base text-primary/70">LinkedIn</p>
                    <p className="text-muted text-xs">FoReal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM TEXT */}
        <div className="text-center mt-20 border-t border-border pt-6 md:pt-10 text-muted text-sm">
          <p>We typically respond within 24-48 hours during business days.</p>
          <p>For urgent matters, please mark your email as high priority.</p>
        </div>
      </div>
    </section>
  );
}
