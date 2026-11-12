import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dashboardData, profileData, transactions, notificationsData } from "../data";
import {
  IconGear,
  IconQrScanner,
  IconBell,
  IconSend,
  IconAdd,
  IconExchange,
  IconMoreDots,
  IconInfo,
  HourglassOverlay
} from "./Vectors";
import BottomNav from "./BottomNav";
import AccountInfoModal from "./AccountInfoModal";
import DepositModal from "./DepositModal";
import TransferModal from "./TransferModal";
import BridgeModal from "./BridgeModal";
import Notifications from "./Notifications";

export default function Dashboard() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(dashboardData.balance || "€0.50");
  const [totalDisplay, setTotalDisplay] = useState(dashboardData.totalDisplay || "€0.50");
  const [activeCurrencyIndex, setActiveCurrencyIndex] = useState(0); // 0: EUR, 1: SEK, 2: GBP
  const [isAccountInfoOpen, setIsAccountInfoOpen] = useState(false);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [isBridgeOpen, setIsBridgeOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [hasUnreadNotifs, setHasUnreadNotifs] = useState(() =>
    notificationsData.some((n) => n.unread)
  );
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const handleBalanceUpdate = () => {
      setBalance(dashboardData.balance);
      setTotalDisplay(dashboardData.totalDisplay || dashboardData.balance);
    };
    const handleOpenDeposit = () => {
      setIsDepositOpen(true);
    };
    const handleNotifUpdate = () => {
      setHasUnreadNotifs(notificationsData.some((n) => n.unread));
    };

    window.addEventListener("munify_balance_updated", handleBalanceUpdate);
    window.addEventListener("munify_open_deposit", handleOpenDeposit);
    window.addEventListener("munify_notifications_updated", handleNotifUpdate);
    return () => {
      window.removeEventListener("munify_balance_updated", handleBalanceUpdate);
      window.removeEventListener("munify_open_deposit", handleOpenDeposit);
      window.removeEventListener("munify_notifications_updated", handleNotifUpdate);
    };
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2200);
  };

  // Group transactions
  const todayTransactions = transactions.filter(
    (t) => t.date === "Today" || t.date === "12 November 2026" || t.date === "November 12"
  );
  const nov10Transactions = transactions.filter(
    (t) => t.date === "November 10" || t.date === "10 November 2026"
  );
  const earlierTransactions = transactions.filter(
    (t) =>
      t.date !== "Today" &&
      t.date !== "12 November 2026" &&
      t.date !== "November 12" &&
      t.date !== "November 10" &&
      t.date !== "10 November 2026"
  );

  // Currency carousel items matching screenshot: SEK 0 on left, €0.50 in center, £0 on right
  const currencies = [
    { code: "EUR", symbol: "€", main: balance, total: totalDisplay, left: "SEK 0", right: "£0" },
    { code: "SEK", symbol: "kr", main: "0 kr", total: "0 kr", left: balance, right: "£0" },
    { code: "GBP", symbol: "£", main: "£0", total: "£0", left: balance, right: "SEK 0" }
  ];

  const currentCurrency = currencies[activeCurrencyIndex] || currencies[0];

  return (
    <div className="app-screen bg-[#F4F5F8] text-gray-900 min-h-screen flex flex-col select-none relative pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-2xl flex items-center gap-2 animate-fade-in">
          <span className="text-[#16A34A]">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP PALE CYAN / SKY GRADIENT SECTION */}
      <div className="header-ice-gradient pt-3 pb-3 px-4 border-b border-gray-100/60 shadow-xs">
        {/* Header Bar */}
        <header className="flex items-center justify-between mb-4">
          {/* Left Settings Cog */}
          <button
            onClick={() => navigate("/profile")}
            className="w-10 h-10 flex items-center justify-center text-gray-700 hover:text-gray-900 active:scale-95 transition rounded-full"
            title="Settings & Profile"
          >
            <IconGear className="w-6 h-6" color="#374151" />
          </button>

          {/* Center Profile Pill matching screenshot */}
          <button
            onClick={() => setIsAccountInfoOpen(true)}
            className="flex items-center gap-2.5 bg-white/80 hover:bg-white active:scale-98 transition px-3.5 py-1.5 rounded-full border border-gray-200/60 shadow-xs"
            title="Payment account details"
          >
            {/* Initials Circle */}
            <div className="w-7 h-7 rounded-full bg-[#8B5CF6] text-white font-bold text-[12px] flex items-center justify-center shadow-xs">
              {profileData.initials || "TJ"}
            </div>
            {/* Text labels */}
            <div className="flex flex-col text-left">
              <span className="text-[13px] font-bold text-gray-900 leading-tight tracking-tight">
                {profileData.name || "Torbjoern Juhlin"}
              </span>
              <span className="text-[11px] font-normal text-gray-500 leading-tight">
                {profileData.accountType || "Payment account"}
              </span>
            </div>
            {/* Right Chevron */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1F2937"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5 text-gray-800 ml-0.5"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Right Action Icons: QR Scanner & Notification Bell */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => navigate("/admin")}
              className="w-10 h-10 flex items-center justify-center text-gray-700 hover:text-gray-900 active:scale-95 transition rounded-full"
              title="QR Scanner & Admin"
            >
              <IconQrScanner className="w-5 h-5" color="#374151" />
            </button>
            <button
              onClick={() => setIsNotificationsOpen(true)}
              className="w-10 h-10 flex items-center justify-center text-gray-700 hover:text-gray-900 active:scale-95 transition rounded-full relative"
              title="Notifications"
            >
              <IconBell className="w-5 h-5" color="#374151" />
              {hasUnreadNotifs && (
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#DC2626] rounded-full border-2 border-white shadow-xs animate-pulse" />
              )}
            </button>
          </div>
        </header>

        {/* BALANCE CAROUSEL SECTION */}
        <section className="flex flex-col items-center justify-center pt-2 pb-1">
          {/* Main Balance Row with left & right peeks */}
          <div className="w-full flex items-center justify-between px-2">
            {/* Left peek: SEK 0 */}
            <button
              onClick={() => setActiveCurrencyIndex(activeCurrencyIndex === 1 ? 0 : 1)}
              className="flex items-baseline gap-1 text-gray-500 hover:text-gray-800 transition font-bold select-none cursor-pointer"
            >
              <span className="text-[13px] font-semibold tracking-tight text-gray-500">
                {currentCurrency.left.split(" ")[0]}
              </span>
              <span className="text-[26px] font-black tracking-tighter text-gray-800">
                {currentCurrency.left.split(" ")[1] || "0"}
              </span>
            </button>

            {/* Center Active Balance */}
            <div className="text-center px-2">
              <h1 className="text-[40px] sm:text-[44px] font-black text-gray-900 tracking-tight font-sans leading-none">
                {currentCurrency.main}
              </h1>
            </div>

            {/* Right peek: £0 */}
            <button
              onClick={() => setActiveCurrencyIndex(activeCurrencyIndex === 2 ? 0 : 2)}
              className="flex items-baseline gap-0.5 text-gray-500 hover:text-gray-800 transition font-bold select-none cursor-pointer text-right"
            >
              <span className="text-[26px] font-black tracking-tighter text-gray-800">
                {currentCurrency.right}
              </span>
            </button>
          </div>

          {/* Carousel Pagination Dots */}
          <div className="flex items-center gap-2 mt-3 mb-2">
            <button
              onClick={() => setActiveCurrencyIndex(1)}
              className={`rounded-full transition-all ${
                activeCurrencyIndex === 1 ? "w-2 h-2 bg-gray-900" : "w-1.5 h-1.5 bg-gray-400/50"
              }`}
              title="SEK"
            />
            <button
              onClick={() => setActiveCurrencyIndex(0)}
              className={`rounded-full transition-all ${
                activeCurrencyIndex === 0 ? "w-2 h-2 bg-gray-900" : "w-1.5 h-1.5 bg-gray-400/50"
              }`}
              title="EUR"
            />
            <button
              onClick={() => setActiveCurrencyIndex(2)}
              className={`rounded-full transition-all ${
                activeCurrencyIndex === 2 ? "w-2 h-2 bg-gray-900" : "w-1.5 h-1.5 bg-gray-400/50"
              }`}
              title="GBP"
            />
          </div>

          {/* Info Line: Total ≈ €0.50 */}
          <button
            onClick={() => setIsAccountInfoOpen(true)}
            className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 text-[13px] font-medium tracking-tight mt-0.5 active:scale-95 transition"
          >
            <IconInfo className="w-3.5 h-3.5 text-gray-500" color="#6B7280" />
            <span>Total ≈ {currentCurrency.total}</span>
          </button>
        </section>

        {/* DOTTED HORIZONTAL SEPARATOR LINE matching screenshot */}
        <div className="w-full border-t border-dotted border-gray-300/80 my-3.5" />

        {/* QUICK ACTION BUTTONS (Send, Add Money, Exchange, More) */}
        <section className="flex items-start justify-around w-full px-2 pt-1 pb-2">
          {/* 1: Send */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => setIsTransferOpen(true)}
              className="w-14 h-14 rounded-full bg-white border border-gray-200/90 shadow-sm flex items-center justify-center hover:bg-gray-50 active:scale-95 transition group"
              title="Send Money"
            >
              <IconSend className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" color="#111827" />
            </button>
            <span className="text-gray-900 text-[13px] font-semibold mt-2 tracking-tight">
              Send
            </span>
          </div>

          {/* 2: Add Money */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => setIsDepositOpen(true)}
              className="w-14 h-14 rounded-full bg-white border border-gray-200/90 shadow-sm flex items-center justify-center hover:bg-gray-50 active:scale-95 transition group"
              title="Add Money"
            >
              <IconAdd className="w-5 h-5 group-hover:rotate-90 transition-transform" color="#111827" />
            </button>
            <span className="text-gray-900 text-[13px] font-semibold mt-2 tracking-tight">
              Add Money
            </span>
          </div>

          {/* 3: Exchange */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => setIsBridgeOpen(true)}
              className="w-14 h-14 rounded-full bg-white border border-gray-200/90 shadow-sm flex items-center justify-center hover:bg-gray-50 active:scale-95 transition group"
              title="Exchange Currency"
            >
              <IconExchange className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" color="#111827" />
            </button>
            <span className="text-gray-900 text-[13px] font-semibold mt-2 tracking-tight">
              Exchange
            </span>
          </div>

          {/* 4: More */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => setIsMoreMenuOpen(true)}
              className="w-14 h-14 rounded-full bg-white border border-gray-200/90 shadow-sm flex items-center justify-center hover:bg-gray-50 active:scale-95 transition group"
              title="More Actions"
            >
              <IconMoreDots className="w-5 h-5 group-hover:scale-110 transition-transform" color="#111827" />
            </button>
            <span className="text-gray-900 text-[13px] font-semibold mt-2 tracking-tight">
              More
            </span>
          </div>
        </section>
      </div>

      {/* LOWER TRANSACTIONS SECTION */}
      <main className="flex-1 px-4 pt-4 pb-8 space-y-4 overflow-y-auto scrollbar-hide">
        {/* GROUP 1: TODAY (MACAU EMIL +€2,000) */}
        {todayTransactions.length > 0 && (
          <div>
            <h2 className="text-[13px] font-bold text-gray-600 mb-2 px-1 tracking-tight">
              Today
            </h2>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer hover:bg-gray-50/60 active:scale-[0.99] transition">
              {todayTransactions.map((tx) => {
                const isPending = tx.status === "Pending" || tx.isPending;
                return (
                  <div
                    key={tx.id}
                    onClick={() => navigate(`/transaction/${tx.id}`)}
                    className="flex items-center justify-between w-full"
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Circle Avatar with Initials and Hourglass if pending */}
                      <div className="relative">
                        <div
                          style={{ backgroundColor: tx.avatarColor || "#0284C7" }}
                          className="w-11 h-11 rounded-full text-white font-bold text-[15px] flex items-center justify-center flex-shrink-0 shadow-xs"
                        >
                          {tx.initials || "ME"}
                        </div>
                        {isPending && <HourglassOverlay className="w-4 h-4" />}
                      </div>
                      {/* Counterparty & Subtitle */}
                      <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-gray-900 uppercase tracking-tight leading-snug">
                          {tx.counterparty || "MACAU EMIL"}
                        </span>
                        <span
                          className={`text-[12px] tracking-tight mt-0.5 ${
                            isPending
                              ? "text-gray-500 font-medium"
                              : "text-gray-400 font-semibold uppercase"
                          }`}
                        >
                          {tx.subtitle || (isPending ? "Pending •" : "AJUTOR FAMILIAR")}
                        </span>
                      </div>
                    </div>
                    {/* Amount: Gray if Pending, Green if Completed */}
                    <div
                      className={`text-[16px] tracking-tight ${
                        isPending ? "text-gray-500 font-bold" : "text-[#16A34A] font-black"
                      }`}
                    >
                      {tx.displayAmount || "+€2,000"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* GROUP 2: NOVEMBER 10 (LADISLAV, PALL, ALVARO, DANISH, ALVARO) */}
        {nov10Transactions.length > 0 && (
          <div>
            <h2 className="text-[13px] font-bold text-gray-600 mb-2 px-1 tracking-tight">
              November 10
            </h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100 overflow-hidden">
              {nov10Transactions.map((tx) => {
                const isPending = tx.status === "Pending" || tx.isPending;
                const isPositive =
                  tx.direction === "in" ||
                  (typeof tx.amount === "number" && tx.amount > 0);
                const isNegative =
                  tx.direction === "out" ||
                  (typeof tx.amount === "number" && tx.amount < 0);

                let amountColorClass = "text-gray-900";
                if (isPending) {
                  amountColorClass = "text-gray-500 font-bold";
                } else if (isPositive) {
                  amountColorClass = "text-[#16A34A] font-black";
                } else if (isNegative) {
                  amountColorClass = "text-[#DC2626] font-black";
                }

                return (
                  <div
                    key={tx.id}
                    onClick={() => navigate(`/transaction/${tx.id}`)}
                    className="p-3.5 px-4 flex items-center justify-between cursor-pointer hover:bg-gray-50/70 active:bg-gray-100/50 transition"
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Avatar with Pending Hourglass Badge if Pending */}
                      <div className="relative">
                        <div
                          style={{
                            backgroundColor: tx.avatarColor || (isPending ? "#8B5CF6" : "#0D9488")
                          }}
                          className="w-11 h-11 rounded-full text-white font-bold text-[14px] flex items-center justify-center flex-shrink-0 shadow-xs"
                        >
                          {tx.initials || tx.counterparty?.slice(0, 2).toUpperCase() || "TX"}
                        </div>
                        {isPending && <HourglassOverlay className="w-4 h-4" />}
                      </div>

                      {/* Text info */}
                      <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-gray-900 tracking-tight leading-snug">
                          {tx.counterparty}
                        </span>
                        {tx.subtitle && (
                          <span
                            className={`text-[12px] tracking-tight mt-0.5 ${
                              isPending
                                ? "text-gray-500 font-medium"
                                : "text-gray-400 font-normal"
                            }`}
                          >
                            {tx.subtitle}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Amount */}
                    <div className={`text-[15px] tracking-tight ${amountColorClass}`}>
                      {tx.displayAmount}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* GROUP 3: PREVIOUS TRANSACTIONS IN ACCOUNT */}
        {earlierTransactions.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2 px-1">
              <h2 className="text-[13px] font-bold text-gray-600 tracking-tight">
                Earlier Activity
              </h2>
              <button
                onClick={() => navigate("/payments")}
                className="text-[12px] font-semibold text-[#1E5BF8] hover:underline"
              >
                View all ({transactions.length})
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100 overflow-hidden">
              {earlierTransactions.slice(0, 4).map((tx) => {
                const isRefund = tx.type === "Refund" || tx.iconType === "refund";
                const isPositive = tx.direction === "in" || tx.amount > 0;

                return (
                  <div
                    key={tx.id}
                    onClick={() => navigate(`/transaction/${tx.id}`)}
                    className="p-3.5 px-4 flex items-center justify-between cursor-pointer hover:bg-gray-50/70 transition"
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        style={{ backgroundColor: tx.avatarColor || "#F3F4F6" }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-[13px] ${
                          tx.avatarColor ? "text-white" : "text-gray-700"
                        }`}
                      >
                        {tx.initials || (tx.counterparty ? tx.counterparty.slice(0, 2).toUpperCase() : "TX")}
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-[14px] font-bold text-gray-900 tracking-tight">
                            {tx.counterparty || tx.type}
                          </span>
                          {isRefund && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200">
                              Rejected
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-gray-400 font-medium">
                          {tx.subtitle ? `${tx.subtitle} • ` : ""}{tx.date || tx.dateTime}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`text-[14px] tracking-tight ${
                        isRefund
                          ? "text-red-600 font-bold"
                          : isPositive
                          ? "text-[#16A34A] font-black"
                          : "text-[#DC2626] font-black"
                      }`}
                    >
                      {tx.displayAmount}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Floating Bottom Navigation Bar matching screenshot */}
      <BottomNav onTopUp={() => setIsDepositOpen(true)} />

      {/* MORE QUICK ACTIONS BOTTOM SHEET MODAL */}
      {isMoreMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-xs animate-fade-in">
          <div
            className="w-full max-w-[440px] bg-white rounded-t-3xl p-5 shadow-2xl space-y-3 pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-2" />
            <h3 className="text-base font-bold text-gray-900 text-center">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  setIsMoreMenuOpen(false);
                  setIsAccountInfoOpen(true);
                }}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-gray-50 hover:bg-gray-100 active:scale-95 transition text-left"
              >
                <div className="w-9 h-9 rounded-full bg-blue-100 text-[#1E5BF8] flex items-center justify-center font-bold text-xs">
                  IBAN
                </div>
                <div>
                  <div className="text-[13px] font-bold text-gray-900">Account Details</div>
                  <div className="text-[11px] text-gray-500">EUR & USD Receiving</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setIsMoreMenuOpen(false);
                  navigate("/support");
                }}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-gray-50 hover:bg-gray-100 active:scale-95 transition text-left"
              >
                <div className="w-9 h-9 rounded-full bg-emerald-100 text-[#16A34A] flex items-center justify-center font-bold text-xs">
                  💬
                </div>
                <div>
                  <div className="text-[13px] font-bold text-gray-900">Live Support</div>
                  <div className="text-[11px] text-gray-500">Help & Refunds</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setIsMoreMenuOpen(false);
                  navigate("/earn");
                }}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-gray-50 hover:bg-gray-100 active:scale-95 transition text-left"
              >
                <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xs">
                  %
                </div>
                <div>
                  <div className="text-[13px] font-bold text-gray-900">Earn Daily Yield</div>
                  <div className="text-[11px] text-gray-500">4.77% APY</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setIsMoreMenuOpen(false);
                  navigate("/admin");
                }}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-gray-50 hover:bg-gray-100 active:scale-95 transition text-left"
              >
                <div className="w-9 h-9 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-xs">
                  ⚙️
                </div>
                <div>
                  <div className="text-[13px] font-bold text-gray-900">Simulator</div>
                  <div className="text-[11px] text-gray-500">Admin Controls</div>
                </div>
              </button>
            </div>
            <button
              onClick={() => setIsMoreMenuOpen(false)}
              className="w-full py-3 text-center text-sm font-semibold text-gray-500 hover:text-gray-900 pt-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Account Info Modal */}
      <AccountInfoModal
        isOpen={isAccountInfoOpen}
        onClose={() => setIsAccountInfoOpen(false)}
      />

      {/* Deposit Modal */}
      <DepositModal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
        onSelectOption={(opt) => {
          setIsDepositOpen(false);
          setIsAccountInfoOpen(true);
        }}
      />

      {/* Transfer Modal */}
      <TransferModal
        isOpen={isTransferOpen}
        onClose={() => setIsTransferOpen(false)}
        onSelectDestination={() => {
          setIsTransferOpen(false);
          showToast("Transfer initiated!");
        }}
      />

      {/* Exchange / Bridge Modal */}
      <BridgeModal
        isOpen={isBridgeOpen}
        onClose={() => setIsBridgeOpen(false)}
      />

      {/* Notifications Slideover */}
      {isNotificationsOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-[400px] bg-white h-full shadow-2xl flex flex-col">
            <Notifications onClose={() => setIsNotificationsOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
