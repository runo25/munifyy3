import React, { useState } from "react";
import { usdcWallet, bankData, profileData } from "../data";
import { UsdcIcon, BaseLogo, IconCopy, FlagEU, FlagUS } from "./Vectors";

export default function AccountInfoModal({ isOpen, onClose }) {
  const [toastMessage, setToastMessage] = useState("");
  const [activeTab, setActiveTab] = useState("eur"); // "eur" | "usd" | "usdc"

  if (!isOpen) return null;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2200);
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied!`);
  };

  const accountHolder = profileData.name || "Torbjoern Juhlin";

  const eurFields = [
    { label: "IBAN", value: bankData.eurIban || "LT763500010019118917" },
    { label: "Bank name", value: bankData.eurBankName || "Paysera LT, UAB" },
    { label: "SWIFT/BIC", value: bankData.eurBic || "EVIULT2VXXX" },
    { label: "Recipient", value: bankData.recipient || accountHolder },
    { label: "Bank address", value: bankData.eurBankAddress || "Pilatés pr. 16, Vilnius, LT-04352, Lithuania" },
    { label: "Currency", value: "EUR" },
    { label: "Account type", value: bankData.eurAccountType || "CHECKING" }
  ];

  const usdFields = [
    { label: "Account holder name", value: accountHolder },
    { label: "Account number", value: bankData.usdAccountNumber || "217677388684" },
    { label: "Routing number", value: bankData.usdRoutingNumber || "101019644" },
    { label: "Account type", value: bankData.usdAccountType || "CHECKING" },
    { label: "Bank name", value: bankData.usdBankName || "Lead Bank" },
    { label: "BIC / Swift", value: bankData.usdSwiftCode || "LEADUS49XXX" },
    { label: "Bank address", value: bankData.usdBankAddress || "1801 Main St., Kansas City, MO 64108" }
  ];

  const shareDetails = () => {
    let text = "";
    if (activeTab === "eur") {
      text = `Munify EUR Account Details:\nIBAN: ${bankData.eurIban}\nBank name: ${bankData.eurBankName}\nSWIFT/BIC: ${bankData.eurBic}\nRecipient: ${bankData.recipient || accountHolder}\nBank address: ${bankData.eurBankAddress}\nCurrency: EUR`;
    } else if (activeTab === "usd") {
      text = `Munify USD Receiving Details:\nBank: ${bankData.usdBankName}\nAccount Name: ${accountHolder}\nAccount Number: ${bankData.usdAccountNumber}\nRouting Number: ${bankData.usdRoutingNumber}\nBIC/Swift: ${bankData.usdSwiftCode}`;
    } else {
      text = `Munify USDC Base Address:\n${usdcWallet.fullAddress}`;
    }

    if (navigator.share) {
      navigator.share({ title: "Munify Account Details", text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      showToast("Details copied to clipboard!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl flex items-center gap-2">
          <span className="text-[#16A34A]">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Backdrop tap to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Bottom Sheet Card */}
      <div className="relative z-10 w-full max-w-[440px] max-h-[92vh] overflow-y-auto bg-white rounded-t-[32px] p-5 pb-8 scrollbar-hide shadow-2xl border-t border-gray-100">
        {/* Handle Bar */}
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4 cursor-pointer" onClick={onClose} />

        {/* Header navigation bar */}
        <div className="flex items-center justify-between mb-4 px-1">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200/80 flex items-center justify-center text-gray-700 active:scale-95 transition"
            title="Back"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Currency Tabs */}
          <div className="flex items-center bg-gray-100 p-1 rounded-full border border-gray-200/60">
            <button
              onClick={() => setActiveTab("eur")}
              className={`px-3 py-1 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === "eur" ? "bg-white text-gray-900 shadow-xs" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <FlagEU className="w-3.5 h-3.5" />
              <span>EUR</span>
            </button>
            <button
              onClick={() => setActiveTab("usd")}
              className={`px-3 py-1 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === "usd" ? "bg-white text-gray-900 shadow-xs" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <FlagUS className="w-3.5 h-3.5" />
              <span>USD</span>
            </button>
            <button
              onClick={() => setActiveTab("usdc")}
              className={`px-3 py-1 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === "usdc" ? "bg-white text-gray-900 shadow-xs" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <UsdcIcon className="w-3.5 h-3.5" />
              <span>USDC</span>
            </button>
          </div>

          <div className="w-9" />
        </div>

        {/* Modal Title */}
        <div className="mb-5 text-center">
          <h2 className="text-gray-900 text-xl font-black tracking-tight">
            {activeTab === "eur" && "Receiving EUR via SEPA"}
            {activeTab === "usd" && "Receiving USD via Wire / ACH"}
            {activeTab === "usdc" && "Receiving USDC on Base"}
          </h2>
          <p className="text-gray-500 text-xs mt-1">
            {activeTab === "eur" && "Instant transfers within Europe with zero receiving fees."}
            {activeTab === "usd" && "Domestic and international USD wires directly to your account."}
            {activeTab === "usdc" && "Instant cryptocurrency deposits credited directly to balance."}
          </p>
        </div>

        {/* Tab 1: EUR SEPA Fields */}
        {activeTab === "eur" && (
          <div className="space-y-3 mb-6">
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200/70 divide-y divide-gray-200/60">
              {eurFields.map((field) => (
                <div key={field.label} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] font-medium text-gray-500">{field.label}</span>
                    <span className="text-[13px] font-bold text-gray-900 truncate">{field.value}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(field.value, field.label)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-[#1E5BF8] hover:bg-white transition"
                    title={`Copy ${field.label}`}
                  >
                    <IconCopy className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: USD Fields */}
        {activeTab === "usd" && (
          <div className="space-y-3 mb-6">
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200/70 divide-y divide-gray-200/60">
              {usdFields.map((field) => (
                <div key={field.label} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] font-medium text-gray-500">{field.label}</span>
                    <span className="text-[13px] font-bold text-gray-900 truncate">{field.value}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(field.value, field.label)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-[#1E5BF8] hover:bg-white transition"
                    title={`Copy ${field.label}`}
                  >
                    <IconCopy className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: USDC Base Wallet */}
        {activeTab === "usdc" && (
          <div className="space-y-4 mb-6">
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200/70 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <BaseLogo className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold text-gray-900">Base Network Only</span>
              <span className="text-[11px] text-gray-500 mt-0.5">Send only USDC on Base network</span>

              <div className="w-full bg-white rounded-xl p-3 border border-gray-200 mt-4 flex items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold text-gray-900 break-all text-left">
                  {usdcWallet.fullAddress || "0x30F15b6d92008E1De926A4e99fE826cBF7F9FF2d"}
                </span>
                <button
                  onClick={() => copyToClipboard(usdcWallet.fullAddress, "USDC Address")}
                  className="p-2 rounded-lg bg-blue-50 text-[#1E5BF8] hover:bg-blue-100 flex-shrink-0"
                >
                  <IconCopy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Action Button: Share Details */}
        <button
          onClick={shareDetails}
          className="w-full bg-[#1E5BF8] hover:bg-[#194fd6] text-white font-extrabold text-[15px] py-3.5 rounded-full active:scale-[0.98] transition shadow-md flex items-center justify-center gap-2"
        >
          <span>Share Details</span>
        </button>
      </div>
    </div>
  );
}
