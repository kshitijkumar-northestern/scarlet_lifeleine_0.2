// src/contexts/AuthContext.js
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("userData");

        if (token && storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        handleLogout();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
    setError(null);
  };

  const performNavigation = useCallback(
    (path) => {
      navigate(path);
    },
    [navigate]
  );

  const login = async (credentials, type) => {
    try {
      setError(null);
      setLoading(true);

      // Using username and password directly as received
      const endpoint = `/${type}s/login`;
      console.log("Login attempt to endpoint:", endpoint);

      const response = await api.post(endpoint, credentials);
      console.log("Login response:", response.data);

      const { token, ...userData } = response.data;

      const userToStore = {
        ...userData,
        role: type,
        userType: type,
      };

      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(userToStore));
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(userToStore);

      performNavigation(`/${type}/dashboard`);
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Login failed. Please check your credentials.";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      setLoading(true);
      const response = await api.post("/donors/register", userData);
      const { token, ...userInfo } = response.data;

      const userToStore = {
        ...userInfo,
        role: "donor",
        userType: "donor",
      };

      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(userToStore));
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(userToStore);

      performNavigation("/donor/dashboard");
      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(() => {
    handleLogout();
    performNavigation("/");
  }, [performNavigation]);

  const value = {
    user,
    login,
    logout,
    register,
    loading,
    error,
    role: user?.role,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
