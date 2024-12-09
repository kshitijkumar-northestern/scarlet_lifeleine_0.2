// src/services/donorService.js
import api from "./api";
import { API_ENDPOINTS } from "../utils/constants";

const donorService = {
  register: async (data) => {
    try {
      const response = await api.post(API_ENDPOINTS.DONOR_REGISTER, data);
      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      const response = await api.post(API_ENDPOINTS.DONOR_LOGIN, credentials);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        const userData = {
          ...response.data,
          userType: "donor",
        };
        localStorage.setItem("userData", JSON.stringify(userData));
      }
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  getAppointments: async (donorId) => {
    try {
      const response = await api.get(
        API_ENDPOINTS.DONOR_APPOINTMENTS.replace("{id}", donorId)
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching appointments:", error);
      throw error;
    }
  },

  createAppointment: async (donorId, data) => {
    try {
      const response = await api.post(
        `/donors/appointments?donorId=${donorId}`,
        {
          bloodBankId: data.bloodBankId,
          appointmentDate: data.appointmentDate,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating appointment:", error);
      throw error;
    }
  },

  updateProfile: async (donorId, data) => {
    try {
      const response = await api.put(`/donors/${donorId}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  },
};

export default donorService;
