// src/components/donor/DonorDashboard.js
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
  CircularProgress,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { useAuth } from "../../contexts/AuthContext";
import { useAlert } from "../../contexts/AlertContext";
import donorService from "../../services/donorService";
import bloodBankService from "../../services/bloodBankService";
import api from "../../services/api";

const AppointmentForm = ({ open, onClose, bloodBanks, donorId }) => {
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    bloodBankId: "",
    appointmentDate: null,
  });

  useEffect(() => {
    if (open) {
      setFormData({
        bloodBankId: "",
        appointmentDate: null,
      });
    }
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.bloodBankId || !formData.appointmentDate) {
      showAlert("Please fill all required fields", "error");
      return;
    }

    setLoading(true);
    try {
      // Format request according to Swagger specification
      const url = `/donors/appointments?donorId=${donorId}`;
      const appointmentData = {
        bloodBankId: formData.bloodBankId,
        appointmentDate: new Date(formData.appointmentDate).toISOString(),
      };

      console.log("Creating appointment with:", {
        url,
        data: appointmentData,
      });

      const response = await api.post(url, appointmentData);
      console.log("Appointment creation response:", response);

      showAlert("Appointment scheduled successfully", "success");
      onClose(true);
    } catch (error) {
      console.error("Failed to create appointment:", error);
      showAlert(
        error.response?.data?.message || "Failed to schedule appointment",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog
        open={open}
        onClose={() => onClose(false)}
        maxWidth="sm"
        fullWidth
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>Schedule New Appointment</DialogTitle>
          <DialogContent>
            <Box
              sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                select
                required
                fullWidth
                label="Blood Bank"
                value={formData.bloodBankId}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    bloodBankId: e.target.value,
                  }))
                }
                disabled={loading}
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
                onChange={(newDate) =>
                  setFormData((prev) => ({
                    ...prev,
                    appointmentDate: newDate,
                  }))
                }
                renderInput={(params) => (
                  <TextField {...params} required fullWidth />
                )}
                minDate={new Date()}
                disabled={loading}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => onClose(false)} disabled={loading}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={
                loading && <CircularProgress size={20} color="inherit" />
              }
            >
              {loading ? "Scheduling..." : "Schedule"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </LocalizationProvider>
  );
};

const AppointmentCard = ({ appointment, bloodBank }) => {
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

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {bloodBank?.name || "Unknown Blood Bank"}
          </Typography>
          <Chip
            label={appointment.status}
            color={getStatusColor(appointment.status)}
            size="small"
          />
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography color="textSecondary" gutterBottom>
              <Box component="span" sx={{ fontWeight: "medium" }}>
                Appointment Date:
              </Box>{" "}
              {new Date(appointment.appointmentDate).toLocaleString()}
            </Typography>
          </Grid>

          {bloodBank && (
            <>
              <Grid item xs={12}>
                <Typography color="textSecondary">
                  <Box component="span" sx={{ fontWeight: "medium" }}>
                    Address:
                  </Box>{" "}
                  {bloodBank.address}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography color="textSecondary">
                  <Box component="span" sx={{ fontWeight: "medium" }}>
                    Contact:
                  </Box>{" "}
                  {bloodBank.contactNumber}
                </Typography>
              </Grid>
            </>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

const DonorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [bloodBanks, setBloodBanks] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      // Get appointments and blood banks
      const [appointmentsResponse, bloodBanksResponse] = await Promise.all([
        donorService.getAppointments(user.id),
        bloodBankService.getAll(),
      ]);

      // Ensure we have complete blood bank information
      const bloodBanksMap = bloodBanksResponse.reduce((acc, bank) => {
        acc[bank.id] = bank;
        return acc;
      }, {});

      setAppointments(appointmentsResponse);
      setBloodBanks(bloodBanksResponse);
    } catch (error) {
      console.error("Error fetching data:", error);
      showAlert("Failed to load data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user?.id]);

  if (!user?.id) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography color="error" align="center">
          Please login to access the dashboard
        </Typography>
      </Container>
    );
  }

  return (
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
        <Button
          variant="contained"
          onClick={() => setOpenForm(true)}
          disabled={loading}
        >
          Schedule Appointment
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <Grid item xs={12} md={6} key={appointment.id}>
                <AppointmentCard
                  appointment={appointment}
                  bloodBank={bloodBanks.find(
                    (bank) => bank.id === appointment.bloodBankId
                  )}
                />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography color="textSecondary" align="center">
                No appointments scheduled yet
              </Typography>
            </Grid>
          )}
        </Grid>
      )}

      <AppointmentForm
        open={openForm}
        onClose={(refresh) => {
          setOpenForm(false);
          if (refresh) fetchData();
        }}
        bloodBanks={bloodBanks}
        donorId={user.id}
      />
    </Container>
  );
};

export default DonorDashboard;
