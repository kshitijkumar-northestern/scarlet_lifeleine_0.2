import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Dialog,
  DialogContent,
  TextField,
  Grid,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Tooltip,
  Chip,
  styled,
  Collapse,
  alpha,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
  TrendingDown as TrendingDownIcon,
  TrendingUp as TrendingUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";

import LoadingSpinner from "../common/LoadingSpinner";
import ConfirmDialog from "../common/ConfirmDialog";
import { useAlert } from "../../contexts/AlertContext";
import api from "../../services/api";

// Styled Components
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

// Constants
const BLOOD_GROUPS = [
  "A_POSITIVE",
  "A_NEGATIVE",
  "B_POSITIVE",
  "B_NEGATIVE",
  "AB_POSITIVE",
  "AB_NEGATIVE",
  "O_POSITIVE",
  "O_NEGATIVE",
];

const INVENTORY_LEVELS = {
  CRITICAL: { threshold: 0, color: "#FF453A", label: "Critical" },
  LOW: { threshold: 10, color: "#FF9F0A", label: "Low" },
  MODERATE: { threshold: 20, color: "#32D74B", label: "Moderate" },
  GOOD: { threshold: Infinity, color: "#30D158", label: "Good" },
};

// Helper Functions
const getInventoryLevel = (value) => {
  if (value === 0) return INVENTORY_LEVELS.CRITICAL;
  if (value < 10) return INVENTORY_LEVELS.LOW;
  if (value < 20) return INVENTORY_LEVELS.MODERATE;
  return INVENTORY_LEVELS.GOOD;
};

const getRecommendation = (group, value) => {
  if (value === 0) {
    return `Urgent: Request immediate blood donation for ${group.replace(
      "_",
      " "
    )}`;
  } else if (value < 10) {
    return `Schedule blood donation drive for ${group.replace(
      "_",
      " "
    )} within the next week`;
  } else if (value < 20) {
    return `Plan to replenish ${group.replace(
      "_",
      " "
    )} inventory in the next 2 weeks`;
  }
  return null;
};

// Sub-components
const ExpandableRow = ({ bank, previousInventory, onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
        hover
        sx={{
          "& > *": { borderBottom: "unset" },
          "&:hover": {
            backgroundColor: (theme) =>
              theme.palette.mode === "dark"
                ? alpha(theme.palette.action.hover, 0.1)
                : alpha(theme.palette.action.hover, 0.05),
          },
        }}
      >
        <StyledTableCell>
          <ExpandButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </ExpandButton>
          {bank.name}
        </StyledTableCell>
        <StyledTableCell>{bank.address}</StyledTableCell>
        <StyledTableCell>{bank.contactNumber}</StyledTableCell>
        <StyledTableCell align="right">
          <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
            <IconButton
              onClick={() => onEdit(bank)}
              size="small"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark"
                    ? alpha(theme.palette.primary.main, 0.1)
                    : alpha(theme.palette.primary.main, 0.05),
                "&:hover": {
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? alpha(theme.palette.primary.main, 0.2)
                      : alpha(theme.palette.primary.main, 0.1),
                },
              }}
            >
              <EditIcon fontSize="small" color="primary" />
            </IconButton>
            <IconButton
              onClick={() => onDelete(bank)}
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
          </Box>
        </StyledTableCell>
      </TableRow>
      <TableRow>
        <StyledTableCell colSpan={4} sx={{ py: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ py: 2 }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{ mb: 2 }}
              >
                Inventory Levels
              </Typography>
              <Grid container spacing={2}>
                {BLOOD_GROUPS.map((group) => {
                  const value = bank.inventory?.[group] || 0;
                  const level = getInventoryLevel(value);
                  const prevValue = previousInventory?.[group];
                  const trend = prevValue !== undefined ? value - prevValue : 0;

                  return (
                    <Grid item xs={6} sm={3} key={group}>
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          bgcolor: `${level.color}08`,
                          border: `1px solid ${level.color}20`,
                        }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          {group.replace("_", " ")}
                        </Typography>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mt: 1 }}
                        >
                          <StyledChip
                            label={value}
                            size="small"
                            customcolor={level.color}
                            icon={
                              trend > 0 ? (
                                <TrendingUpIcon />
                              ) : trend < 0 ? (
                                <TrendingDownIcon />
                              ) : null
                            }
                          />
                          <Typography
                            variant="caption"
                            sx={{
                              ml: 1,
                              color: level.color,
                            }}
                          >
                            {level.label}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Collapse>
        </StyledTableCell>
      </TableRow>
    </>
  );
};

const BloodBankManagement = () => {
  // State
  const [bloodBanks, setBloodBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [previousInventory, setPreviousInventory] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contactNumber: "",
    inventory: {},
  });

  const { showAlert } = useAlert();

  // Effects
  useEffect(() => {
    fetchBloodBanks();
    const interval = setInterval(fetchBloodBanks, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  // API Handlers
  const fetchBloodBanks = async () => {
    try {
      setLoading(true);
      const response = await api.get("/bloodbanks");
      setPreviousInventory(
        bloodBanks.reduce((acc, bank) => {
          acc[bank.id] = bank.inventory;
          return acc;
        }, {})
      );
      setBloodBanks(response.data);
    } catch (error) {
      showAlert("Failed to fetch blood banks", "error");
    } finally {
      setLoading(false);
    }
  };

  // Form Handlers
  const resetForm = () => {
    setFormData({
      name: "",
      address: "",
      contactNumber: "",
      inventory: {},
    });
    setActiveTab(0);
  };

  const handleOpenForm = (bank = null) => {
    if (bank) {
      setFormData({
        name: bank.name,
        address: bank.address,
        contactNumber: bank.contactNumber,
        inventory: bank.inventory || {},
      });
      setSelectedBank(bank);
    } else {
      resetForm();
      setSelectedBank(null);
    }
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedBank(null);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      if (selectedBank) {
        await api.put(`/admins/bloodbanks/${selectedBank.id}`, formData);
        showAlert("Blood bank updated successfully", "success");
      } else {
        await api.post("/admins/bloodbanks", formData);
        showAlert("Blood bank added successfully", "success");
      }
      handleCloseForm();
      fetchBloodBanks();
    } catch (error) {
      showAlert("Failed to save blood bank", "error");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/admins/bloodbanks/${selectedBank.id}`);
      showAlert("Blood bank deleted successfully", "success");
      setOpenConfirm(false);
      setSelectedBank(null);
      fetchBloodBanks();
    } catch (error) {
      showAlert("Failed to delete blood bank", "error");
    }
  };

  const handleDetailsChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleInventoryChange = (group, value) => {
    const numValue = parseInt(value) || 0;
    if (numValue < 0) return;

    setFormData((prev) => ({
      ...prev,
      inventory: {
        ...prev.inventory,
        [group]: numValue,
      },
    }));
  };

  // Render Form Content
  const renderFormContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleDetailsChange}
                required
                disabled={formLoading}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contact Number"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleDetailsChange}
                required
                disabled={formLoading}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleDetailsChange}
                required
                multiline
                rows={2}
                disabled={formLoading}
                size="small"
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {BLOOD_GROUPS.map((group) => (
              <Grid item xs={6} sm={3} key={group}>
                <TextField
                  fullWidth
                  label={group.replace("_", " ")}
                  type="number"
                  value={formData.inventory[group] || 0}
                  onChange={(e) => handleInventoryChange(group, e.target.value)}
                  InputProps={{ inputProps: { min: 0 } }}
                  disabled={formLoading}
                  size="small"
                />
              </Grid>
            ))}
          </Grid>
        );
      default:
        return null;
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
          Blood Banks
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenForm()}
          size="small"
          sx={{
            borderRadius: "8px",
            px: 2,
            backgroundColor: (theme) => theme.palette.primary.main,
            "&:hover": {
              backgroundColor: (theme) => theme.palette.primary.dark,
            },
          }}
        >
          Add Blood Bank
        </Button>
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
                  <StyledTableCell className="header">Name</StyledTableCell>
                  <StyledTableCell className="header">Address</StyledTableCell>
                  <StyledTableCell className="header">Contact</StyledTableCell>
                  <StyledTableCell className="header" align="right">
                    Actions
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bloodBanks
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((bank) => (
                    <ExpandableRow
                      key={bank.id}
                      bank={bank}
                      previousInventory={previousInventory[bank.id]}
                      onEdit={handleOpenForm}
                      onDelete={() => {
                        setSelectedBank(bank);
                        setOpenConfirm(true);
                      }}
                    />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={bloodBanks.length}
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

      {/* Form Dialog */}
      <Dialog
        open={openForm}
        onClose={handleCloseForm}
        maxWidth="sm"
        fullWidth
        className="glass-effect"
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5">
            {selectedBank ? "Edit Blood Bank" : "Add New Blood Bank"}
          </Typography>
          <IconButton onClick={handleCloseForm} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{ px: 2, borderBottom: 1, borderColor: "divider" }}
        >
          <Tab label="Details" />
          <Tab label="Inventory" />
        </Tabs>

        <DialogContent>
          <form onSubmit={handleSubmit}>
            {renderFormContent()}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 3,
                gap: 1,
              }}
            >
              <Button
                onClick={handleCloseForm}
                disabled={formLoading}
                variant="outlined"
                size="small"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={formLoading}
                size="small"
              >
                {formLoading ? "Saving..." : selectedBank ? "Update" : "Add"}
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={openConfirm}
        onClose={() => {
          setOpenConfirm(false);
          setSelectedBank(null);
        }}
        onConfirm={handleDelete}
        title="Delete Blood Bank"
        message={
          <Box>
            <Typography variant="body1" gutterBottom>
              Are you sure you want to delete this blood bank?
            </Typography>
            <Typography variant="body2" color="error">
              This action cannot be undone. All inventory records will be
              permanently removed.
            </Typography>
            {selectedBank && (
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: "background.default",
                  borderRadius: 1,
                }}
              >
                <Typography variant="subtitle2" gutterBottom>
                  Blood Bank Details:
                </Typography>
                <Typography variant="body2">
                  Name: {selectedBank.name}
                </Typography>
                <Typography variant="body2">
                  Address: {selectedBank.address}
                </Typography>
                <Typography variant="body2">
                  Contact: {selectedBank.contactNumber}
                </Typography>
              </Box>
            )}
          </Box>
        }
      />
    </Box>
  );
};

export default BloodBankManagement;
