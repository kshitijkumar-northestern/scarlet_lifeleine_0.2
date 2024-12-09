// src/components/donor/DonorLogin.js
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Container,
  Paper,
  CircularProgress,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useAlert } from "../../contexts/AlertContext";

const DonorLogin = () => {
  const { login } = useAuth();
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData, "donor");
      showAlert("Login successful", "success");
    } catch (error) {
      showAlert(error.response?.data?.message || "Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4, borderRadius: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Donor Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              autoFocus
              disabled={loading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
              startIcon={
                loading && <CircularProgress size={20} color="inherit" />
              }
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
            <Box sx={{ textAlign: "center" }}>
              <Link component={RouterLink} to="/donor/register" variant="body2">
                Don't have an account? Register here
              </Link>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default DonorLogin;
