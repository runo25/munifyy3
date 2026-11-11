import React, { useState } from "react";
import { Plant3DIllustration } from "./Vectors";
import BottomNav from "./BottomNav";

export default function Earn() {
  const [toastMessage, setToastMessage] = useState("");
  const [isEarning, setIsEarning] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2500);
  };

  const handleStartEarning = () => {
    setIsEarning(true);
    showToast("Munify Daily Yield activated! APY 4.77%");
  };

  return (
    <div className="app-screen bg-[#F4F5F8] text-gray-900 min-h-screen flex flex-col justify-between pb-24 px-5 pt-4 select-none">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl flex items-center gap-2">
          <span className="text-[#16A34A]">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top 3D Plant Graphic */}
      <div className="flex flex-col items-center pt-2">
        <Plant3DIllustration className="w-32 h-32" />

        {/* APY Pill Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#1E5BF8] mt-3">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
            <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clipRule="evenodd" />
          </svg>
          <span>APY 4.77% Variable</span>
        </div>
      </div>

      {/* Main Copy */}
      <div className="flex flex-col items-center text-center my-3">
        <h1 className="text-gray-900 text-[28px] font-black uppercase tracking-tight leading-tight mb-2">
          LET YOUR MONEY<br />WORK FOR YOU!
        </h1>
        <p className="text-gray-500 text-xs max-w-[280px]">
          Make use of your savings while keeping full instant access.
        </p>
      </div>

      {/* Features List in White Cards */}
      <div className="space-y-3 px-1 my-2">
        <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-xs flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-full bg-blue-50 text-[#1E5BF8] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
            📅
          </div>
          <div>
            <div className="text-gray-900 text-[14px] font-bold">Get Paid Daily</div>
            <div className="text-gray-500 text-xs mt-0.5 leading-relaxed">
              Earn 4.77% APY credited to your available balance every single morning.
            </div>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-xs flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-full bg-blue-50 text-[#1E5BF8] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
            🔓
          </div>
          <div>
            <div className="text-gray-900 text-[14px] font-bold">Your Money, On Your Terms</div>
            <div className="text-gray-500 text-xs mt-0.5 leading-relaxed">
              Withdraw or spend anytime with no penalty or lockup periods.
            </div>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-xs flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-full bg-blue-50 text-[#1E5BF8] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
            🪙
          </div>
          <div>
            <div className="text-gray-900 text-[14px] font-bold">No Minimum Balance</div>
            <div className="text-gray-500 text-xs mt-0.5 leading-relaxed">
              Start earning daily interest from your very first euro or cent.
            </div>
          </div>
        </div>
      </div>

      {/* Start Button */}
      <div className="w-full pb-2 px-1">
        <button
          onClick={handleStartEarning}
          className="w-full bg-[#1E5BF8] hover:bg-[#194fd6] text-white font-extrabold text-[16px] py-4 rounded-full active:scale-[0.98] transition shadow-lg shadow-blue-500/25"
        >
          {isEarning ? "Yield Activated (Earning 4.77%)" : "Start Earning Now"}
        </button>
      </div>

      {/* Bottom Nav */}
      <BottomNav />
    </div>
  );
}
