import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { useApi } from "../../hooks/useApi";
import { useForm } from "../../hooks/useForm";
import LoadingSpinner from "../common/LoadingSpinner";
import adminService from "../../services/adminService";

const AdminLogin = () => {
  const { login } = useAuth();
  const { handleRequest, loading } = useApi();
  const { values, handleChange, handleSubmit } = useForm({
    username: "",
    password: "",
  });

  const onSubmit = async () => {
    const response = await handleRequest(
      () => adminService.login(values),
      "Login successful"
    );
    login(response, "admin");
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
            Admin Login
          </Typography>
          <LoadingSpinner loading={loading}>
            <Box
              component="form"
              onSubmit={(e) => handleSubmit(e, onSubmit)}
              sx={{ width: "100%" }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                name="username"
                value={values.username}
                onChange={handleChange}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                Sign In
              </Button>
            </Box>
          </LoadingSpinner>
        </Box>
      </Paper>
    </Container>
  );
};

export default AdminLogin;
