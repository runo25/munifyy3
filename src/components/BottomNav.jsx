import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  IconWalletNav,
  IconCardsNav,
  IconTransfersNav,
  IconTopUpNav,
  IconMoreNav
} from "./Vectors";

export default function BottomNav({ onTopUp }) {
  const location = useLocation();
  const path = location.pathname;

  const handleTopUp = (e) => {
    e.preventDefault();
    if (onTopUp) {
      onTopUp();
    } else {
      window.dispatchEvent(new CustomEvent("munify_open_deposit"));
    }
  };

  const navItems = [
    {
      to: "/",
      label: "Wallet",
      active: path === "/",
      icon: (active) => <IconWalletNav className="w-[22px] h-[22px]" active={active} />
    },
    {
      to: "/cards",
      label: "Cards",
      active: path === "/cards",
      icon: (active) => <IconCardsNav className="w-[22px] h-[22px]" active={active} />
    },
    {
      to: "/payments",
      label: "Transfers",
      active: path === "/payments" || path === "/transactions",
      icon: (active) => <IconTransfersNav className="w-[22px] h-[22px]" active={active} />
    },
    {
      to: "#topup",
      label: "Top Up",
      active: false,
      isAction: true,
      onClick: handleTopUp,
      icon: (active) => <IconTopUpNav className="w-[22px] h-[22px]" active={active} />
    },
    {
      to: "/profile",
      label: "More",
      active: path === "/profile" || path === "/more",
      icon: (active) => <IconMoreNav className="w-[22px] h-[22px]" active={active} />
    }
  ];

  return (
    <nav
      style={{ paddingBottom: "max(6px, env(safe-area-inset-bottom, 0px))" }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200/90 shadow-[0_-2px_12px_rgba(0,0,0,0.04)]"
    >
      <div className="w-full max-w-[440px] mx-auto px-2 pt-1.5 flex items-center justify-between">
        {navItems.map((item) => {
          const isActive = item.active;

          if (item.isAction) {
            return (
              <button
                key={item.label}
                onClick={item.onClick}
                className="flex-1 flex flex-col items-center justify-center py-1 select-none transition group active:scale-95"
              >
                <div className="w-6 h-6 flex items-center justify-center transition-transform group-hover:scale-105">
                  {item.icon(isActive)}
                </div>
                <span className="text-[11px] font-medium tracking-tight mt-1 text-gray-500">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              to={item.to}
              className="flex-1 flex flex-col items-center justify-center py-1 select-none transition group active:scale-95"
            >
              <div className="w-6 h-6 flex items-center justify-center transition-transform group-hover:scale-105">
                {item.icon(isActive)}
              </div>
              <span
                className={`text-[11px] font-medium tracking-tight mt-1 ${
                  isActive ? "text-[#1E5BF8] font-bold" : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
