// src/components/donor/DonorRegistration.js
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
  alpha,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import { useForm } from "../../hooks/useForm";
import LoadingSpinner from "../common/LoadingSpinner";
import donorService from "../../services/donorService";
import { BLOOD_GROUPS } from "../../utils/constants";
import * as yup from "yup";
import { useTheme } from "@mui/material/styles";

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
  const theme = useTheme();
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

  const textFieldStyle = {
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
      "&.Mui-focused": {
        backgroundColor:
          theme.palette.mode === "dark"
            ? alpha("#FFFFFF", 0.08)
            : alpha("#000000", 0.08),
      },
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
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
            width: { xs: "100%", sm: 600 },
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
                mb: 4,
                fontWeight: 600,
                letterSpacing: "-0.02em",
                textAlign: "center",
                color: theme.palette.text.primary,
              }}
            >
              Donor Registration
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: 4,
                color: theme.palette.text.secondary,
                textAlign: "center",
              }}
            >
              Please fill in your details to register as a donor
            </Typography>

            <LoadingSpinner loading={loading}>
              <Box
                component="form"
                onSubmit={(e) => handleSubmit(e, onSubmit)}
                sx={{ width: "100%" }}
              >
                <Grid container spacing={3}>
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
                      sx={textFieldStyle}
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
                      sx={textFieldStyle}
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
                      sx={textFieldStyle}
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
                      sx={textFieldStyle}
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
                      sx={textFieldStyle}
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
                      sx={textFieldStyle}
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
                      sx={textFieldStyle}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{
                    mt: 4,
                    py: 1.5,
                    fontSize: "16px",
                    fontWeight: 600,
                    borderRadius: "12px",
                    textTransform: "none",
                    backgroundColor: theme.palette.primary.main,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
                    },
                  }}
                >
                  Register as Donor
                </Button>
              </Box>
            </LoadingSpinner>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default DonorRegistration;
