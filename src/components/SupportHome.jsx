import React from "react";
import { useNavigate } from "react-router-dom";
import { profileData } from "../data";

export default function SupportHome() {
  const navigate = useNavigate();
  const userName = profileData.firstName || "Torbjoern";

  return (
    <div className="app-screen min-h-screen bg-[#F4F5F8] text-gray-900 flex flex-col relative select-none">
      {/* Top Blue Gradient Hero Section */}
      <div className="relative bg-gradient-to-b from-[#E6F6FB] via-[#DBEAFE] to-[#F4F5F8] px-6 pt-5 pb-8 flex flex-col">
        {/* Top Navigation Row */}
        <div className="flex items-center justify-between mb-6">
          {/* Overlapping Agent Avatars */}
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-[#1E5BF8] text-white font-bold text-sm flex items-center justify-center shadow-md">
              A
            </div>
            <div className="w-10 h-10 rounded-full bg-[#8B5CF6] text-white font-bold text-sm flex items-center justify-center shadow-md -ml-2.5 border-2 border-white">
              M
            </div>
          </div>

          {/* Close Button (X) */}
          <button
            onClick={() => navigate("/")}
            className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-700 flex items-center justify-center shadow-xs transition active:scale-95"
            title="Close"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Hero Title */}
        <div className="mb-2">
          <h1 className="text-[30px] font-black text-gray-900 tracking-tight leading-tight">
            Hi {userName} 👋
          </h1>
          <h2 className="text-[24px] font-bold text-gray-700 tracking-tight leading-tight mt-1">
            How can we help today?
          </h2>
        </div>
      </div>

      {/* Main Content Cards */}
      <div className="flex-1 px-4 -mt-2 pb-12 space-y-3.5">
        {/* Card 1: Messages */}
        <div className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[17px] font-bold text-gray-900 tracking-tight">Messages</h3>
            <div className="text-gray-500">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
            </div>
          </div>

          {/* Subcard: Recent message */}
          <div className="space-y-1">
            <div className="text-[12px] text-gray-400 font-semibold tracking-wide">
              Recent conversation
            </div>
            <div
              onClick={() => navigate("/chat")}
              className="flex items-center justify-between p-2.5 -mx-2 rounded-xl hover:bg-gray-50 transition cursor-pointer active:scale-[0.99]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-[#1E5BF8] text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
                  A
                </div>
                <div className="min-w-0">
                  <div className="text-[14px] font-semibold text-gray-900 truncate">
                    Ahmed • Support Agent
                  </div>
                  <div className="text-[12px] text-gray-500 mt-0.5 truncate">
                    "We have approved and issued a refund back to your account..."
                  </div>
                </div>
              </div>

              {/* Chevron */}
              <div className="text-gray-400 pl-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Ask a question */}
        <div
          onClick={() => navigate("/chat")}
          className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50 transition active:scale-[0.99] flex items-center justify-between"
        >
          <div>
            <h3 className="text-[16px] font-bold text-gray-900 tracking-tight">
              Send a new message
            </h3>
            <p className="text-gray-500 text-xs mt-0.5">
              We typically reply in under 2 minutes
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-50 text-[#1E5BF8] flex items-center justify-center font-bold">
            →
          </div>
        </div>
      </div>
    </div>
  );
}
