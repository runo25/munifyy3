import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Cards from "./components/Cards";
import Earn from "./components/Earn";
import Payments from "./components/Payments";
import TransactionDetails from "./components/TransactionDetails";
import Profile from "./components/Profile";
import AdminPanel from "./components/AdminPanel";
import GlobalPushBanner from "./components/GlobalPushBanner";
import SupportHome from "./components/SupportHome";
import SupportChat from "./components/SupportChat";
import ProvideInformation from "./components/ProvideInformation";
import IosInstallPrompt from "./components/IosInstallPrompt";

function App() {
  return (
    <>
      <GlobalPushBanner />
      <IosInstallPrompt />
      <Routes>
        {/* Core Munify Navigation Tabs */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/earn" element={<Earn />} />
        <Route path="/power" element={<Navigate to="/earn" replace />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/transactions" element={<Navigate to="/payments" replace />} />

        {/* Transaction Detail Receipt */}
        <Route path="/transaction/:id" element={<TransactionDetails />} />
        <Route path="/provide-information" element={<ProvideInformation />} />
        <Route path="/provide-information/:id" element={<ProvideInformation />} />

        {/* Profile & Settings */}
        <Route path="/profile" element={<Profile />} />

        {/* Live Support Portal & Chat */}
        <Route path="/support" element={<SupportHome />} />
        <Route path="/chat" element={<SupportChat />} />

        {/* Admin & Simulator */}
        <Route path="/admin" element={<AdminPanel />} />

        {/* Quick Route Aliases */}
        <Route path="/pay" element={<Dashboard />} />
        <Route path="/receive" element={<Dashboard />} />
        <Route path="/receive/usd" element={<Dashboard />} />

        {/* Catch-all redirect to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
