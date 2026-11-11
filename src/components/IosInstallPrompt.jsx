import React, { useState, useEffect } from "react";

export default function IosInstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIosDevice, setIsIosDevice] = useState(false);

  useEffect(() => {
    // Check if device is iOS (iPhone, iPad, iPod)
    const isIos =
      /iphone|ipad|ipod/i.test(window.navigator.userAgent) ||
      (window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
    setIsIosDevice(isIos);

    // Check if already running in standalone PWA mode
    const isStandalone =
      window.navigator.standalone === true ||
      window.matchMedia("(display-mode: standalone)").matches;

    // Check if user dismissed previously
    const dismissed = localStorage.getItem("munify_ios_install_dismissed");

    if (isIos && !isStandalone && !dismissed) {
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 2000);
      return () => clearTimeout(timer);
    }

    const handleManualShow = () => setShowPrompt(true);
    window.addEventListener("munify_show_install_guide", handleManualShow);
    return () => window.removeEventListener("munify_show_install_guide", handleManualShow);
  }, []);

  const dismiss = () => {
    setShowPrompt(false);
    localStorage.setItem("munify_ios_install_dismissed", "true");
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-[400px] bg-white border border-gray-100 rounded-[28px] p-6 shadow-2xl relative animate-in slide-in-from-bottom duration-300">
        {/* Close Button */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900"
        >
          ✕
        </button>

        {/* Munify App Icon Header */}
        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-12 h-12 rounded-[14px] bg-blue-50 border border-blue-200 flex items-center justify-center shadow-xs">
            <span className="text-[#1E5BF8] text-xl font-black">M</span>
          </div>
          <div>
            <h3 className="text-gray-900 text-[16px] font-bold">Install Munify on iPhone</h3>
            <p className="text-gray-500 text-xs">For the full fullscreen app experience</p>
          </div>
        </div>

        {/* 3 Simple Steps */}
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200/70 space-y-3.5 text-xs text-gray-700 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-[#1E5BF8] font-bold flex items-center justify-center flex-shrink-0">
              1
            </div>
            <div className="flex-1">
              Tap the <strong className="text-gray-900">Share</strong> button in Safari{" "}
              (at the bottom of your screen).
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-[#1E5BF8] font-bold flex items-center justify-center flex-shrink-0">
              2
            </div>
            <div className="flex-1">
              Scroll down and select{" "}
              <strong className="text-gray-900">"Add to Home Screen"</strong>.
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-[#1E5BF8] font-bold flex items-center justify-center flex-shrink-0">
              3
            </div>
            <div className="flex-1">
              Tap <strong className="text-gray-900">"Add"</strong> in the top-right corner to launch Munify from your home screen.
            </div>
          </div>
        </div>

        {/* Buttons */}
        <button
          onClick={dismiss}
          className="w-full bg-[#1E5BF8] hover:bg-[#194fd6] text-white font-extrabold text-sm py-3.5 rounded-full transition shadow-md active:scale-[0.98]"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
