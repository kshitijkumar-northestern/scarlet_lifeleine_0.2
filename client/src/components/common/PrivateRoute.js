// src/components/common/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import LoadingSpinner from "../common/LoadingSpinner";

const PrivateRoute = ({ children, roles }) => {
  const { user, role } = useAuth();

  // If not authenticated, redirect to the appropriate login page
  if (!user) {
    return <Navigate to={role === "admin" ? "/admin/login" : "/donor/login"} />;
  }

  // If roles are specified and user's role doesn't match, redirect to home
  if (roles && !roles.includes(role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
