import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  FormControl,
  Select,
  MenuItem,
  Chip,
  styled,
  alpha,
  IconButton,
  Tooltip,
  Collapse,
  Grid,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";
import LoadingSpinner from "../common/LoadingSpinner";
import ConfirmDialog from "../common/ConfirmDialog";
import { useAlert } from "../../contexts/AlertContext";
import api from "../../services/api";
import bloodBankService from "../../services/bloodBankService";

// Existing styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: "12px 16px",
  fontSize: "0.875rem",
  borderBottom: `1px solid ${
    theme.palette.mode === "dark"
      ? alpha(theme.palette.divider, 0.1)
      : alpha(theme.palette.divider, 0.08)
  }`,
  "&.header": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? alpha(theme.palette.background.paper, 0.5)
        : alpha(theme.palette.background.paper, 0.9),
    backdropFilter: "blur(8px)",
    position: "sticky",
    top: 0,
    zIndex: 1,
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
  "&:hover": {
    backgroundColor: `${customcolor}18`,
  },
  "& .MuiChip-label": {
    padding: "0 8px",
  },
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? alpha(theme.palette.background.paper, 0.8)
        : alpha(theme.palette.background.paper, 0.9),
    "&:hover": {
      backgroundColor:
        theme.palette.mode === "dark"
          ? alpha(theme.palette.background.paper, 0.9)
          : alpha(theme.palette.background.paper, 1),
    },
  },
}));

const ExpandButton = styled(IconButton)(({ theme }) => ({
  width: 28,
  height: 28,
  padding: 2,
  marginRight: theme.spacing(1),
  backgroundColor:
    theme.palette.mode === "dark"
      ? alpha(theme.palette.action.active, 0.05)
      : alpha(theme.palette.action.active, 0.03),
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? alpha(theme.palette.action.active, 0.1)
        : alpha(theme.palette.action.active, 0.05),
  },
}));

// Status configurations
const STATUS_CONFIGS = {
  PENDING: { color: "#FF9F0A", label: "Pending" },
  ACCEPTED: { color: "#32D74B", label: "Accepted" },
  REJECTED: { color: "#FF453A", label: "Rejected" },
  COMPLETED: { color: "#30D158", label: "Completed" },
};

// Enhanced Row Component
const AppointmentRow = ({
  appointment,
  bloodBank,
  onDelete,
  onStatusChange,
  updatingId,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
        hover
        sx={{
          "& > *": { borderBottom: open ? "unset" : undefined },
          "&:hover": {
            backgroundColor: (theme) =>
              theme.palette.mode === "dark"
                ? alpha(theme.palette.action.hover, 0.1)
                : alpha(theme.palette.action.hover, 0.05),
          },
        }}
      >
        <StyledTableCell>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ExpandButton size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </ExpandButton>
            {new Date(appointment.appointmentDate).toLocaleString()}
          </Box>
        </StyledTableCell>
        <StyledTableCell>{appointment.donorName}</StyledTableCell>
        <StyledTableCell>
          {bloodBank?.name || "Unknown Blood Bank"}
        </StyledTableCell>
        <StyledTableCell>
          <StyledChip
            label={STATUS_CONFIGS[appointment.status].label}
            customcolor={STATUS_CONFIGS[appointment.status].color}
            size="small"
          />
        </StyledTableCell>
        <StyledTableCell>
          <StyledFormControl
            size="small"
            sx={{ minWidth: 120 }}
            disabled={updatingId === appointment.id}
          >
            <Select
              value={appointment.status}
              onChange={(e) => onStatusChange(appointment.id, e.target.value)}
              disabled={appointment.status === "COMPLETED"}
              size="small"
            >
              <MenuItem value="PENDING">Pending</MenuItem>
              <MenuItem value="ACCEPTED">Accept</MenuItem>
              <MenuItem value="REJECTED">Reject</MenuItem>
              <MenuItem value="COMPLETED">Complete</MenuItem>
            </Select>
          </StyledFormControl>
        </StyledTableCell>
        <StyledTableCell align="right">
          <Tooltip title="Delete Appointment">
            <IconButton
              onClick={() => onDelete(appointment)}
              size="small"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark"
                    ? alpha(theme.palette.error.main, 0.1)
                    : alpha(theme.palette.error.main, 0.05),
                "&:hover": {
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? alpha(theme.palette.error.main, 0.2)
                      : alpha(theme.palette.error.main, 0.1),
                },
              }}
            >
              <DeleteIcon fontSize="small" color="error" />
            </IconButton>
          </Tooltip>
        </StyledTableCell>
      </TableRow>
      <TableRow>
        <StyledTableCell
          colSpan={6}
          sx={{ py: 0, borderBottom: open ? undefined : "none" }}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ py: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: (theme) =>
                        theme.palette.mode === "dark"
                          ? alpha(theme.palette.background.paper, 0.3)
                          : alpha(theme.palette.background.paper, 0.5),
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Donor Information
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>Name:</strong> {appointment.donorName}
                    </Typography>
                    <Typography variant="body2">
                      <strong>ID:</strong> {appointment.donorId}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: (theme) =>
                        theme.palette.mode === "dark"
                          ? alpha(theme.palette.background.paper, 0.3)
                          : alpha(theme.palette.background.paper, 0.5),
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Blood Bank Information
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>Name:</strong>{" "}
                      {bloodBank?.name || "Unknown Blood Bank"}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Address:</strong> {bloodBank?.address || "N/A"}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Contact:</strong>{" "}
                      {bloodBank?.contactNumber || "N/A"}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </StyledTableCell>
      </TableRow>
    </>
  );
};

const AppointmentManagement = () => {
  // Existing state and functions remain unchanged
  const [appointments, setAppointments] = useState([]);
  const [bloodBanks, setBloodBanks] = useState({});
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { showAlert } = useAlert();

  // Existing fetch functions and effects remain unchanged
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchBloodBanks(), fetchAppointments()]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
  }, []);

  // Keep existing API functions
  const fetchBloodBanks = async () => {
    try {
      const response = await bloodBankService.getAll();
      const bloodBankMap = response.reduce((acc, bank) => {
        acc[bank.id] = bank;
        return acc;
      }, {});
      setBloodBanks(bloodBankMap);
    } catch (error) {
      showAlert("Failed to load blood banks", "error");
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await api.get("/appointments");
      const enhancedAppointments = await Promise.all(
        response.data.map(async (appointment) => {
          try {
            const donorResponse = await api.get(
              `/donors/${appointment.donorId}`
            );
            return {
              ...appointment,
              donorName: donorResponse.data.name || appointment.donorId,
            };
          } catch (error) {
            return {
              ...appointment,
              donorName: "Unknown Donor",
            };
          }
        })
      );
      setAppointments(enhancedAppointments);
    } catch (error) {
      showAlert("Failed to load appointments", "error");
    }
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      setUpdatingId(appointmentId);
      await api.put(`/admins/appointments/${appointmentId}/status`, null, {
        params: { status: newStatus },
      });
      showAlert("Status updated successfully", "success");
      await fetchAppointments();
    } catch (error) {
      showAlert("Failed to update status", "error");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteClick = (appointment) => {
    setSelectedAppointment(appointment);
    setOpenConfirmDelete(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await api.delete(`/admins/appointments/${selectedAppointment.id}`);
      showAlert("Appointment deleted successfully", "success");
      await fetchAppointments();
    } catch (error) {
      showAlert("Failed to delete appointment", "error");
    } finally {
      setOpenConfirmDelete(false);
      setSelectedAppointment(null);
    }
  };

  return (
    <Box className="content-container">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" className="section-title">
          Appointments
        </Typography>
      </Box>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            bgcolor: (theme) =>
              theme.palette.mode === "dark"
                ? alpha(theme.palette.background.paper, 0.8)
                : alpha(theme.palette.background.paper, 0.9),
            backdropFilter: "blur(10px)",
            border: "1px solid",
            borderColor: (theme) =>
              theme.palette.mode === "dark"
                ? alpha(theme.palette.divider, 0.1)
                : alpha(theme.palette.divider, 0.08),
          }}
        >
          <TableContainer className="scroll-container">
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell className="header">Date</StyledTableCell>
                  <StyledTableCell className="header">
                    Donor Name
                  </StyledTableCell>
                  <StyledTableCell className="header">
                    Blood Bank
                  </StyledTableCell>
                  <StyledTableCell className="header">Status</StyledTableCell>
                  <StyledTableCell className="header">Action</StyledTableCell>
                  <StyledTableCell className="header" align="right">
                    Delete
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((appointment) => (
                    <AppointmentRow
                      key={appointment.id}
                      appointment={appointment}
                      bloodBank={bloodBanks[appointment.bloodBankId]}
                      onDelete={handleDeleteClick}
                      onStatusChange={handleStatusChange}
                      updatingId={updatingId}
                    />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={appointments.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
            sx={{
              borderTop: "1px solid",
              borderColor: (theme) =>
                theme.palette.mode === "dark"
                  ? alpha(theme.palette.divider, 0.1)
                  : alpha(theme.palette.divider, 0.08),
            }}
          />
        </Paper>
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={openConfirmDelete}
        onClose={() => {
          setOpenConfirmDelete(false);
          setSelectedAppointment(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Appointment"
        message={
          <Box>
            <Typography variant="body1" gutterBottom>
              Are you sure you want to delete this appointment?
            </Typography>
            <Typography variant="body2" color="error">
              This action cannot be undone.
            </Typography>
            {selectedAppointment && (
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: "background.default",
                  borderRadius: 1,
                }}
              >
                <Typography variant="subtitle2" gutterBottom>
                  Appointment Details:
                </Typography>
                <Typography variant="body2">
                  Donor: {selectedAppointment.donorName}
                </Typography>
                <Typography variant="body2">
                  Date:{" "}
                  {new Date(
                    selectedAppointment.appointmentDate
                  ).toLocaleString()}
                </Typography>
                <Typography variant="body2">
                  Blood Bank:{" "}
                  {bloodBanks[selectedAppointment.bloodBankId]?.name ||
                    "Unknown Blood Bank"}
                </Typography>
                <Typography variant="body2">
                  Status: {STATUS_CONFIGS[selectedAppointment.status].label}
                </Typography>
              </Box>
            )}
          </Box>
        }
      />
    </Box>
  );
};

export default AppointmentManagement;
