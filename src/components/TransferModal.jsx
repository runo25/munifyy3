import React, { useState } from "react";
import { BaseLogo, UsdcIcon, IconClose } from "./Vectors";

export default function TransferModal({ isOpen, onClose, onSelectDestination }) {
  const [tab, setTab] = useState("accounts");
  const [search, setSearch] = useState("");

  if (!isOpen) return null;

  const destinations = [
    {
      id: "dest_ladislav",
      name: "LADISLAV SUNKOVSKY",
      subtitle: "Pending verification • SEPA Instant",
      initials: "LS",
      avatarColor: "#A855F7"
    },
    {
      id: "dest_pall",
      name: "PALL HEIMIR PALSSON",
      subtitle: "Pending verification • SEPA Instant",
      initials: "PH",
      avatarColor: "#0EA5E9"
    },
    {
      id: "dest_alvaro",
      name: "Alvaro Padilla Llamas",
      subtitle: "Recent payment recipient",
      initials: "AP",
      avatarColor: "#14B8A6"
    },
    {
      id: "dest_danish",
      name: "DANISH SHAIKH",
      subtitle: "Instant SEPA",
      initials: "DS",
      avatarColor: "#0284C7"
    },
    {
      id: "dest_usdc",
      name: "USDC Wallet - 0x86..7ffd",
      subtitle: "Base network • 0x8672...ffd",
      initials: "UW",
      avatarColor: "#2563EB"
    }
  ];

  const filtered = destinations.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.subtitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-[440px] max-h-[92vh] overflow-y-auto bg-white rounded-t-[32px] p-6 pb-12 shadow-2xl border-t border-gray-100 scrollbar-hide animate-in slide-in-from-bottom duration-300">
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4 cursor-pointer" onClick={onClose} />

        {/* Top Bar with Close */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200/80 flex items-center justify-center text-gray-700 active:scale-95 transition"
          >
            <IconClose className="w-5 h-5" color="#374151" />
          </button>

          <span className="font-bold text-sm text-gray-800">Send Money</span>

          <div className="w-10" />
        </div>

        {/* Heading */}
        <h2 className="text-gray-900 text-[24px] font-black tracking-tight mb-4">
          Select Recipient
        </h2>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setTab("accounts")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
              tab === "accounts"
                ? "bg-gray-900 text-white shadow-xs"
                : "bg-gray-100 text-gray-600 hover:text-gray-900"
            }`}
          >
            Recent Recipients
          </button>
          <button
            onClick={() => setTab("new")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
              tab === "new"
                ? "bg-gray-900 text-white shadow-xs"
                : "bg-gray-100 text-gray-600 hover:text-gray-900"
            }`}
          >
            Bank Transfer (IBAN)
          </button>
        </div>

        {/* Search Row */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 bg-gray-50 rounded-2xl px-4 py-2.5 border border-gray-200 flex items-center">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, IBAN or wallet"
              className="bg-transparent text-xs text-gray-900 placeholder-gray-400 outline-none w-full font-medium"
            />
          </div>
        </div>

        {/* Destination List */}
        <div className="space-y-2">
          {filtered.map((dest) => (
            <button
              key={dest.id}
              onClick={() => (onSelectDestination ? onSelectDestination(dest) : onClose())}
              className="w-full bg-gray-50 hover:bg-gray-100 active:scale-[0.99] transition rounded-2xl p-3.5 flex items-center justify-between text-left border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div
                  style={{ backgroundColor: dest.avatarColor || "#1E5BF8" }}
                  className="w-10 h-10 rounded-full text-white font-bold text-xs flex items-center justify-center flex-shrink-0"
                >
                  {dest.initials}
                </div>
                <div>
                  <div className="text-gray-900 text-[14px] font-bold">{dest.name}</div>
                  <div className="text-gray-500 text-[11px] mt-0.5">{dest.subtitle}</div>
                </div>
              </div>
              <span className="text-[#1E5BF8] text-xs font-bold">Send →</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
