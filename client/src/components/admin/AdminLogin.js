// src/components/admin/AdminLogin.js
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  CircularProgress,
  alpha,
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { useAlert } from "../../contexts/AlertContext";
import { useTheme } from "@mui/material/styles";

const AdminLogin = () => {
  const { login } = useAuth();
  const { showAlert } = useAlert();
  const theme = useTheme();
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
      await login(formData, "admin");
      showAlert("Login successful", "success");
    } catch (error) {
      showAlert(error.response?.data?.message || "Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        // minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundColor: theme.palette.background.default,
        padding: "24px",
        pt: { xs: 8, sm: 12 },
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: 440,
            p: { xs: 3, sm: 4 },
            borderRadius: "20px",
            backgroundColor:
              theme.palette.mode === "dark"
                ? alpha("#1C1C1E", 0.7)
                : alpha("#FFFFFF", 0.7),
            backdropFilter: "blur(10px)",
            border: `1px solid ${
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)"
            }`,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              sx={{
                mb: 3,
                fontWeight: 600,
                letterSpacing: "-0.02em",
                textAlign: "center",
                color: theme.palette.text.primary,
              }}
            >
              Welcome Back
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: 4,
                color: theme.palette.text.secondary,
                textAlign: "center",
              }}
            >
              Sign in to access your admin dashboard
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                width: "100%",
              }}
            >
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
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? alpha("#FFFFFF", 0.05)
                        : alpha("#000000", 0.05),
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? alpha("#FFFFFF", 0.08)
                          : alpha("#000000", 0.08),
                    },
                  },
                }}
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
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? alpha("#FFFFFF", 0.05)
                        : alpha("#000000", 0.05),
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? alpha("#FFFFFF", 0.08)
                          : alpha("#000000", 0.08),
                    },
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 2,
                  py: 1.5,
                  fontSize: "16px",
                  fontWeight: 600,
                  borderRadius: "12px",
                  textTransform: "none",
                  backgroundColor: theme.palette.primary.main,
                  height: "48px",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
              >
                {loading ? (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CircularProgress
                      size={20}
                      color="inherit"
                      sx={{ mr: 1 }}
                    />
                    Signing in...
                  </Box>
                ) : (
                  "Sign In"
                )}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminLogin;
