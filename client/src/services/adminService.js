import api from "./api";
import { API_ENDPOINTS } from "../utils/constants";

const adminService = {
  login: async (credentials) => {
    const response = await api.post(API_ENDPOINTS.ADMIN_LOGIN, credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  },

  getAllAppointments: async (params) => {
    const response = await api.get(API_ENDPOINTS.ADMIN_APPOINTMENTS, {
      params,
    });
    return response.data;
  },

  updateAppointmentStatus: async (id, status) => {
    const response = await api.put(
      `${API_ENDPOINTS.ADMIN_APPOINTMENTS}/${id}/status`,
      { status }
    );
    return response.data;
  },

  addBloodBank: async (data) => {
    const response = await api.post(API_ENDPOINTS.ADMIN_BLOODBANKS, data);
    return response.data;
  },

  updateBloodBank: async (id, data) => {
    const response = await api.put(
      `${API_ENDPOINTS.ADMIN_BLOODBANKS}/${id}`,
      data
    );
    return response.data;
  },

  deleteBloodBank: async (id) => {
    await api.delete(`${API_ENDPOINTS.ADMIN_BLOODBANKS}/${id}`);
  },

  updateInventory: async (id, inventory) => {
    const response = await api.put(
      `${API_ENDPOINTS.ADMIN_BLOODBANKS}/${id}/inventory`,
      inventory
    );
    return response.data;
  },
};

export default adminService;
