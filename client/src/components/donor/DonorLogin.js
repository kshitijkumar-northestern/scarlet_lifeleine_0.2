import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Container,
  Paper,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useApi } from "../../hooks/useApi";
import { useForm } from "../../hooks/useForm";
import LoadingSpinner from "../common/LoadingSpinner";
import donorService from "../../services/donorService";

const DonorLogin = () => {
  const { login } = useAuth();
  const { handleRequest, loading } = useApi();
  const { values, handleChange, handleSubmit } = useForm({
    username: "",
    password: "",
  });

  const onSubmit = async () => {
    const response = await handleRequest(
      () => donorService.login(values),
      "Login successful"
    );
    login(response, "donor");
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
              <Box sx={{ textAlign: "center" }}>
                <Link
                  component={RouterLink}
                  to="/donor/register"
                  variant="body2"
                >
                  Don't have an account? Register here
                </Link>
              </Box>
            </Box>
          </LoadingSpinner>
        </Box>
      </Paper>
    </Container>
  );
};

export default DonorLogin;
