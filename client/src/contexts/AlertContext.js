// src/contexts/AlertContext.js
import React, { createContext, useContext, useState } from "react";
import { Snackbar, Alert as MuiAlert } from "@mui/material";

const AlertContext = createContext(null);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "info", // 'error' | 'warning' | 'info' | 'success'
    duration: 6000,
  });

  const showAlert = (message, severity = "info", duration = 6000) => {
    setAlert({
      open: true,
      message,
      severity,
      duration,
    });
  };

  const hideAlert = () => {
    setAlert((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      <Snackbar
        open={alert.open}
        autoHideDuration={alert.duration}
        onClose={hideAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={hideAlert}
          severity={alert.severity}
        >
          {alert.message}
        </MuiAlert>
      </Snackbar>
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
