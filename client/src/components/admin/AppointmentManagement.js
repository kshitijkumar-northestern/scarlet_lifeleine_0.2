// src/components/admin/AppointmentManagement.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Visibility as ViewIcon } from "@mui/icons-material";
import DataTable from "../common/DataTable";
import LoadingSpinner from "../common/LoadingSpinner";
import { useApi } from "../../hooks/useApi";
import adminService from "../../services/adminService";
import { APPOINTMENT_STATUS } from "../../utils/constants";

const AppointmentDetails = ({ appointment, open, onClose, onStatusChange }) => {
  const [status, setStatus] = useState(appointment?.status);
  const { handleRequest } = useApi();

  const handleChange = async (newStatus) => {
    try {
      await handleRequest(
        () => adminService.updateAppointmentStatus(appointment._id, newStatus),
        "Appointment status updated successfully"
      );
      onStatusChange();
      setStatus(newStatus);
    } catch (error) {
      // Error handling is managed by useApi hook
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Appointment Details</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Donor:</strong> {appointment?.donorName}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Blood Bank:</strong> {appointment?.bloodBankName}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Date:</strong>{" "}
            {new Date(appointment?.appointmentDate).toLocaleString()}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Blood Group:</strong> {appointment?.bloodGroup}
          </Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              label="Status"
              onChange={(e) => handleChange(e.target.value)}
              disabled={status === "COMPLETED"}
            >
              {Object.entries(APPOINTMENT_STATUS).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { handleRequest, loading } = useApi();

  const fetchAppointments = async () => {
    const data = await handleRequest(
      () => adminService.getAllAppointments(),
      "",
      "Failed to fetch appointments"
    );
    setAppointments(data);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

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

  const columns = [
    {
      id: "appointmentDate",
      label: "Date",
      minWidth: 170,
      render: (value) => new Date(value).toLocaleString(),
    },
    { id: "donorName", label: "Donor", minWidth: 170 },
    { id: "bloodBankName", label: "Blood Bank", minWidth: 170 },
    {
      id: "status",
      label: "Status",
      minWidth: 130,
      render: (value) => (
        <Chip
          label={APPOINTMENT_STATUS[value]}
          color={getStatusColor(value)}
          size="small"
        />
      ),
    },
    {
      id: "actions",
      label: "Actions",
      minWidth: 100,
      align: "right",
      render: (_, row) => (
        <IconButton
          size="small"
          onClick={() => setSelectedAppointment(row)}
          color="primary"
        >
          <ViewIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <LoadingSpinner loading={loading}>
      <Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6">Appointment Management</Typography>
        </Box>

        <DataTable
          columns={columns}
          data={appointments}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          total={appointments.length}
        />

        {selectedAppointment && (
          <AppointmentDetails
            appointment={selectedAppointment}
            open={Boolean(selectedAppointment)}
            onClose={() => setSelectedAppointment(null)}
            onStatusChange={fetchAppointments}
          />
        )}
      </Box>
    </LoadingSpinner>
  );
};

export default AppointmentManagement;
