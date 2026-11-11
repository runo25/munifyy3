import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notificationsData, markNotificationAsRead } from "../data";

export default function Notifications({ onClose }) {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([...notificationsData]);
  const [filter, setFilter] = useState("all"); // "all" | "action" | "transfers"

  useEffect(() => {
    const handleUpdate = () => {
      setNotifications([...notificationsData]);
    };
    window.addEventListener("munify_notifications_updated", handleUpdate);
    return () => window.removeEventListener("munify_notifications_updated", handleUpdate);
  }, []);

  const handleMarkAllRead = () => {
    notificationsData.forEach((n) => {
      n.unread = false;
    });
    setNotifications([...notificationsData]);
    window.dispatchEvent(new CustomEvent("munify_notifications_updated"));
  };

  const handleBack = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  const handleItemClick = (n) => {
    markNotificationAsRead(n.id);
    if (n.transactionId) {
      if (onClose) onClose();
      navigate(`/transaction/${n.transactionId}`);
    }
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "action") return n.actionRequired || n.type === "action_required";
    if (filter === "transfers") return n.type === "deposit" || n.type === "payment" || n.type === "withdrawal";
    return true;
  });

  const unreadCount = notifications.filter((n) => n.unread).length;
  const actionCount = notifications.filter((n) => n.actionRequired || n.type === "action_required").length;

  return (
    <div className="bg-[#F4F5F8] text-gray-900 h-full flex flex-col select-none">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 border-b border-gray-100 bg-white sticky top-0 z-10 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={handleBack}
            className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200/80 flex items-center justify-center text-gray-700 hover:text-gray-900 active:scale-95 transition -ml-1"
            title="Back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </button>
          
          <div className="flex items-center gap-1.5">
            <h1 className="text-[16px] font-bold tracking-tight text-gray-900">Notifications</h1>
            {unreadCount > 0 && (
              <span className="bg-[#1E5BF8] text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>

          <button
            onClick={handleMarkAllRead}
            className="text-xs font-bold text-[#1E5BF8] hover:underline transition"
          >
            Mark Read
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-full text-xs font-bold transition ${
              filter === "all"
                ? "bg-gray-900 text-white shadow-xs"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All ({notifications.length})
          </button>

          {actionCount > 0 && (
            <button
              onClick={() => setFilter("action")}
              className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition ${
                filter === "action"
                  ? "bg-amber-500 text-white shadow-xs"
                  : "bg-amber-100/80 text-amber-900 hover:bg-amber-200"
              }`}
            >
              <span>Action Required</span>
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
            </button>
          )}

          <button
            onClick={() => setFilter("transfers")}
            className={`px-3 py-1 rounded-full text-xs font-bold transition ${
              filter === "transfers"
                ? "bg-gray-900 text-white shadow-xs"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Transfers
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-hide space-y-3">
        <div className="bg-white border border-gray-100 rounded-2xl divide-y divide-gray-100 shadow-sm overflow-hidden">
          {filteredNotifications.map((n) => {
            const isAction = n.actionRequired || n.type === "action_required";

            return (
              <div
                key={n.id}
                onClick={() => handleItemClick(n)}
                className={`p-4 transition cursor-pointer flex gap-3.5 ${
                  isAction
                    ? "bg-amber-50/60 hover:bg-amber-50 border-l-4 border-amber-500"
                    : n.unread
                    ? "bg-blue-50/20 hover:bg-gray-50/80"
                    : "hover:bg-gray-50/70"
                }`}
              >
                {/* Icon Column */}
                <div className="relative flex-shrink-0">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      isAction
                        ? "bg-amber-100 text-amber-800"
                        : n.type === "deposit"
                        ? "bg-emerald-50 text-[#16A34A]"
                        : n.type === "payment"
                        ? "bg-red-50 text-[#DC2626]"
                        : n.type === "card"
                        ? "bg-purple-50 text-purple-600"
                        : "bg-blue-50 text-[#1E5BF8]"
                    }`}
                  >
                    {isAction ? "⚠️" : n.type === "deposit" ? "↓" : n.type === "payment" ? "↑" : n.type === "card" ? "💳" : "🔔"}
                  </div>
                  {n.unread && (
                    <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#1E5BF8] rounded-full border-2 border-white" />
                  )}
                </div>

                {/* Content Column */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="text-[13px] font-bold text-gray-900 leading-snug">
                        {n.title}
                      </h3>
                      {isAction && (
                        <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-amber-200 text-amber-900">
                          Action Needed
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-medium text-gray-400 whitespace-nowrap">
                      {n.time}
                    </span>
                  </div>

                  <p className="text-gray-600 text-xs mt-1 leading-relaxed">
                    {n.body}
                  </p>

                  {/* Action CTA for pending transfer */}
                  {isAction && (
                    <div className="mt-2.5 flex items-center justify-between">
                      <span className="text-xs font-black text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full">
                        {n.amount || "+€2,000"}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleItemClick(n);
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-amber-600 hover:bg-amber-700 px-3 py-1 rounded-full shadow-xs active:scale-95 transition"
                      >
                        <span>Submit Details</span>
                        <span>→</span>
                      </button>
                    </div>
                  )}

                  {!isAction && n.amount && (
                    <div className="mt-1 flex items-center justify-between">
                      <span
                        className={`text-[11px] font-bold ${
                          n.type === "deposit"
                            ? "text-[#16A34A]"
                            : n.type === "payment"
                            ? "text-[#DC2626]"
                            : "text-gray-600"
                        }`}
                      >
                        {n.amount}
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium hover:text-[#1E5BF8]">
                        View Details →
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
