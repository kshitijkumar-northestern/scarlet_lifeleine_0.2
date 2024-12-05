import React from "react";
import { BrowserRouter } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ThemeProvider } from "./contexts/ThemeContext"; // Import our custom ThemeProvider
import { AuthProvider } from "./contexts/AuthContext";
import { AlertProvider } from "./contexts/AlertContext";
import AppRoutes from "./routes";
import Navbar from "./components/common/Navbar";
import ErrorBoundary from "./components/common/ErrorBoundary";

const App = () => {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <AlertProvider>
          <AuthProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <BrowserRouter>
                <Navbar />
                <AppRoutes />
              </BrowserRouter>
            </LocalizationProvider>
          </AuthProvider>
        </AlertProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
