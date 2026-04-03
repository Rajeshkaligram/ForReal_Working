"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { userAPI, BodyDetailsPayload } from "@/lib/api";
import { Loader2, Check } from "lucide-react";

export default function SettingsTab() {
  const { user, refreshProfile } = useAuth();

  const [profile, setProfile] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    contact_number: user?.contact_number || "",
    location: user?.location || "",
  });

  const [bodyDetails, setBodyDetails] = useState<BodyDetailsPayload>({
    size: user?.size || "",
    height: user?.height || "",
    breast: "",
    waist: user?.waist || "",
    hips: "",
    body_type: "1",
  });

  const [passwords, setPasswords] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const [paypalEmail, setPaypalEmail] = useState(user?.paypal_email || "");

  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMsg, setProfileMsg] = useState("");
  const [bodyLoading, setBodyLoading] = useState(false);
  const [bodyMsg, setBodyMsg] = useState("");
  const [passLoading, setPassLoading] = useState(false);
  const [passMsg, setPassMsg] = useState("");
  const [paypalLoading, setPaypalLoading] = useState(false);
  const [paypalMsg, setPaypalMsg] = useState("");

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileMsg("");
    try {
      const fd = new FormData();
      for (const [k, v] of Object.entries(profile)) fd.append(k, v);
      await userAPI.updateProfile(fd);
      await refreshProfile();
      setProfileMsg("✓ Profile updated successfully!");
    } catch (err: unknown) {
      setProfileMsg(err instanceof Error ? err.message : "Update failed.");
    } finally {
      setProfileLoading(false);
    }
  };

  const handleBodyDetailsSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setBodyLoading(true);
    setBodyMsg("");
    try {
      await userAPI.updateBodyDetails(bodyDetails);
      await refreshProfile();
      setBodyMsg("✓ Body details updated!");
    } catch (err: unknown) {
      setBodyMsg(err instanceof Error ? err.message : "Update failed.");
    } finally {
      setBodyLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new_password !== passwords.new_password_confirmation) {
      setPassMsg("New passwords do not match.");
      return;
    }
    setPassLoading(true);
    setPassMsg("");
    try {
      await userAPI.changePassword(passwords);
      setPasswords({ current_password: "", new_password: "", new_password_confirmation: "" });
      setPassMsg("✓ Password changed successfully!");
    } catch (err: unknown) {
      setPassMsg(err instanceof Error ? err.message : "Password change failed.");
    } finally {
      setPassLoading(false);
    }
  };

  const handlePaypalSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaypalLoading(true);
    setPaypalMsg("");
    try {
      await userAPI.updatePaypal(paypalEmail);
      await refreshProfile();
      setPaypalMsg("✓ PayPal account updated!");
    } catch (err: unknown) {
      setPaypalMsg(err instanceof Error ? err.message : "Update failed.");
    } finally {
      setPaypalLoading(false);
    }
  };

  const inputCls = "w-full border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary transition-colors";
  const labelCls = "block text-xs font-medium tracking-widest uppercase text-muted mb-2";
  const sectionCls = "bg-white border border-border p-6 md:p-8";

  return (
    <div className="space-y-8 max-w-2xl">
      {/* ── Profile Info ── */}
      <div className={sectionCls}>
        <h2 className="text-base font-medium mb-6">Profile Information</h2>
        <form onSubmit={handleProfileSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>First Name</label>
              <input className={inputCls} value={profile.first_name}
                onChange={(e) => setProfile({ ...profile, first_name: e.target.value })} />
            </div>
            <div>
              <label className={labelCls}>Last Name</label>
              <input className={inputCls} value={profile.last_name}
                onChange={(e) => setProfile({ ...profile, last_name: e.target.value })} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Email</label>
            <input type="email" className={inputCls} value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              placeholder="you@example.com" />
          </div>
          <div>
            <label className={labelCls}>Phone Number</label>
            <input type="tel" className={inputCls} value={profile.contact_number}
              onChange={(e) => setProfile({ ...profile, contact_number: e.target.value })}
              placeholder="+1 555 000 0000" />
          </div>
          <div>
            <label className={labelCls}>Location</label>
            <input className={inputCls} value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              placeholder="City, Country" />
          </div>
          {profileMsg && (
            <p className={`text-sm ${profileMsg.startsWith("✓") ? "text-green-600" : "text-red-600"}`}>
              {profileMsg}
            </p>
          )}
          <button type="submit" disabled={profileLoading}
            className="btn-bg flex items-center gap-2 disabled:opacity-60">
            {profileLoading ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
            {profileLoading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>

      {/* ── Body Details ── */}
      <div className={sectionCls}>
        <h2 className="text-base font-medium mb-2">Body Details</h2>
        <p className="text-xs text-muted mb-6">Help renters find the right fit.</p>
        <form onSubmit={handleBodyDetailsSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Size</label>
              <select className={inputCls} value={bodyDetails.size}
                onChange={(e) => setBodyDetails({ ...bodyDetails, size: e.target.value })}>
                <option value="">Select size</option>
                <option value="Extra Small">Extra Small</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
                <option value="Extra Large">Extra Large</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Height (feet)</label>
              <input type="number" step="0.1" min="4" max="7" className={inputCls} value={bodyDetails.height}
                onChange={(e) => setBodyDetails({ ...bodyDetails, height: e.target.value })}
                placeholder="5.7" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>Bust (inches)</label>
              <input type="number" min="20" max="100" className={inputCls} value={bodyDetails.breast}
                onChange={(e) => setBodyDetails({ ...bodyDetails, breast: e.target.value })}
                placeholder="35" />
            </div>
            <div>
              <label className={labelCls}>Waist (inches)</label>
              <input type="number" min="20" max="100" className={inputCls} value={bodyDetails.waist}
                onChange={(e) => setBodyDetails({ ...bodyDetails, waist: e.target.value })}
                placeholder="25" />
            </div>
            <div>
              <label className={labelCls}>Hips (inches)</label>
              <input type="number" min="20" max="100" className={inputCls} value={bodyDetails.hips}
                onChange={(e) => setBodyDetails({ ...bodyDetails, hips: e.target.value })}
                placeholder="29" />
            </div>
          </div>
          <div>
            <label className={labelCls}>Body Type</label>
            <select className={inputCls} value={bodyDetails.body_type}
              onChange={(e) => setBodyDetails({ ...bodyDetails, body_type: e.target.value })}>
              {[1, 2, 3, 4, 5].map((t) => (
                <option key={t} value={String(t)}>Type {t}</option>
              ))}
            </select>
          </div>
          {bodyMsg && (
            <p className={`text-sm ${bodyMsg.startsWith("✓") ? "text-green-600" : "text-red-600"}`}>
              {bodyMsg}
            </p>
          )}
          <button type="submit" disabled={bodyLoading}
            className="btn-bg flex items-center gap-2 disabled:opacity-60">
            {bodyLoading ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
            {bodyLoading ? "Saving..." : "Save Body Details"}
          </button>
        </form>
      </div>

      {/* ── Change Password ── */}
      <div className={sectionCls}>
        <h2 className="text-base font-medium mb-6">Change Password</h2>
        <form onSubmit={handleChangePassword} className="space-y-4">
          {(["current_password", "new_password", "new_password_confirmation"] as const).map((key) => (
            <div key={key}>
              <label className={labelCls}>
                {key === "current_password" ? "Current Password"
                  : key === "new_password" ? "New Password"
                  : "Confirm New Password"}
              </label>
              <input type="password" className={inputCls} value={passwords[key]}
                onChange={(e) => setPasswords({ ...passwords, [key]: e.target.value })}
                placeholder="••••••••" required />
            </div>
          ))}
          {passMsg && (
            <p className={`text-sm ${passMsg.startsWith("✓") ? "text-green-600" : "text-red-600"}`}>
              {passMsg}
            </p>
          )}
          <button type="submit" disabled={passLoading}
            className="btn-bg flex items-center gap-2 disabled:opacity-60">
            {passLoading ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
            {passLoading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>

      {/* ── PayPal ── */}
      <div className={sectionCls}>
        <h2 className="text-base font-medium mb-2">PayPal Account</h2>
        <p className="text-xs text-muted mb-6">
          Connect your PayPal to receive payments when your items are rented.
        </p>
        <form onSubmit={handlePaypalSave} className="space-y-4">
          <div>
            <label className={labelCls}>PayPal Email</label>
            <input type="email" className={inputCls} value={paypalEmail}
              onChange={(e) => setPaypalEmail(e.target.value)}
              placeholder="paypal@example.com" />
          </div>
          {paypalMsg && (
            <p className={`text-sm ${paypalMsg.startsWith("✓") ? "text-green-600" : "text-red-600"}`}>
              {paypalMsg}
            </p>
          )}
          <button type="submit" disabled={paypalLoading}
            className="btn-bg flex items-center gap-2 disabled:opacity-60">
            {paypalLoading ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
            {paypalLoading ? "Saving..." : "Save PayPal"}
          </button>
        </form>
      </div>
    </div>
  );
}
