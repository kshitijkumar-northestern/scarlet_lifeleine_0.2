// src/components/admin/BloodBankManagement.js (continued)
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import DataTable from "../common/DataTable";
import LoadingSpinner from "../common/LoadingSpinner";
import ConfirmDialog from "../common/ConfirmDialog";
import { useApi } from "../../hooks/useApi";
import api from "../../services/api";

const BloodBankForm = ({ open, onClose, bloodBank, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contactNumber: "",
    ...bloodBank,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {bloodBank ? "Edit Blood Bank" : "Add New Blood Bank"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contact Number"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const BloodBankManagement = () => {
  const [bloodBanks, setBloodBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { loading } = useApi();

  const fetchBloodBanks = async () => {
    try {
      const response = await api.get("/bloodbanks");
      setBloodBanks(response.data);
    } catch (error) {
      console.error("Error fetching blood banks:", error);
    }
  };

  useEffect(() => {
    fetchBloodBanks();
  }, []);

  const handleAdd = () => {
    setSelectedBank(null);
    setOpenForm(true);
  };

  const handleEdit = (bank) => {
    setSelectedBank(bank);
    setOpenForm(true);
  };

  const handleDelete = (bank) => {
    setSelectedBank(bank);
    setOpenConfirm(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedBank) {
        await api.put(`/admins/bloodbanks/${selectedBank.id}`, formData);
      } else {
        await api.post("/admins/bloodbanks", formData);
      }
      setOpenForm(false);
      fetchBloodBanks();
    } catch (error) {
      console.error("Error saving blood bank:", error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/admins/bloodbanks/${selectedBank.id}`);
      setOpenConfirm(false);
      fetchBloodBanks();
    } catch (error) {
      console.error("Error deleting blood bank:", error);
    }
  };

  const columns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "address", label: "Address", minWidth: 200 },
    { id: "contactNumber", label: "Contact", minWidth: 130 },
    {
      id: "actions",
      label: "Actions",
      minWidth: 100,
      align: "right",
      render: (_, row) => (
        <Box>
          <IconButton onClick={() => handleEdit(row)} size="small">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(row)} size="small">
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <LoadingSpinner loading={loading}>
      <Box>
        <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Blood Banks</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAdd}
          >
            Add Blood Bank
          </Button>
        </Box>

        <DataTable
          columns={columns}
          data={bloodBanks}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          total={bloodBanks.length}
        />

        <BloodBankForm
          open={openForm}
          onClose={() => setOpenForm(false)}
          bloodBank={selectedBank}
          onSubmit={handleSubmit}
        />

        <ConfirmDialog
          open={openConfirm}
          onClose={() => setOpenConfirm(false)}
          onConfirm={handleConfirmDelete}
          title="Delete Blood Bank"
          message="Are you sure you want to delete this blood bank? This action cannot be undone."
        />
      </Box>
    </LoadingSpinner>
  );
};

export default BloodBankManagement;
