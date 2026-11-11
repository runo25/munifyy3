import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { profileData } from "../data";
import { PrecisionQrSvg } from "./Vectors";

export default function Scan() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("scan"); // "scan" | "my_code"
  const [torchOn, setTorchOn] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2500);
  };

  const handleCopyTag = () => {
    navigator.clipboard.writeText("torbjoern.juhlin@munify.app");
    showToast("Payment ID copied to clipboard!");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Pay Torbjoern on Munify",
        text: `Pay Torbjoern Juhlin using Munify account or SEPA`,
        url: `https://munify.app/pay/torbjoern`
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`https://munify.app/pay/torbjoern`);
      showToast("Payment link copied!");
    }
  };

  return (
    <div className="app-screen bg-[#F4F5F8] text-gray-900 min-h-screen flex flex-col justify-between select-none">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-4 py-2 rounded-full text-xs font-bold shadow-2xl flex items-center gap-2">
          <span className="text-[#16A34A]">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white sticky top-0 z-20 shadow-xs">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-700 hover:text-gray-900 rounded-full p-2 -ml-2 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </button>

        {/* Tab pills */}
        <div className="flex bg-gray-100 p-1 rounded-full border border-gray-200/60">
          <button
            onClick={() => setActiveTab("scan")}
            className={`px-4 py-1 rounded-full text-xs font-bold transition ${
              activeTab === "scan" ? "bg-white text-gray-900 shadow-xs" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Scan QR
          </button>
          <button
            onClick={() => setActiveTab("my_code")}
            className={`px-4 py-1 rounded-full text-xs font-bold transition ${
              activeTab === "my_code" ? "bg-white text-gray-900 shadow-xs" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            My QR Code
          </button>
        </div>

        <div className="w-8" />
      </div>

      {/* Main View Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {activeTab === "scan" ? (
          <div className="flex flex-col items-center w-full max-w-[320px]">
            {/* Viewfinder Target */}
            <div className="w-64 h-64 relative rounded-[28px] overflow-hidden border-2 border-gray-200 bg-white flex items-center justify-center shadow-lg">
              {/* Corner Viewfinder Guides */}
              <div className="absolute top-2 left-2 w-8 h-8 border-t-4 border-l-4 border-[#1E5BF8] rounded-tl-xl" />
              <div className="absolute top-2 right-2 w-8 h-8 border-t-4 border-r-4 border-[#1E5BF8] rounded-tr-xl" />
              <div className="absolute bottom-2 left-2 w-8 h-8 border-b-4 border-l-4 border-[#1E5BF8] rounded-bl-xl" />
              <div className="absolute bottom-2 right-2 w-8 h-8 border-b-4 border-r-4 border-[#1E5BF8] rounded-br-xl" />

              {/* Animated Laser Sweep */}
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#1E5BF8] to-transparent shadow-[0_0_15px_#1E5BF8] animate-[bounce_2.5s_infinite]" />

              <div className="text-gray-400 text-xs font-mono uppercase tracking-widest text-center px-4">
                Align QR Code within frame
              </div>
            </div>

            <p className="text-xs text-gray-500 text-center mt-6 leading-relaxed font-medium">
              Scan any European SEPA QR code, recipient payment code, or payment link to transfer instantly.
            </p>

            {/* Controls */}
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={() => setTorchOn(!torchOn)}
                className={`p-3.5 rounded-full border transition ${
                  torchOn ? "bg-amber-400 text-black border-amber-400" : "bg-white text-gray-700 border-gray-200 shadow-xs"
                }`}
                title="Toggle Torch"
              >
                🔦
              </button>

              <button
                onClick={() => showToast("Select an image with a QR code from gallery")}
                className="p-3.5 rounded-full bg-white text-gray-700 border border-gray-200 shadow-xs hover:bg-gray-50 transition"
                title="Upload Photo"
              >
                🖼️
              </button>
            </div>
          </div>
        ) : (
          /* My Code Tab */
          <div className="flex flex-col items-center w-full max-w-[320px] animate-in fade-in duration-200">
            <div className="bg-white border border-gray-100 rounded-[32px] p-6 flex flex-col items-center shadow-lg w-full">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-extrabold text-[#1E5BF8] tracking-tight text-base">Munify</span>
                <span className="font-semibold text-gray-400 text-xs">Payment Account</span>
              </div>

              {/* Vector QR */}
              <div className="mb-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <PrecisionQrSvg className="w-48 h-48" value="https://munify.app/pay/torbjoern" />
              </div>

              <div className="text-center">
                <div className="text-base font-black text-gray-900 uppercase tracking-tight">
                  {profileData.name || "Torbjoern Juhlin"}
                </div>
                <div className="text-xs font-mono text-[#1E5BF8] font-bold mt-0.5">
                  torbjoern.juhlin@munify.app
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 w-full mt-6">
              <button
                onClick={handleCopyTag}
                className="flex-1 py-3.5 bg-white hover:bg-gray-50 border border-gray-200 rounded-full text-xs font-bold text-gray-800 shadow-xs transition"
              >
                Copy Link
              </button>
              <button
                onClick={handleShare}
                className="flex-1 py-3.5 bg-[#1E5BF8] hover:bg-[#194fd6] text-white rounded-full text-xs font-bold transition shadow-md shadow-blue-500/25"
              >
                Share QR
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="p-4" />
    </div>
  );
}
