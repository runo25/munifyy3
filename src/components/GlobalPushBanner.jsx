import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function GlobalPushBanner() {
  const navigate = useNavigate();
  const [activeBanner, setActiveBanner] = useState(null);
  const [visible, setVisible] = useState(false);
  const hideTimerRef = useRef(null);
  const removeTimerRef = useRef(null);

  const dismiss = () => {
    setVisible(false);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    if (removeTimerRef.current) clearTimeout(removeTimerRef.current);
    removeTimerRef.current = setTimeout(() => {
      setActiveBanner(null);
    }, 350);
  };

  const playChime = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "sine";
      osc2.type = "sine";

      osc1.frequency.setValueAtTime(880, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(1318.5, ctx.currentTime + 0.12);

      osc2.frequency.setValueAtTime(1174.66, ctx.currentTime + 0.06);
      osc2.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.18);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + 0.45);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(ctx.currentTime);
      osc2.start(ctx.currentTime + 0.05);

      osc1.stop(ctx.currentTime + 0.45);
      osc2.stop(ctx.currentTime + 0.45);
    } catch (e) {
      // AudioContext policy handled gracefully
    }
  };

  useEffect(() => {
    const handlePush = (e) => {
      const { title, message } = e.detail || {};
      if (!title) return;

      playChime();

      setActiveBanner({
        title,
        body: message,
        time: "Just now"
      });
      setVisible(true);

      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => {
        dismiss();
      }, 5500);
    };

    window.addEventListener("munify_push_received", handlePush);
    return () => {
      window.removeEventListener("munify_push_received", handlePush);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      if (removeTimerRef.current) clearTimeout(removeTimerRef.current);
    };
  }, []);

  if (!activeBanner) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div
        onClick={dismiss}
        className={`w-full max-w-[420px] mt-2 rounded-[22px] bg-white/95 backdrop-blur-2xl border border-gray-200/90 shadow-[0_16px_36px_rgba(0,0,0,0.12)] p-4 cursor-pointer pointer-events-auto transition-all duration-300 transform select-none ${
          visible ? "translate-y-0 opacity-100" : "-translate-y-16 opacity-0"
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-[#1E5BF8] text-xs font-bold">M</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-0.5">
              <span className="text-[11px] font-bold tracking-wider text-[#1E5BF8] uppercase">
                Munify
              </span>
              <span className="text-[10px] text-gray-400">Just now</span>
            </div>
            <h4 className="text-gray-900 text-xs font-bold truncate">
              {activeBanner.title}
            </h4>
            <p className="text-gray-600 text-[11px] mt-0.5 line-clamp-2">
              {activeBanner.body}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
