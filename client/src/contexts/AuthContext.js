// src/contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = () => {
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
        localStorage.clear();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials, type) => {
    try {
      const endpoint = type === "admin" ? "/admins/login" : "/donors/login";
      const response = await api.post(endpoint, credentials);

      const { token, ...userData } = response.data;

      // Store token and set default header
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Store user data
      const userToStore = {
        ...userData,
        userType: type,
      };
      localStorage.setItem("userData", JSON.stringify(userToStore));

      // Update state
      setUser(userToStore);

      // Navigate based on user type
      navigate(type === "admin" ? "/admin/dashboard" : "/donor/dashboard");
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
    navigate("/");
  };

  if (loading) {
    return <div>Loading...</div>; // Or your loading component
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
