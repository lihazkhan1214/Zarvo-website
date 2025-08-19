import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import PrivateRoutes from "./PrivateRoutes";
import LoginWrapper from "../pages/LoginWrapper";
import HomePagewrapper from "../pages/HomePagewrapper";
import NewsDetailPageWrapper from "../pages/NewsDetailPageWrapper";
import WalletPageWrapper from "../pages/WalletPageWrapper";
import AnalyticPageWrapper from "../pages/AnalyticPageWrapper";
import PartnerPageWrapper from "../pages/PartnerPageWrapper";
import RecievePagewrapper from "../pages/RecievePagewrapper";
import SendPageWrapper from "../pages/SendPageWrapper";
import RedeemPageWrapper from "../pages/RedeemPageWrapper";
import TransactionPageWrapper from "../pages/TransactionPageWrapper";
import NotificationPageWrapper from "../pages/NotificationPageWrapper";
import RefferalPageWrapper from "../pages/RefferalPageWrapper";
import RewardPageWrapper from "../pages/RewardPageWrapper";
import ProfilePageWrapper from "../pages/ProfilePageWrapper";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginWrapper />} />

        {/* Private (guarded) */}
        <Route element={<PrivateRoutes />}>
          {/* App layout wrapper */}
          <Route element={<App />}>
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="home" element={<HomePagewrapper />} />
            {/* catch-all */}
            <Route path="*" element={<Navigate to="/home" replace />} />
            <Route path="/news/:id" element={<NewsDetailPageWrapper />} />
            <Route path="/wallet" element={<WalletPageWrapper />} />
            <Route path="/analytics" element={<AnalyticPageWrapper />} />
            <Route path="/partner" element={<PartnerPageWrapper />} />
            <Route path="/recieve" element={<RecievePagewrapper />} />
            <Route path="/send" element={<SendPageWrapper />} />
            <Route path="/redeem" element={<RedeemPageWrapper />} />
            <Route path="/history" element={<TransactionPageWrapper />} />
            <Route path="/notification" element={<NotificationPageWrapper />} />
            <Route path="/refferal" element={<RefferalPageWrapper />} />
            <Route path="/rewards" element={<RewardPageWrapper />} />
            <Route path="/profile" element={<ProfilePageWrapper />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
