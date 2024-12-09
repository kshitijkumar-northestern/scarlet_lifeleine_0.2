// src/components/admin/AdminDashboard.js
import React, { useState } from "react";
import { Container, Paper, Tabs, Tab, Box, Typography } from "@mui/material";
import BloodBankManagement from "./BloodBankManagement";
import AppointmentManagement from "./AppointmentManagement";
import { useAuth } from "../../contexts/AuthContext";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { user } = useAuth();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 500 }}>
          Welcome back, {user?.name || "Admin"}
        </Typography>
      </Box>

      <Paper sx={{ width: "100%", mb: 2 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            "& .MuiTab-root": {
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 500,
            },
          }}
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
