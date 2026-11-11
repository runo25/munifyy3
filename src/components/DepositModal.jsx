import React from "react";
import { IconClose } from "./Vectors";

export default function DepositModal({ isOpen, onClose, onSelectOption }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Backdrop tap to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Screen container */}
      <div className="relative z-10 w-full max-w-[440px] bg-white rounded-t-[32px] p-6 pb-12 shadow-2xl border-t border-gray-100 animate-in slide-in-from-bottom duration-300">
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4 cursor-pointer" onClick={onClose} />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200/80 flex items-center justify-center text-gray-700 active:scale-95 transition mb-4"
        >
          <IconClose className="w-5 h-5" color="#374151" />
        </button>

        {/* Heading */}
        <h2 className="text-gray-900 text-[26px] font-black tracking-tight leading-tight mb-5">
          How would you like to add funds?
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {/* Instant Bank Transfer */}
          <button
            onClick={() => (onSelectOption ? onSelectOption("bank") : onClose())}
            className="w-full bg-gray-50 hover:bg-gray-100 active:scale-[0.99] transition rounded-2xl p-4 flex items-center justify-between text-left border border-gray-200/70"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-blue-100 text-[#1E5BF8] flex items-center justify-center flex-shrink-0 font-bold text-base">
                🏦
              </div>
              <div>
                <div className="text-gray-900 text-[15px] font-bold">Bank Transfer (SEPA / Wire)</div>
                <div className="text-gray-500 text-xs mt-0.5">Instant EUR SEPA &amp; international wires</div>
              </div>
            </div>
            <svg viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" className="w-4 h-4 ml-2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Stablecoins / Crypto */}
          <button
            onClick={() => (onSelectOption ? onSelectOption("stablecoins") : onClose())}
            className="w-full bg-gray-50 hover:bg-gray-100 active:scale-[0.99] transition rounded-2xl p-4 flex items-center justify-between text-left border border-gray-200/70"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-emerald-100 text-[#16A34A] flex items-center justify-center flex-shrink-0 font-bold text-base">
                🪙
              </div>
              <div>
                <div className="text-gray-900 text-[15px] font-bold">Stablecoins (USDC Base)</div>
                <div className="text-gray-500 text-xs mt-0.5">Instant blockchain transfer directly to balance</div>
              </div>
            </div>
            <svg viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" className="w-4 h-4 ml-2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
