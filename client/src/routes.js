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
        <Route path="/" element={<Navigate to="/donor/login" />} />

        {/* Admin Routes */}
        <Route path="/admin">
          <Route path="login" element={<AdminLogin />} />
          <Route
            path="dashboard/*"
            element={
              <PrivateRoute roles={["admin"]}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Donor Routes */}
        <Route path="/donor">
          <Route path="login" element={<DonorLogin />} />
          <Route path="register" element={<DonorRegistration />} />
          <Route
            path="dashboard"
            element={
              <PrivateRoute roles={["donor"]}>
                <DonorDashboard />
              </PrivateRoute>
            }
          />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
