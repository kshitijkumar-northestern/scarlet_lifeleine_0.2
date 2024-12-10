// src/components/admin/AppointmentManagement.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  Select,
  MenuItem,
  Chip,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useAlert } from "../../contexts/AlertContext";
import api from "../../services/api";
import bloodBankService from "../../services/bloodBankService";

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [bloodBanks, setBloodBanks] = useState({});
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const { showAlert } = useAlert();

  // Fetch blood banks data
  const fetchBloodBanks = async () => {
    try {
      const response = await bloodBankService.getAll();
      // Convert array to object map for easy lookup
      const bloodBankMap = response.reduce((acc, bank) => {
        acc[bank.id] = bank;
        return acc;
      }, {});
      setBloodBanks(bloodBankMap);
    } catch (error) {
      console.error("Failed to fetch blood banks:", error);
      showAlert("Failed to load blood banks", "error");
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await api.get("/appointments");
      // Enhance appointments with donor and blood bank names
      const enhancedAppointments = await Promise.all(
        response.data.map(async (appointment) => {
          // Fetch donor details
          try {
            const donorResponse = await api.get(
              `/donors/${appointment.donorId}`
            );
            return {
              ...appointment,
              donorName: donorResponse.data.name || appointment.donorId,
            };
          } catch (error) {
            console.error("Error fetching donor details:", error);
            return {
              ...appointment,
              donorName: "Unknown Donor",
            };
          }
        })
      );
      setAppointments(enhancedAppointments);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
      showAlert("Failed to load appointments", "error");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchBloodBanks(), fetchAppointments()]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      setUpdatingId(appointmentId);
      await api.put(`/admins/appointments/${appointmentId}/status`, null, {
        params: { status: newStatus },
      });
      showAlert("Status updated successfully", "success");
      await fetchAppointments();
    } catch (error) {
      console.error("Failed to update status:", error);
      showAlert("Failed to update status", "error");
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "ACCEPTED":
        return "success";
      case "REJECTED":
        return "error";
      case "COMPLETED":
        return "primary";
      default:
        return "warning";
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Donor Name</TableCell>
            <TableCell>Blood Bank</TableCell>
            <TableCell>Current Status</TableCell>
            <TableCell>Update Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Typography color="textSecondary">
                  No appointments found
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>
                  {new Date(appointment.appointmentDate).toLocaleString()}
                </TableCell>
                <TableCell>{appointment.donorName}</TableCell>
                <TableCell>
                  {bloodBanks[appointment.bloodBankId]?.name ||
                    "Unknown Blood Bank"}
                </TableCell>
                <TableCell>
                  <Chip
                    label={appointment.status}
                    color={getStatusColor(appointment.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <FormControl
                    size="small"
                    sx={{ minWidth: 120 }}
                    disabled={updatingId === appointment.id}
                  >
                    <Select
                      value={appointment.status}
                      onChange={(e) =>
                        handleStatusChange(appointment.id, e.target.value)
                      }
                      disabled={appointment.status === "COMPLETED"}
                    >
                      <MenuItem value="PENDING">Pending</MenuItem>
                      <MenuItem value="ACCEPTED">Accept</MenuItem>
                      <MenuItem value="REJECTED">Reject</MenuItem>
                      <MenuItem value="COMPLETED">Complete</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AppointmentManagement;
