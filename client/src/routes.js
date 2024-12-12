// src/routes.js
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingSpinner from "./components/common/LoadingSpinner";
import PrivateRoute from "./components/common/PrivateRoute";

// Public pages
const HomePage = React.lazy(() => import("./components/common/HomePage"));
const AboutPage = React.lazy(() => import("./components/common/AboutPage"));
const ContactPage = React.lazy(() => import("./components/common/ContactPage"));

// Admin pages
const AdminLogin = React.lazy(() => import("./components/admin/AdminLogin"));
const AdminDashboard = React.lazy(() =>
  import("./components/admin/AdminDashboard")
);

// Donor pages
const DonorLogin = React.lazy(() => import("./components/donor/DonorLogin"));
const DonorRegistration = React.lazy(() =>
  import("./components/donor/DonorRegistration")
);
const DonorDashboard = React.lazy(() =>
  import("./components/donor/DonorDashboard")
);

// Error page
const NotFound = React.lazy(() => import("./components/common/NotFound"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Auth routes */}
        <Route path="/donor/login" element={<DonorLogin />} />
        <Route path="/donor/register" element={<DonorRegistration />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected routes */}
        <Route
          path="/admin/dashboard/*"
          element={
            <PrivateRoute userType="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
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
