// src/components/admin/AdminDashboard.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";
import { LocalHospital, People, EventNote } from "@mui/icons-material";
import BloodBankManagement from "./BloodBankManagement";
import AppointmentManagement from "./AppointmentManagement";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../services/api";

const DashboardCard = ({ title, value, icon, color }) => (
  <Card sx={{ height: "100%" }}>
    <CardContent>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Box
            sx={{
              backgroundColor: `${color}20`,
              borderRadius: 2,
              p: 1,
              display: "flex",
            }}
          >
            {icon}
          </Box>
        </Grid>
        <Grid item xs>
          <Typography color="textSecondary" variant="subtitle2">
            {title}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {value}
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { user } = useAuth();
  const [dashboardStats, setDashboardStats] = useState({
    bloodBanks: 0,
    donors: 0,
    pendingAppointments: 0,
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await api.get("/admins/dashboard/stats");
        setDashboardStats(response.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome back, {user.name}
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard
            title="Total Blood Banks"
            value={dashboardStats.bloodBanks}
            icon={<LocalHospital sx={{ color: "#2196f3" }} />}
            color="#2196f3"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard
            title="Registered Donors"
            value={dashboardStats.donors}
            icon={<People sx={{ color: "#4caf50" }} />}
            color="#4caf50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard
            title="Pending Appointments"
            value={dashboardStats.pendingAppointments}
            icon={<EventNote sx={{ color: "#ff9800" }} />}
            color="#ff9800"
          />
        </Grid>
      </Grid>

      <Paper sx={{ width: "100%", mb: 2 }}>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tab label="Blood Banks" />
          <Tab label="Appointments" />
        </Tabs>
      </Paper>

      <Box sx={{ mt: 3 }}>
        {activeTab === 0 && <BloodBankManagement />}
        {activeTab === 1 && <AppointmentManagement />}
      </Box>
    </Container>
  );
};

export default AdminDashboard;
