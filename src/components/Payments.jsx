import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { transactions } from "../data";
import {
  IconArrowUpRight,
  IconArrowDownLeft,
  HourglassOverlay
} from "./Vectors";
import BottomNav from "./BottomNav";

export default function Payments() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTransactions = transactions.filter((tx) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      (tx.counterparty && tx.counterparty.toLowerCase().includes(query)) ||
      (tx.subtitle && tx.subtitle.toLowerCase().includes(query)) ||
      (tx.displayAmount && tx.displayAmount.toLowerCase().includes(query)) ||
      (tx.type && tx.type.toLowerCase().includes(query))
    );
  });

  // Group transactions by date
  const groupedTransactions = filteredTransactions.reduce((groups, tx) => {
    const date = tx.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(tx);
    return groups;
  }, {});

  return (
    <div className="app-screen bg-[#F4F5F8] text-gray-900 min-h-screen flex flex-col select-none relative pb-20">
      {/* Page Header */}
      <div className="bg-white px-5 pt-6 pb-4 border-b border-gray-100 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-[28px] font-black tracking-tight text-gray-900 font-sans">
            Transfers
          </h1>
          <button
            onClick={() => navigate("/")}
            className="text-xs font-bold text-[#1E5BF8] px-3 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100 active:scale-95 transition"
          >
            ← Wallet
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search transfers, names, amounts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F4F5F8] text-gray-900 placeholder-gray-400 text-xs font-medium py-2.5 pl-9 pr-4 rounded-xl border border-gray-200/60 focus:outline-none focus:ring-2 focus:ring-[#1E5BF8]/30 transition"
          />
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9CA3AF"
            strokeWidth="2.2"
            className="w-4 h-4 absolute left-3 top-3 pointer-events-none"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Main List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-hide space-y-4">
        {Object.entries(groupedTransactions).map(([date, txList]) => (
          <div key={date}>
            {/* Date Header */}
            <h3 className="text-gray-600 text-xs font-bold mb-2 px-1 tracking-tight">
              {date}
            </h3>

            {/* Date Group Container */}
            <div className="bg-white rounded-2xl divide-y divide-gray-100 shadow-sm border border-gray-100 overflow-hidden">
              {txList.map((tx) => {
                const isRefund = tx.type === "Refund" || tx.iconType === "refund";
                const isPending = tx.status === "Pending" || tx.isPending;
                const isPositive =
                  tx.direction === "in" ||
                  (typeof tx.amount === "number" && tx.amount > 0);
                const isNegative =
                  tx.direction === "out" ||
                  (typeof tx.amount === "number" && tx.amount < 0);

                let amountColor = "text-gray-900";
                if (isRefund) {
                  amountColor = "text-red-600 font-bold";
                } else if (isPending) {
                  amountColor = "text-gray-500 font-bold";
                } else if (isPositive) {
                  amountColor = "text-[#16A34A] font-black";
                } else if (isNegative) {
                  amountColor = "text-[#DC2626] font-black";
                }

                return (
                  <div
                    key={tx.id}
                    onClick={() => navigate(`/transaction/${tx.id}`)}
                    className="p-3.5 px-4 flex items-center justify-between cursor-pointer hover:bg-gray-50/70 active:bg-gray-100/50 transition group"
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Avatar */}
                      <div className="relative">
                        <div
                          style={{
                            backgroundColor:
                              tx.avatarColor ||
                              (isRefund
                                ? "#FEE2E2"
                                : isPositive
                                ? "#0284C7"
                                : "#0D9488")
                          }}
                          className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 shadow-xs font-bold text-sm ${
                            isRefund ? "text-red-600" : "text-white"
                          }`}
                        >
                          {isRefund ? (
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              className="w-4 h-4"
                            >
                              <path d="M3 10h10a5 5 0 0 1 5 5v2" />
                              <polyline points="7 6 3 10 7 14" />
                            </svg>
                          ) : (
                            tx.initials ||
                            (tx.counterparty
                              ? tx.counterparty.slice(0, 2).toUpperCase()
                              : "TX")
                          )}
                        </div>
                        {isPending && <HourglassOverlay className="w-4 h-4" />}
                      </div>

                      {/* Text */}
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-[14px] font-bold text-gray-900 tracking-tight leading-snug">
                            {tx.counterparty || tx.type}
                          </span>
                          {isRefund && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200 tracking-wide">
                              Rejected
                            </span>
                          )}
                        </div>
                        <div className="text-gray-400 text-xs mt-0.5 tracking-tight font-medium">
                          {tx.subtitle || tx.channel || tx.type}
                        </div>
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="text-right">
                      <div className={`text-[15px] tracking-tight ${amountColor}`}>
                        {tx.displayAmount}
                      </div>
                      {isRefund && (
                        <div className="text-[10px] text-gray-400 mt-0.5">
                          Returned
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Bottom Nav with Transfers active */}
      <BottomNav />
    </div>
  );
}
