// src/routes.js
import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoadingSpinner from "./components/common/LoadingSpinner";
import PrivateRoute from "./components/common/PrivateRoute";

// Lazy loaded components
const AdminLogin = React.lazy(() => import("./components/admin/AdminLogin"));
const AdminDashboard = React.lazy(() =>
  import("./components/admin/AdminDashboard")
);
const DonorLogin = React.lazy(() => import("./components/donor/DonorLogin"));
const DonorRegistration = React.lazy(() =>
  import("./components/donor/DonorRegistration")
);
const DonorDashboard = React.lazy(() =>
  import("./components/donor/DonorDashboard")
);
const NotFound = React.lazy(() => import("./components/common/NotFound"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/donor/login" />} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard/*"
          element={
            <PrivateRoute userType="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* Donor routes */}
        <Route path="/donor/login" element={<DonorLogin />} />
        <Route path="/donor/register" element={<DonorRegistration />} />
        <Route
          path="/donor/dashboard/*"
          element={
            <PrivateRoute userType="donor">
              <DonorDashboard />
            </PrivateRoute>
          }
        />

        {/* Catch all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
