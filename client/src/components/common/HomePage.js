// src/components/common/HomePage.js
import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Favorite, People, Event } from "@mui/icons-material";

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Favorite sx={{ fontSize: 32 }} />,
      title: "Save Lives",
      description:
        "Your blood donation can save up to three lives. Join our mission to make a difference.",
    },
    {
      icon: <People sx={{ fontSize: 32 }} />,
      title: "Join Community",
      description:
        "Be part of a caring community dedicated to helping others through blood donation.",
    },
    {
      icon: <Event sx={{ fontSize: 32 }} />,
      title: "Easy Scheduling",
      description:
        "Schedule your donations easily and get reminders for your next eligible donation date.",
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={(theme) => ({
          backgroundColor:
            theme.palette.mode === "dark"
              ? "background.paper"
              : "background.default",
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 12 },
        })}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h1" gutterBottom>
                Give the Gift of Life
              </Typography>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ mb: 4, color: "text.secondary" }}
              >
                Join Scarlet Lifeline's mission to save lives through blood
                donation
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => navigate("/donor/register")}
                >
                  Become a Donor
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  onClick={() => navigate("/donor/login")}
                >
                  Sign In
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                elevation={0}
                sx={(theme) => ({
                  height: "100%",
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "background.paper"
                      : "background.default",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                  },
                })}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ color: "primary.main", mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
