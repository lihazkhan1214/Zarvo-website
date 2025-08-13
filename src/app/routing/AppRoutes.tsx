import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import PrivateRoutes from "./PrivateRoutes";
import LoginWrapper from "../pages/LoginWrapper";
import HomePagewrapper from "../pages/HomePagewrapper";

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
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
