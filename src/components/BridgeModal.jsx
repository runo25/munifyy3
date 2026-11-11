import React from "react";
import { BridgeOrbitGraphic, IconClose } from "./Vectors";

export default function BridgeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-[440px] max-h-[95vh] overflow-y-auto bg-white rounded-t-[32px] p-6 pb-10 shadow-2xl border-t border-gray-100 scrollbar-hide animate-in slide-in-from-bottom duration-300">
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4 cursor-pointer" onClick={onClose} />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200/80 flex items-center justify-center text-gray-700 active:scale-95 transition mb-3"
        >
          <IconClose className="w-5 h-5" color="#374151" />
        </button>

        {/* 3D Orbiting Coins Graphic */}
        <div className="flex justify-center my-2">
          <BridgeOrbitGraphic className="w-52 h-36" />
        </div>

        {/* Title */}
        <h2 className="text-center text-gray-900 text-[24px] font-black uppercase tracking-tight leading-tight mt-2 mb-2">
          CURRENCY &amp; CRYPTO<br />EXCHANGE
        </h2>

        {/* Subtitle */}
        <p className="text-center text-gray-500 text-xs leading-relaxed max-w-[310px] mx-auto mb-6">
          Convert instantly between EUR, USD, SEK, GBP, and USDC with ultra-low transparent spreads.
        </p>

        {/* Feature List */}
        <div className="space-y-3 mb-6">
          <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100 flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-full bg-blue-100 text-[#1E5BF8] flex items-center justify-center flex-shrink-0 font-bold text-sm">
              🛡️
            </div>
            <div>
              <div className="text-gray-900 text-[14px] font-bold">Secured &amp; Audited</div>
              <div className="text-gray-500 text-xs mt-0.5">Licensed European financial institution.</div>
            </div>
          </div>

          <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100 flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-full bg-blue-100 text-[#1E5BF8] flex items-center justify-center flex-shrink-0 font-bold text-sm">
              ⚡
            </div>
            <div>
              <div className="text-gray-900 text-[14px] font-bold">Instant Execution</div>
              <div className="text-gray-500 text-xs mt-0.5">Zero slippage on major currency pairs.</div>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={() => {
            alert("Exchange initiated!");
            onClose();
          }}
          className="w-full bg-[#1E5BF8] hover:bg-[#194fd6] text-white font-extrabold text-[15px] py-4 rounded-full active:scale-[0.98] transition shadow-lg shadow-blue-500/25"
        >
          Exchange Now
        </button>
      </div>
    </div>
  );
}
