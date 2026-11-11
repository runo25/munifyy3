import React, { useState } from "react";
import { MunifyVirtualCardGraphic } from "./Vectors";
import BottomNav from "./BottomNav";

export default function Cards() {
  const [toastMessage, setToastMessage] = useState("");
  const [cardIssued, setCardIssued] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2500);
  };

  const handleIssueCard = () => {
    setCardIssued(true);
    showToast("Virtual Debit Card activated instantly!");
  };

  return (
    <div className="app-screen bg-[#F4F5F8] text-gray-900 min-h-screen flex flex-col justify-between pb-24 px-5 pt-5 select-none">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl flex items-center gap-2">
          <span className="text-[#16A34A]">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Card Visual */}
      <div className="w-full pt-4 px-2">
        <div className="bg-gradient-to-tr from-[#1E5BF8] via-[#2563EB] to-[#60A5FA] p-6 rounded-3xl text-white shadow-xl max-w-[360px] mx-auto relative overflow-hidden">
          <div className="flex justify-between items-start mb-8">
            <span className="font-extrabold tracking-tight text-lg">Munify</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-xs">
              Virtual Visa
            </span>
          </div>
          <div className="text-xl font-mono tracking-widest mb-6">
            4152 •••• •••• 9924
          </div>
          <div className="flex justify-between items-end">
            <div>
              <div className="text-[10px] text-white/70 uppercase tracking-wider">Card Holder</div>
              <div className="font-bold text-sm tracking-wide">TORBJOERN JUHLIN</div>
            </div>
            <div>
              <div className="text-[10px] text-white/70 uppercase tracking-wider">Expires</div>
              <div className="font-bold text-sm">09/30</div>
            </div>
          </div>
        </div>
      </div>

      {/* Center Copy */}
      <div className="flex flex-col items-center text-center my-auto py-6">
        <h1 className="text-gray-900 text-[28px] font-black uppercase tracking-tight leading-tight mb-2">
          ISSUE VIRTUAL<br />DEBIT CARD
        </h1>
        <p className="text-gray-500 text-sm max-w-[280px]">
          Spend online worldwide directly from your EUR & USD balance with zero foreign exchange fees.
        </p>

        {/* Feature Pills */}
        <div className="grid grid-cols-2 gap-2 mt-6 w-full max-w-[340px]">
          <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-2.5">
            <span className="text-emerald-600 font-bold text-base">✓</span>
            <span className="text-xs font-bold text-gray-800">Apple / Google Pay</span>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-2.5">
            <span className="text-emerald-600 font-bold text-base">✓</span>
            <span className="text-xs font-bold text-gray-800">Zero FX Fees</span>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="w-full pb-2 px-2">
        <button
          onClick={handleIssueCard}
          className="w-full bg-[#1E5BF8] hover:bg-[#194fd6] text-white font-extrabold text-[16px] py-4 rounded-full active:scale-[0.98] transition shadow-lg shadow-blue-500/25"
        >
          {cardIssued ? "Manage Card Details" : "Get Card for Free"}
        </button>
      </div>

      {/* Bottom Nav with Cards active */}
      <BottomNav />
    </div>
  );
}
