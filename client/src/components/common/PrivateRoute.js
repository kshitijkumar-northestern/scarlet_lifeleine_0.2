// src/components/common/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const PrivateRoute = ({ children, userType }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or your loading component
  }

  if (!user) {
    return (
      <Navigate to={userType === "admin" ? "/admin/login" : "/donor/login"} />
    );
  }

  if (userType && user.userType !== userType) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
