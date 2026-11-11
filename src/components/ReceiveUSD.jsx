import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { bankData, profileData } from "../data";
import { FlagUS, FlagEU } from "./Vectors";

export default function ReceiveUSD() {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2200);
  };

  const handleCopy = (label, text) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied!`);
  };

  const accountHolder = profileData.name || "Torbjoern Juhlin";

  const Field = ({ label, value }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
      <div className="flex flex-col gap-0.5 pr-4">
        <span className="text-gray-400 text-[11px] font-bold tracking-wider uppercase">{label}</span>
        <span className="text-[14px] font-bold leading-snug text-gray-900 select-all">{value}</span>
      </div>
      <button
        onClick={() => handleCopy(label, value)}
        className="p-2 hover:bg-gray-100 rounded-xl transition text-gray-400 hover:text-[#1E5BF8] flex-shrink-0"
        title={`Copy ${label}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
        </svg>
      </button>
    </div>
  );

  return (
    <div className="app-screen bg-[#F4F5F8] text-gray-900 min-h-screen flex flex-col pb-10 select-none">
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
          className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700 active:scale-95 transition"
        >
          ←
        </button>
        <span className="font-bold text-sm text-gray-900">Banking Details</span>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-4 scrollbar-hide space-y-4">
        {/* EUR Account Card */}
        <div>
          <div className="flex items-center gap-2 mb-2 px-1">
            <FlagEU className="w-4 h-4" />
            <h3 className="text-gray-700 text-xs font-bold tracking-tight">EUR Account (SEPA)</h3>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <Field label="Recipient" value={bankData.recipient || accountHolder} />
            <Field label="IBAN" value={bankData.eurIban || "LT763500010019118917"} />
            <Field label="BIC / SWIFT" value={bankData.eurBic || "EVIULT2VXXX"} />
            <Field label="Bank Name" value={bankData.eurBankName || "Paysera LT, UAB"} />
            <Field label="Bank Address" value={bankData.eurBankAddress || "Pilatés pr. 16, Vilnius, LT-04352, Lithuania"} />
          </div>
        </div>

        {/* USD Account Card */}
        <div>
          <div className="flex items-center gap-2 mb-2 px-1">
            <FlagUS className="w-4 h-4" />
            <h3 className="text-gray-700 text-xs font-bold tracking-tight">USD Account (Wire / ACH)</h3>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <Field label="Account Holder" value={accountHolder} />
            <Field label="Account Number" value={bankData.usdAccountNumber || "217677388684"} />
            <Field label="Routing Number" value={bankData.usdRoutingNumber || "101019644"} />
            <Field label="Bank Name" value={bankData.usdBankName || "Lead Bank"} />
            <Field label="BIC / SWIFT" value={bankData.usdSwiftCode || "LEADUS49XXX"} />
          </div>
        </div>
      </div>
    </div>
  );
}
