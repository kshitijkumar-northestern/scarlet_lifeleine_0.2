import api from "./api";
import { API_ENDPOINTS } from "../utils/constants";

const donorService = {
  register: async (data) => {
    const response = await api.post(API_ENDPOINTS.DONOR_REGISTER, data);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post(API_ENDPOINTS.DONOR_LOGIN, credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  },

  createAppointment: async (donorId, data) => {
    const response = await api.post(API_ENDPOINTS.DONOR_APPOINTMENTS, {
      ...data,
      donorId,
    });
    return response.data;
  },

  getAppointments: async (donorId) => {
    const response = await api.get(
      `${API_ENDPOINTS.DONOR_APPOINTMENTS}/${donorId}`
    );
    return response.data;
  },

  updateProfile: async (donorId, data) => {
    const response = await api.put(`/donors/${donorId}`, data);
    return response.data;
  },
};

export default donorService;
