import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./pages/Contexts/AuthContex";

const SecureRoute = () => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated)

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default SecureRoute;