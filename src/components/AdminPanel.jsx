import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  profileData,
  dashboardData,
  transactions,
  bankData,
  usdcWallet,
  updateBalance,
  triggerCustomPush
} from "../data";
import { IconClose } from "./Vectors";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [balanceVal, setBalanceVal] = useState(dashboardData.totalBalanceRaw !== undefined ? dashboardData.totalBalanceRaw : 0.00);
  const [userName, setUserName] = useState(profileData.name);
  const [userPhone, setUserPhone] = useState(profileData.phone);
  const [toastMessage, setToastMessage] = useState("");
  const [pushTitle, setPushTitle] = useState("Munify Notification");
  const [pushMsg, setPushMsg] = useState("Your USDC transfer has been confirmed on Base network.");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2200);
  };

  const handleSaveBalance = (e) => {
    e.preventDefault();
    const val = parseFloat(balanceVal);
    if (!isNaN(val)) {
      updateBalance(val, "EUR");
      showToast(`Balance updated to EUR ${val.toFixed(2)}`);
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    profileData.name = userName;
    profileData.phone = userPhone;
    profileData.initials = userName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    showToast("Profile information saved!");
  };

  const handleTriggerPush = (e) => {
    e.preventDefault();
    triggerCustomPush(pushTitle, pushMsg);
    showToast("Push notification dispatched!");
  };

  return (
    <div className="app-screen text-white bg-[#000000] min-h-screen flex flex-col pb-12 select-none">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#69ea64] text-black px-4 py-2 rounded-full text-xs font-bold shadow-xl flex items-center gap-2">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06] sticky top-0 bg-black/90 backdrop-blur-md z-10">
        <button
          onClick={() => navigate("/")}
          className="w-10 h-10 rounded-full bg-[#1e201e] border border-white/5 flex items-center justify-center text-white active:scale-95 transition"
        >
          <IconClose className="w-5 h-5" />
        </button>
        <h1 className="text-base font-bold text-white tracking-tight">Munify Admin Console</h1>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-6 scrollbar-hide space-y-6">
        {/* Balance Management */}
        <div className="bg-[#131513] rounded-[24px] p-5 border border-white/[0.04]">
          <h2 className="text-white text-[15px] font-bold mb-3">Live Balance Editor</h2>
          <form onSubmit={handleSaveBalance} className="space-y-3">
            <div>
              <label className="text-xs text-gray-400 block mb-1">Total Balance (USD)</label>
              <input
                type="number"
                step="0.01"
                value={balanceVal}
                onChange={(e) => setBalanceVal(e.target.value)}
                className="w-full bg-[#1c1e1c] rounded-xl px-4 py-2.5 text-white font-mono text-sm border border-white/10 outline-none focus:border-[#69ea64]"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setBalanceVal(0.41);
                  updateBalance(0.41);
                  showToast("Balance reset to template default ($0.41)");
                }}
                className="flex-1 bg-[#242624] text-white text-xs font-semibold py-2.5 rounded-xl transition"
              >
                Reset ($0.41)
              </button>
              <button
                type="submit"
                className="flex-1 bg-[#69ea64] text-black text-xs font-bold py-2.5 rounded-xl transition shadow-sm"
              >
                Update Balance
              </button>
            </div>
          </form>
        </div>

        {/* Profile Details */}
        <div className="bg-[#131513] rounded-[24px] p-5 border border-white/[0.04]">
          <h2 className="text-white text-[15px] font-bold mb-3">Profile Settings</h2>
          <form onSubmit={handleSaveProfile} className="space-y-3">
            <div>
              <label className="text-xs text-gray-400 block mb-1">Display Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full bg-[#1c1e1c] rounded-xl px-4 py-2.5 text-white text-sm border border-white/10 outline-none focus:border-[#69ea64]"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Phone Number</label>
              <input
                type="text"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                className="w-full bg-[#1c1e1c] rounded-xl px-4 py-2.5 text-white text-sm border border-white/10 outline-none focus:border-[#69ea64]"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#69ea64] text-black text-xs font-bold py-2.5 rounded-xl transition shadow-sm"
            >
              Save Profile
            </button>
          </form>
        </div>

        {/* Dispatch Push Simulation */}
        <div className="bg-[#131513] rounded-[24px] p-5 border border-white/[0.04]">
          <h2 className="text-white text-[15px] font-bold mb-3">Push Notification Simulator</h2>
          <form onSubmit={handleTriggerPush} className="space-y-3">
            <div>
              <label className="text-xs text-gray-400 block mb-1">Title</label>
              <input
                type="text"
                value={pushTitle}
                onChange={(e) => setPushTitle(e.target.value)}
                className="w-full bg-[#1c1e1c] rounded-xl px-4 py-2.5 text-white text-sm border border-white/10 outline-none focus:border-[#69ea64]"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Message</label>
              <input
                type="text"
                value={pushMsg}
                onChange={(e) => setPushMsg(e.target.value)}
                className="w-full bg-[#1c1e1c] rounded-xl px-4 py-2.5 text-white text-sm border border-white/10 outline-none focus:border-[#69ea64]"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#69ea64] text-black text-xs font-bold py-2.5 rounded-xl transition shadow-sm"
            >
              Dispatch Notification
            </button>
          </form>
        </div>

        {/* Quick Links */}
        <div className="bg-[#131513] rounded-[24px] p-5 border border-white/[0.04] space-y-2">
          <h2 className="text-white text-[15px] font-bold mb-2">Direct Navigation</h2>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => navigate("/")}
              className="bg-[#1c1e1c] hover:bg-[#252825] p-3 rounded-xl text-xs font-semibold text-white text-left transition"
            >
              🏠 Home
            </button>
            <button
              onClick={() => navigate("/cards")}
              className="bg-[#1c1e1c] hover:bg-[#252825] p-3 rounded-xl text-xs font-semibold text-white text-left transition"
            >
              💳 Cards
            </button>
            <button
              onClick={() => navigate("/earn")}
              className="bg-[#1c1e1c] hover:bg-[#252825] p-3 rounded-xl text-xs font-semibold text-white text-left transition"
            >
              🌱 Earn
            </button>
            <button
              onClick={() => navigate("/payments")}
              className="bg-[#1c1e1c] hover:bg-[#252825] p-3 rounded-xl text-xs font-semibold text-white text-left transition"
            >
              ⇄ Payments
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
