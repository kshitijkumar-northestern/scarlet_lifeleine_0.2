import React, { useState, useEffect } from "react";
import {
  Box,
  Chip,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useAlert } from "../../contexts/AlertContext";
import adminService from "../../services/adminService";

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await adminService.getAllAppointments();
      setAppointments(response);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
      showAlert("Failed to load appointments", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      await adminService.updateAppointmentStatus(appointmentId, newStatus);
      showAlert("Status updated successfully", "success");
      fetchAppointments();
    } catch (error) {
      console.error("Error updating status:", error);
      showAlert("Failed to update status", "error");
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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Manage Appointments
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
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
                  No appointments found
                </TableCell>
              </TableRow>
            ) : (
              appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    {new Date(appointment.appointmentDate).toLocaleString()}
                  </TableCell>
                  <TableCell>{appointment.donorName}</TableCell>
                  <TableCell>{appointment.bloodBankName}</TableCell>
                  <TableCell>
                    <Chip
                      label={appointment.status}
                      color={getStatusColor(appointment.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                      <Select
                        value={appointment.status}
                        onChange={(e) =>
                          handleStatusChange(appointment.id, e.target.value)
                        }
                        disabled={appointment.status === "COMPLETED"}
                        size="small"
                      >
                        <MenuItem value="PENDING">Set as Pending</MenuItem>
                        <MenuItem value="ACCEPTED">Accept Appointment</MenuItem>
                        <MenuItem value="REJECTED">Reject Appointment</MenuItem>
                        <MenuItem value="COMPLETED">Mark as Completed</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AppointmentManagement;
