import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Chip,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useAuth } from "../../contexts/AuthContext";
import { useApi } from "../../hooks/useApi";
import LoadingSpinner from "../common/LoadingSpinner";
import donorService from "../../services/donorService";
import bloodBankService from "../../services/bloodBankService";

const AppointmentForm = ({ open, onClose, bloodBanks }) => {
  const [formData, setFormData] = useState({
    bloodBankId: "",
    appointmentDate: null,
  });
  const { user } = useAuth();
  const { handleRequest } = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleRequest(
        () => donorService.createAppointment(user.id, formData),
        "Appointment scheduled successfully"
      );
      onClose(true);
    } catch (error) {
      // Error handling is managed by useApi hook
    }
  };

  return (
    <Dialog open={open} onClose={() => onClose(false)} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Schedule New Appointment</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              select
              fullWidth
              label="Blood Bank"
              value={formData.bloodBankId}
              onChange={(e) =>
                setFormData({ ...formData, bloodBankId: e.target.value })
              }
              required
            >
              {bloodBanks.map((bank) => (
                <MenuItem key={bank.id} value={bank.id}>
                  {bank.name}
                </MenuItem>
              ))}
            </TextField>
            <DateTimePicker
              label="Appointment Date"
              value={formData.appointmentDate}
              onChange={(value) =>
                setFormData({ ...formData, appointmentDate: value })
              }
              renderInput={(params) => <TextField {...params} required />}
              minDate={new Date()}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose(false)}>Cancel</Button>
          <Button type="submit" variant="contained">
            Schedule
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const DonorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [bloodBanks, setBloodBanks] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const { user } = useAuth();
  const { handleRequest, loading } = useApi();

  const fetchAppointments = async () => {
    const data = await handleRequest(
      () => donorService.getAppointments(user.id),
      "",
      "Failed to fetch appointments"
    );
    setAppointments(data);
  };

  const fetchBloodBanks = async () => {
    const data = await handleRequest(
      () => bloodBankService.getAll(),
      "",
      "Failed to fetch blood banks"
    );
    setBloodBanks(data);
  };

  useEffect(() => {
    fetchAppointments();
    fetchBloodBanks();
  }, []);

  const handleFormClose = (refresh) => {
    setOpenForm(false);
    if (refresh) {
      fetchAppointments();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "ACCEPTED":
        return "success";
      case "REJECTED":
        return "error";
      default:
        return "warning";
    }
  };

  return (
    <LoadingSpinner loading={loading}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box
          sx={{
            mb: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Welcome, {user.name}</Typography>
          <Button variant="contained" onClick={() => setOpenForm(true)}>
            Schedule Appointment
          </Button>
        </Box>

        <Grid container spacing={3}>
          {appointments.map((appointment) => (
            <Grid item xs={12} md={6} key={appointment.id}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      {
                        bloodBanks.find(
                          (bank) => bank.id === appointment.bloodBankId
                        )?.name
                      }
                    </Typography>
                    <Chip
                      label={appointment.status}
                      color={getStatusColor(appointment.status)}
                      size="small"
                    />
                  </Box>
                  <Typography color="textSecondary" gutterBottom>
                    Date:{" "}
                    {new Date(appointment.appointmentDate).toLocaleString()}
                  </Typography>
                  {appointment.status === "ACCEPTED" && (
                    <Typography
                      variant="body2"
                      sx={{ mt: 2, color: "success.main" }}
                    >
                      Your appointment has been confirmed. Please arrive 15
                      minutes before the scheduled time.
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
          {appointments.length === 0 && (
            <Grid item xs={12}>
              <Typography color="textSecondary" align="center">
                No appointments scheduled yet
              </Typography>
            </Grid>
          )}
        </Grid>

        <AppointmentForm
          open={openForm}
          onClose={handleFormClose}
          bloodBanks={bloodBanks}
        />
      </Container>
    </LoadingSpinner>
  );
};

export default DonorDashboard;
