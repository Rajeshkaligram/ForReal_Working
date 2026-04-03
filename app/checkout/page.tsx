"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, CreditCard, Loader2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { checkoutAPI } from "@/lib/api";

export default function CheckoutPage() {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    address: "",
    city: "",
    state: "",
    zip_code: "",
    country: "USA",
    contact_number: ""
  });

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/auth/login");
    }
  }, [isLoading, isLoggedIn, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // 1. Fetch local cart
      const { localCartAPI, cartAPI, checkoutAPI } = await import('@/lib/api');
      const cartItems = localCartAPI.get();
      
      if (!cartItems || cartItems.length === 0) {
        throw new Error("Your cart is empty. Please add items before checking out.");
      }

      // We need to add them to the backend cart, to create Rent records with shipping!
      // To ensure no collision, optionally clear the backend cart first:
      try {
         await cartAPI.empty();
      } catch (e) { /* ignore error if cart is already empty */ }

      // 2. Loop through local cart and add them one by one to the backend Cart
      for (const item of cartItems) {
        await cartAPI.add({
          product_id: item.product_id.toString(),
          rental_start_date: item.rental_start_date,
          rental_end_date: item.rental_end_date,
          delivery_option: "Regular mail", // or get from form if added
          street_number: form.address,
          address: form.address,
          city: form.city,
          state: form.state,
          postal_code: form.zip_code,
          country: form.country,
          contact_number: form.contact_number,
        });
      }

      // 3. To checkout, we need the `rent_details.id` from the backend!
      const backendCartRes = await cartAPI.get();
      const backendItems = Array.isArray(backendCartRes.data) ? backendCartRes.data : [];
      
      if (!backendItems || backendItems.length === 0) {
        throw new Error("Failed to synchronize cart with the server.");
      }

      // Just checkout the first item for now (or backend may support multiple, but API says rented_id, singular)
      const cartId = backendItems[0].id || (backendItems[0] as any).cartID;

      setSuccess("Order synchronized. Redirecting to payment gateway...");
      
      // 4. Generate payment
      const paymentRes = await checkoutAPI.generatePaymentUrl(cartId.toString());
      const paymentUrl = paymentRes.payment_url || (paymentRes as any).data?.payment_url;
      
      if (paymentUrl) {
         localCartAPI.empty();
        window.location.href = paymentUrl;
      } else {
         localCartAPI.empty();
         setSuccess("Order confirmed successfully! (Mock payment flow)");
         setTimeout(() => router.push("/profile"), 2000);
      }
      
    } catch (err: any) {
      setError(err.message || "An error occurred during checkout.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading || !isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <section className="py-12 md:py-20 min-h-screen bg-neutral-50/50">
      <div className="container max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Link href="/cart" className="text-muted hover:text-primary transition-colors">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-3xl font-serif font-medium flex items-center gap-3">
            <CreditCard size={28} /> Secure Checkout
          </h1>
        </div>

        <div className="bg-white p-8 rounded-xl border border-border shadow-sm">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded mb-6 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 text-green-600 p-4 rounded mb-6 text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleCheckout} className="space-y-6">
            <h2 className="text-lg font-medium">Shipping Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted uppercase tracking-wider mb-1">Street Address</label>
                <input required type="text" name="address" value={form.address} onChange={handleChange} className="w-full border border-border px-4 py-3 rounded outline-none focus:border-primary" placeholder="123 Fashion Ave" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted uppercase tracking-wider mb-1">City</label>
                  <input required type="text" name="city" value={form.city} onChange={handleChange} className="w-full border border-border px-4 py-3 rounded outline-none focus:border-primary" placeholder="New York" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted uppercase tracking-wider mb-1">State/Province</label>
                  <input required type="text" name="state" value={form.state} onChange={handleChange} className="w-full border border-border px-4 py-3 rounded outline-none focus:border-primary" placeholder="NY" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted uppercase tracking-wider mb-1">Zip / Postal Code</label>
                  <input required type="text" name="zip_code" value={form.zip_code} onChange={handleChange} className="w-full border border-border px-4 py-3 rounded outline-none focus:border-primary" placeholder="10001" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted uppercase tracking-wider mb-1">Contact Number</label>
                  <input required type="tel" name="contact_number" value={form.contact_number} onChange={handleChange} className="w-full border border-border px-4 py-3 rounded outline-none focus:border-primary" placeholder="+1 555-555-5555" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-muted uppercase tracking-wider mb-1">Country</label>
                <select name="country" value={form.country} onChange={handleChange} className="w-full border border-border px-4 py-3 rounded outline-none focus:border-primary bg-white">
                  <option value="USA">United States</option>
                  <option value="CAN">Canada</option>
                  <option value="UK">United Kingdom</option>
                </select>
              </div>
            </div>

            <hr className="border-border" />

            <button disabled={loading} type="submit" className="btn-bg w-full py-4 text-lg font-medium flex items-center justify-center gap-2">
              {loading && <Loader2 size={20} className="animate-spin" />}
              {loading ? "Processing..." : "Place Order & Pay"}
            </button>
            <p className="text-center text-xs text-muted mt-4">
              By placing your order you agree to our Terms of Service and Rental Agreement.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
