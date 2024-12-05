import api from "./api";
import { API_ENDPOINTS } from "../utils/constants";

const bloodBankService = {
  getAll: async (params) => {
    const response = await api.get(API_ENDPOINTS.BLOODBANKS, { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`${API_ENDPOINTS.BLOODBANKS}/${id}`);
    return response.data;
  },

  getInventory: async (id) => {
    const response = await api.get(
      `${API_ENDPOINTS.BLOODBANKS}/${id}/inventory`
    );
    return response.data;
  },

  searchNearby: async (latitude, longitude, radius) => {
    const response = await api.get(`${API_ENDPOINTS.BLOODBANKS}/nearby`, {
      params: { latitude, longitude, radius },
    });
    return response.data;
  },
};

export default bloodBankService;
