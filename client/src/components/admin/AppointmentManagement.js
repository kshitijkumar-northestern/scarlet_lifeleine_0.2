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
} from "@mui/material";
import { useAlert } from "../../contexts/AlertContext";
import appointmentService from "../../services/appointmentService";

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const { showAlert } = useAlert();

  const fetchAppointments = async () => {
    try {
      const data = await appointmentService.getAll();
      setAppointments(data);
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
      setUpdatingId(appointmentId);
      await appointmentService.updateStatus(appointmentId, newStatus);
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
            <TableCell>Donor</TableCell>
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
                <TableCell>{appointment.donorId}</TableCell>
                <TableCell>{appointment.bloodBankId}</TableCell>
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
