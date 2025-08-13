import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

// TODO: wire your real auth state here
const isAuthenticated = true;

const PrivateRoutes: React.FC = () => {
  const location = useLocation();
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default PrivateRoutes;
