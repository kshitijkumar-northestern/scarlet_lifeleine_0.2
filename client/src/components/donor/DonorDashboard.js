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
  styled,
  alpha,
  IconButton,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import {
  Add as AddIcon,
  Close as CloseIcon,
  AccessTime as AccessTimeIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
} from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";
import { useAlert } from "../../contexts/AlertContext";
import donorService from "../../services/donorService";
import bloodBankService from "../../services/bloodBankService";
import api from "../../services/api";

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  backgroundColor:
    theme.palette.mode === "dark"
      ? alpha(theme.palette.background.paper, 0.8)
      : alpha(theme.palette.background.paper, 0.9),
  backdropFilter: "blur(10px)",
  border: "1px solid",
  borderColor:
    theme.palette.mode === "dark"
      ? alpha(theme.palette.divider, 0.1)
      : alpha(theme.palette.divider, 0.08),
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 8px 16px rgba(0, 0, 0, 0.4)"
        : "0 8px 16px rgba(0, 0, 0, 0.1)",
  },
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: 12,
    backgroundColor:
      theme.palette.mode === "dark"
        ? alpha(theme.palette.background.paper, 0.8)
        : alpha(theme.palette.background.paper, 0.9),
    backdropFilter: "blur(10px)",
    border: "1px solid",
    borderColor:
      theme.palette.mode === "dark"
        ? alpha(theme.palette.divider, 0.1)
        : alpha(theme.palette.divider, 0.08),
  },
}));

const StyledChip = styled(Chip)(({ theme, customcolor }) => ({
  backgroundColor: `${customcolor}12`,
  color: customcolor,
  border: `1px solid ${customcolor}30`,
  fontWeight: 500,
  minWidth: "45px",
  height: "24px",
  fontSize: "0.8125rem",
  borderRadius: "6px",
  "& .MuiChip-label": {
    padding: "0 8px",
  },
}));

// Constants
const STATUS_CONFIGS = {
  PENDING: { color: "#FF9F0A", label: "Pending" },
  ACCEPTED: { color: "#32D74B", label: "Accepted" },
  REJECTED: { color: "#FF453A", label: "Rejected" },
  COMPLETED: { color: "#30D158", label: "Completed" },
};

// Helper Components
const InfoRow = ({ icon: Icon, content }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
    <Icon sx={{ fontSize: 20, color: "text.secondary", opacity: 0.8 }} />
    <Typography variant="body2" color="text.secondary">
      {content}
    </Typography>
  </Box>
);

// Appointment Card Component
const AppointmentCard = ({ appointment, bloodBank }) => {
  return (
    <StyledCard elevation={0}>
      <CardContent sx={{ p: 2.5 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2.5,
          }}
        >
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              {bloodBank?.name || "Unknown Blood Bank"}
            </Typography>
          </Box>
          <StyledChip
            label={STATUS_CONFIGS[appointment.status].label}
            customcolor={STATUS_CONFIGS[appointment.status].color}
            size="small"
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <InfoRow
            icon={AccessTimeIcon}
            content={
              <>
                <Box component="span" sx={{ fontWeight: 500 }}>
                  Appointment:
                </Box>{" "}
                {new Date(appointment.appointmentDate).toLocaleString()}
              </>
            }
          />

          {bloodBank && (
            <>
              <InfoRow
                icon={LocationIcon}
                content={
                  <>
                    <Box component="span" sx={{ fontWeight: 500 }}>
                      Address:
                    </Box>{" "}
                    {bloodBank.address}
                  </>
                }
              />
              <InfoRow
                icon={PhoneIcon}
                content={
                  <>
                    <Box component="span" sx={{ fontWeight: 500 }}>
                      Contact:
                    </Box>{" "}
                    {bloodBank.contactNumber}
                  </>
                }
              />
            </>
          )}
        </Box>
      </CardContent>
    </StyledCard>
  );
};

// Appointment Form Component
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
      const selectedDate = new Date(formData.appointmentDate);
      const timezoneOffset = selectedDate.getTimezoneOffset();
      const adjustedDate = new Date(
        selectedDate.getTime() - timezoneOffset * 60000
      );

      const appointmentData = {
        bloodBankId: formData.bloodBankId,
        appointmentDate: adjustedDate.toISOString(),
      };

      await api.post(
        `/donors/appointments?donorId=${donorId}`,
        appointmentData
      );
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
      <StyledDialog
        open={open}
        onClose={() => onClose(false)}
        maxWidth="sm"
        fullWidth
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid",
            borderColor: (theme) =>
              theme.palette.mode === "dark"
                ? alpha(theme.palette.divider, 0.1)
                : alpha(theme.palette.divider, 0.08),
          }}
        >
          <Typography variant="h6">Schedule New Appointment</Typography>
          <IconButton
            onClick={() => onClose(false)}
            size="small"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? alpha(theme.palette.action.active, 0.05)
                  : alpha(theme.palette.action.active, 0.03),
              "&:hover": {
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark"
                    ? alpha(theme.palette.action.active, 0.1)
                    : alpha(theme.palette.action.active, 0.05),
              },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ p: 2 }}>
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
                size="small"
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
                  <TextField {...params} required fullWidth size="small" />
                )}
                minDate={new Date()}
                disabled={loading}
                ampm={true}
                minutesStep={30}
              />
              {formData.appointmentDate && (
                <Typography variant="caption" color="text.secondary">
                  Selected time:{" "}
                  {new Date(formData.appointmentDate).toLocaleString()}
                </Typography>
              )}
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2, pt: 0 }}>
            <Button
              onClick={() => onClose(false)}
              disabled={loading}
              size="small"
              variant="outlined"
              sx={{
                borderRadius: 1,
                borderColor: (theme) =>
                  theme.palette.mode === "dark"
                    ? alpha(theme.palette.divider, 0.1)
                    : alpha(theme.palette.divider, 0.08),
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              size="small"
              sx={{
                borderRadius: 1,
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "none",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
              ) : null}
              {loading ? "Scheduling..." : "Schedule"}
            </Button>
          </DialogActions>
        </form>
      </StyledDialog>
    </LocalizationProvider>
  );
};

// Main DonorDashboard Component
const DonorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [bloodBanks, setBloodBanks] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { showAlert } = useAlert();

  const fetchData = async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const [appointmentsResponse, bloodBanksResponse] = await Promise.all([
        donorService.getAppointments(user.id),
        bloodBankService.getAll(),
      ]);

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
      {/* Welcome Section */}
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
          startIcon={<AddIcon />}
          onClick={() => setOpenForm(true)}
          disabled={loading}
          size="small"
          sx={{
            borderRadius: 1,
            px: 2,
            backgroundColor: (theme) => theme.palette.primary.main,
            "&:hover": {
              backgroundColor: (theme) => theme.palette.primary.dark,
            },
            boxShadow: "none",
          }}
        >
          Schedule Appointment
        </Button>
      </Box>

      {/* Appointments Section */}
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
              <Box
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: 2,
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark"
                      ? alpha(theme.palette.background.paper, 0.4)
                      : alpha(theme.palette.background.paper, 0.5),
                  border: "1px solid",
                  borderColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? alpha(theme.palette.divider, 0.1)
                      : alpha(theme.palette.divider, 0.08),
                }}
              >
                <Typography color="text.secondary">
                  No appointments scheduled yet
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      )}

      {/* Appointment Form Dialog */}
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

// Date validation utilities
const isValidDate = (date) => {
  return date instanceof Date && !isNaN(date);
};

const validateAppointmentDate = (date) => {
  if (!date || !isValidDate(new Date(date))) {
    return false;
  }
  const appointmentDate = new Date(date);
  const now = new Date();

  // Add timezone offset consideration
  const timezoneOffset = appointmentDate.getTimezoneOffset();
  const adjustedDate = new Date(
    appointmentDate.getTime() - timezoneOffset * 60000
  );

  return adjustedDate > now;
};

const validateForm = (formData) => {
  const errors = {};

  if (!formData.bloodBankId) {
    errors.bloodBankId = "Blood bank is required";
  }

  if (!formData.appointmentDate) {
    errors.appointmentDate = "Appointment date is required";
  } else if (!validateAppointmentDate(formData.appointmentDate)) {
    errors.appointmentDate = "Please select a future date";
  }

  return errors;
};

const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  if (!isValidDate(d)) return "";

  return d.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export default DonorDashboard;
