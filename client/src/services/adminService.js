// src/services/adminService.js
import api from "./api";
import { API_ENDPOINTS } from "../utils/constants";

const adminService = {
  login: async (credentials) => {
    try {
      const response = await api.post(API_ENDPOINTS.ADMIN_LOGIN, credentials);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        const userData = {
          ...response.data,
          userType: "admin",
        };
        localStorage.setItem("userData", JSON.stringify(userData));
      }
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  getAllAppointments: async (id) => {
    try {
      const response = await api.get(`/appointments/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching appointments:", error);
      throw error;
    }
  },

  updateAppointmentStatus: async (id, status) => {
    try {
      const response = await api.put(
        `/admins/appointments/${id}/status?status=${status}`
      );
      return response.data;
    } catch (error) {
      console.error("Error updating appointment status:", error);
      throw error;
    }
  },

  addBloodBank: async (data) => {
    try {
      const response = await api.post(API_ENDPOINTS.ADMIN_BLOODBANKS, data);
      return response.data;
    } catch (error) {
      console.error("Error adding blood bank:", error);
      throw error;
    }
  },

  updateBloodBank: async (id, data) => {
    try {
      const response = await api.put(
        `${API_ENDPOINTS.ADMIN_BLOODBANKS}/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error updating blood bank:", error);
      throw error;
    }
  },

  deleteBloodBank: async (id) => {
    try {
      await api.delete(`${API_ENDPOINTS.ADMIN_BLOODBANKS}/${id}`);
    } catch (error) {
      console.error("Error deleting blood bank:", error);
      throw error;
    }
  },

  updateInventory: async (id, inventory) => {
    try {
      const response = await api.put(
        `${API_ENDPOINTS.ADMIN_BLOODBANKS}/${id}/inventory`,
        inventory
      );
      return response.data;
    } catch (error) {
      console.error("Error updating inventory:", error);
      throw error;
    }
  },
};

export default adminService;
