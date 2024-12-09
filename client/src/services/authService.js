// src/services/authService.js
import api from "../services/api";

const authService = {
  adminLogin: async (credentials) => {
    const response = await api.post("/admins/login", credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userType", "admin");
    }
    return response.data;
  },

  donorLogin: async (credentials) => {
    const response = await api.post("/donors/login", credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userType", "donor");
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
  },
};

export default authService;
