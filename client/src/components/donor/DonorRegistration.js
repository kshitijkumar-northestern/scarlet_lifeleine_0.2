import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Grid,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import { useForm } from "../../hooks/useForm";
import LoadingSpinner from "../common/LoadingSpinner";
import donorService from "../../services/donorService";
import { BLOOD_GROUPS } from "../../utils/constants";
import * as yup from "yup";

const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  bloodGroup: yup.string().required("Blood group is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  address: yup.string().required("Address is required"),
});

const DonorRegistration = () => {
  const navigate = useNavigate();
  const { handleRequest, loading } = useApi();

  const { values, errors, handleChange, handleSubmit } = useForm(
    {
      username: "",
      password: "",
      name: "",
      email: "",
      bloodGroup: "",
      phoneNumber: "",
      address: "",
    },
    validationSchema
  );

  const onSubmit = async () => {
    await handleRequest(
      () => donorService.register(values),
      "Registration successful! Please login."
    );
    navigate("/donor/login");
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4, borderRadius: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Donor Registration
          </Typography>
          <LoadingSpinner loading={loading}>
            <Box component="form" onSubmit={(e) => handleSubmit(e, onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Username"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    error={Boolean(errors.username)}
                    helperText={errors.username}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    required
                    fullWidth
                    label="Blood Group"
                    name="bloodGroup"
                    value={values.bloodGroup}
                    onChange={handleChange}
                    error={Boolean(errors.bloodGroup)}
                    helperText={errors.bloodGroup}
                  >
                    {BLOOD_GROUPS.map((group) => (
                      <MenuItem key={group} value={group}>
                        {group.replace("_", " ")}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Phone Number"
                    name="phoneNumber"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    error={Boolean(errors.phoneNumber)}
                    helperText={errors.phoneNumber}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Address"
                    name="address"
                    multiline
                    rows={3}
                    value={values.address}
                    onChange={handleChange}
                    error={Boolean(errors.address)}
                    helperText={errors.address}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
                disabled={loading}
              >
                Register
              </Button>
            </Box>
          </LoadingSpinner>
        </Box>
      </Paper>
    </Container>
  );
};

export default DonorRegistration;
