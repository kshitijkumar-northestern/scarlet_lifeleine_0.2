import { useState, useCallback } from "react";
import { useAlert } from "../contexts/AlertContext";
import { useAuth } from "../contexts/AuthContext";

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();
  const { logout } = useAuth();

  const handleRequest = useCallback(
    async (
      apiCall,
      successMessage = "",
      errorMessage = "An error occurred"
    ) => {
      setLoading(true);
      try {
        const response = await apiCall();
        if (successMessage) {
          showAlert(successMessage, "success");
        }
        return response;
      } catch (error) {
        if (error.response?.status === 401) {
          logout();
          showAlert("Session expired. Please login again.", "error");
        } else {
          showAlert(error.response?.data?.message || errorMessage, "error");
        }
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [showAlert, logout]
  );

  return { handleRequest, loading };
};
