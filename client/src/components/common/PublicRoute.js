import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const PublicRoute = ({ children }) => {
  const { logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Only logout on public pages, not auth pages
    if (
      !["/donor/login", "/donor/register", "/admin/login"].includes(
        location.pathname
      )
    ) {
      logout();
    }
  }, [location.pathname, logout]);

  return children;
};

export default PublicRoute;
