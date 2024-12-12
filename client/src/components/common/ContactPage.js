// src/components/common/ContactPage.js
import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { Mail, Phone, LocationOn } from "@mui/icons-material";

const ContactPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  };

  return (
    <Box>
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Typography variant="h1" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="h4" sx={{ mb: 6, color: "text.secondary" }}>
          We're here to help and answer any questions you might have
        </Typography>

        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Card
              elevation={0}
              sx={(theme) => ({
                height: "100%",
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "background.paper"
                    : "background.default",
              })}
            >
              <CardContent sx={{ p: 4 }}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Name"
                        required
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        required
                        type="email"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Message"
                        required
                        multiline
                        rows={4}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <Card
                elevation={0}
                sx={(theme) => ({
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "background.paper"
                      : "background.default",
                })}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    <Mail sx={{ fontSize: 24 }} />
                    <Typography variant="h3">Email</Typography>
                  </Box>
                  <Typography variant="body1">
                    support@scarletlifeline.com
                  </Typography>
                </CardContent>
              </Card>

              <Card
                elevation={0}
                sx={(theme) => ({
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "background.paper"
                      : "background.default",
                })}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    <Phone sx={{ fontSize: 24 }} />
                    <Typography variant="h3">Phone</Typography>
                  </Box>
                  <Typography variant="body1">+1 (555) 123-4567</Typography>
                </CardContent>
              </Card>

              <Card
                elevation={0}
                sx={(theme) => ({
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "background.paper"
                      : "background.default",
                })}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    <LocationOn sx={{ fontSize: 24 }} />
                    <Typography variant="h3">Address</Typography>
                  </Box>
                  <Typography variant="body1">
                    123 Health Avenue
                    <br />
                    Medical District
                    <br />
                    New York, NY 10001
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactPage;
