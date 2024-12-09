// src/App.js
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AlertProvider } from "./contexts/AlertContext";
import { AuthProvider } from "./contexts/AuthContext";
import AppRoutes from "./routes";
import Navbar from "./components/common/Navbar";
import ErrorBoundary from "./components/common/ErrorBoundary";

const App = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BrowserRouter>
          <AlertProvider>
            <AuthProvider>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Navbar />
                <AppRoutes />
              </LocalizationProvider>
            </AuthProvider>
          </AlertProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
