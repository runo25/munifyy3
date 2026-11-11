import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { profileData } from "../data";
import { IconClose } from "./Vectors";
import BottomNav from "./BottomNav";

export default function Profile() {
  const navigate = useNavigate();
  const [faceIdEnabled, setFaceIdEnabled] = useState(profileData.faceIdEnabled ?? true);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2200);
  };

  const handleShareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: "Join Munify",
        text: profileData.inviteText,
        url: profileData.referralLink
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(profileData.referralLink);
      showToast("Referral link copied!");
    }
  };

  return (
    <div className="app-screen bg-[#F4F5F8] text-gray-900 min-h-screen flex flex-col pb-20 select-none">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl flex items-center gap-2">
          <span className="text-[#16A34A]">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="bg-white px-5 pt-4 pb-3 border-b border-gray-100 flex items-center justify-between shadow-xs">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200/80 flex items-center justify-center text-gray-700 active:scale-95 transition"
        >
          <IconClose className="w-5 h-5" color="#374151" />
        </button>
        <span className="font-bold text-sm text-gray-800">Account &amp; Settings</span>
        <button
          onClick={() => navigate("/admin")}
          className="text-xs font-bold text-[#1E5BF8] px-3 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100 transition"
        >
          Admin
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-4 scrollbar-hide space-y-5">
        {/* User Avatar & Name Card */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center font-black text-2xl tracking-wider shadow-md mb-3">
            {profileData.initials || "TJ"}
          </div>
          <h2 className="text-gray-900 text-xl font-black tracking-tight">
            {profileData.name || "Torbjoern Juhlin"}
          </h2>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 text-[#1E5BF8] text-xs font-semibold mt-1">
            <span>●</span>
            <span>{profileData.accountType || "Payment account"}</span>
          </div>
          <div className="text-gray-400 text-xs font-mono mt-2">
            {profileData.phone || "+46 70 821 9452"}
          </div>
        </div>

        {/* Invite Friends Card */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-[#1E5BF8] rounded-3xl p-4.5 text-white flex items-center justify-between shadow-md">
          <div className="flex-1 pr-3 z-10">
            <div className="text-white text-[13px] font-bold leading-snug">
              Invite friends, earn €10<br />when they spend €200.
            </div>
          </div>
          <button
            onClick={handleShareLink}
            className="z-10 bg-white hover:bg-gray-50 text-[#1E5BF8] font-extrabold text-xs px-4 py-2.5 rounded-full active:scale-95 transition whitespace-nowrap shadow-sm"
          >
            Share Link
          </button>
        </div>

        {/* Section 1: Profile & Accounts */}
        <div>
          <h3 className="text-gray-600 text-xs font-bold mb-2 px-1 tracking-tight">
            Profile &amp; Accounts
          </h3>
          <div className="bg-white rounded-2xl divide-y divide-gray-100 border border-gray-100 shadow-sm overflow-hidden">
            {/* My accounts */}
            <div
              onClick={() => navigate("/receive/usd")}
              className="p-3.5 px-4 flex items-center justify-between cursor-pointer hover:bg-gray-50/70 transition"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-full bg-blue-50 text-[#1E5BF8] flex items-center justify-center font-bold">
                  🏦
                </div>
                <div>
                  <span className="text-gray-900 text-sm font-bold block">Bank Account Details</span>
                  <span className="text-xs text-gray-400">EUR SEPA &amp; USD Wire details</span>
                </div>
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" className="w-4 h-4">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>

            {/* Limits */}
            <div
              onClick={() => showToast("Daily limit: €25,000 / day")}
              className="p-3.5 px-4 flex items-center justify-between cursor-pointer hover:bg-gray-50/70 transition"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-full bg-emerald-50 text-[#16A34A] flex items-center justify-center font-bold">
                  💳
                </div>
                <div>
                  <span className="text-gray-900 text-sm font-bold block">Account Limits</span>
                  <span className="text-xs text-gray-400">Tier 2 verified • Unlimited</span>
                </div>
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" className="w-4 h-4">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Section 2: Security & App Settings */}
        <div>
          <h3 className="text-gray-600 text-xs font-bold mb-2 px-1 tracking-tight">
            Security &amp; Preferences
          </h3>
          <div className="bg-white rounded-2xl divide-y divide-gray-100 border border-gray-100 shadow-sm overflow-hidden">
            {/* Sign in with Face ID */}
            <div className="p-3.5 px-4 flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                  🛡️
                </div>
                <div>
                  <span className="text-gray-900 text-sm font-bold block">Biometric Lock (Face ID)</span>
                  <span className="text-xs text-gray-400">Secure app authentication</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setFaceIdEnabled(!faceIdEnabled);
                  showToast(faceIdEnabled ? "Face ID disabled" : "Face ID enabled");
                }}
                className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-200 ${
                  faceIdEnabled ? "bg-[#1E5BF8]" : "bg-gray-200"
                }`}
              >
                <div
                  className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                    faceIdEnabled ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Install PWA */}
            <div
              onClick={() => window.dispatchEvent(new CustomEvent("munify_show_install_guide"))}
              className="p-3.5 px-4 flex items-center justify-between cursor-pointer hover:bg-gray-50/70 transition"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-full bg-blue-50 text-[#1E5BF8] flex items-center justify-center font-bold">
                  📲
                </div>
                <div>
                  <span className="text-gray-900 text-sm font-bold block">Add to Home Screen</span>
                  <span className="text-xs text-gray-400">Install PWA on iOS / Android</span>
                </div>
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" className="w-4 h-4">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Section 3: Support */}
        <div>
          <h3 className="text-gray-600 text-xs font-bold mb-2 px-1 tracking-tight">
            Support
          </h3>
          <div className="bg-white rounded-2xl divide-y divide-gray-100 border border-gray-100 shadow-sm overflow-hidden">
            <div
              onClick={() => navigate("/chat")}
              className="p-3.5 px-4 flex items-center justify-between cursor-pointer hover:bg-gray-50/70 transition"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-full bg-emerald-50 text-[#16A34A] flex items-center justify-center font-bold">
                  💬
                </div>
                <div>
                  <span className="text-gray-900 text-sm font-bold block">Chat with Ahmed</span>
                  <span className="text-xs text-gray-400">Munify Live Support &amp; Refunds</span>
                </div>
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" className="w-4 h-4">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Section 4: Logout */}
        <div className="mb-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div
              onClick={() => showToast("Signed out successfully")}
              className="p-3.5 px-4 flex items-center justify-between cursor-pointer hover:bg-gray-50/70 transition"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-full bg-red-50 text-red-600 flex items-center justify-center font-bold">
                  🚪
                </div>
                <span className="text-red-600 text-sm font-bold">Log Out</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Nav with More active */}
      <BottomNav />
    </div>
  );
}
