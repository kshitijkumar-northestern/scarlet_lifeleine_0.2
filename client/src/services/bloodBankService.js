// src/services/bloodBankService.js
import api from "./api";
import { API_ENDPOINTS } from "../utils/constants";

const bloodBankService = {
  getAll: async (params) => {
    try {
      const response = await api.get(API_ENDPOINTS.BLOODBANKS, { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching blood banks:", error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.BLOODBANKS}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching blood bank:", error);
      throw error;
    }
  },

  getInventory: async (id) => {
    try {
      const response = await api.get(
        `${API_ENDPOINTS.BLOODBANKS}/${id}/inventory`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching inventory:", error);
      throw error;
    }
  },

  searchNearby: async (latitude, longitude, radius) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.BLOODBANKS}/nearby`, {
        params: { latitude, longitude, radius },
      });
      return response.data;
    } catch (error) {
      console.error("Error searching nearby blood banks:", error);
      throw error;
    }
  },
};

export default bloodBankService;
