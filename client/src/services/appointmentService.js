// src/services/appointmentService.js
import api from "../services/api";

const appointmentService = {
  // Get all appointments
  getAll: async () => {
    try {
      // Update to correct endpoint from Swagger
      const response = await api.get("/appointments");
      return response.data;
    } catch (error) {
      console.error("Error fetching appointments:", error);
      throw error;
    }
  },

  // Get single appointment details
  getAppointmentById: async (id) => {
    try {
      const response = await api.get(`/appointments/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching appointment details:", error);
      throw error;
    }
  },

  // Update appointment status
  updateStatus: async (id, status) => {
    try {
      // Update to match Swagger specification
      const response = await api.put(
        `/admins/appointments/${id}/status`,
        null,
        {
          params: { status },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating appointment status:", error);
      throw error;
    }
  },
};

export default appointmentService;
