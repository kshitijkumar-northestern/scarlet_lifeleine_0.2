// src/components/common/AboutPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Typography, Grid, Button } from "@mui/material";
import { Card, CardContent } from "@mui/material";

import { motion } from "framer-motion";
import { Security, People, Timeline } from "@mui/icons-material";

const AboutPage = () => {
  const navigate = useNavigate();
  const impactStats = [
    { number: "10K+", label: "Successful Donations" },
    { number: "50+", label: "Hospital Partners" },
    { number: "24/7", label: "Emergency Response" },
    { number: "100%", label: "Nationwide Coverage" },
  ];

  return (
    <Box sx={{ bgcolor: "background.default" }}>
      {/* Hero Section */}
      <Container
        maxWidth="lg"
        sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 6, md: 10 } }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", md: "4rem" },
              fontWeight: 700,
              lineHeight: 1.2,
              mb: 2,
              color: "text.primary",
            }}
          >
            About Scarlet Lifeline
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: "1.25rem", md: "1.5rem" },
              color: "text.secondary",
              mb: 8,
              maxWidth: "800px",
            }}
          >
            Making a difference one donation at a time
          </Typography>
        </motion.div>

        {/* Main Content */}
        <Grid container spacing={8} sx={{ mb: 12 }}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: "1.125rem",
                  lineHeight: 1.8,
                  mb: 4,
                  color: "text.secondary",
                }}
              >
                Scarlet Lifeline is dedicated to connecting blood donors with
                those in need. Our mission is to ensure that every patient has
                access to safe, quality-assured blood products.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "1.125rem",
                  lineHeight: 1.8,
                  color: "text.secondary",
                }}
              >
                Founded with a vision to revolutionize blood donation through
                technology, we've built a platform that makes it easier than
                ever for donors to save lives.
              </Typography>
            </motion.div>
          </Grid>

          {/* Impact Stats */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={4}>
              {impactStats.map((stat, index) => (
                <Grid item xs={6} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    <Typography
                      variant="h2"
                      sx={{
                        fontSize: { xs: "2rem", md: "2.5rem" },
                        fontWeight: 700,
                        color: "primary.main",
                        mb: 1,
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "1rem",
                        color: "text.secondary",
                        fontWeight: 500,
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/* Values Section */}
        <Box sx={{ mb: 12 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 700,
              mb: 8,
              textAlign: "center",
            }}
          >
            Our Values
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                icon: <Security sx={{ fontSize: 40, color: "primary.main" }} />,
                title: "Safety First",
                description:
                  "We maintain the highest standards of safety and quality in all our processes.",
              },

              {
                icon: <People sx={{ fontSize: 40, color: "primary.main" }} />,
                title: "Community Focus",
                description:
                  "Building strong relationships within communities.",
              },
              {
                icon: <Timeline sx={{ fontSize: 40, color: "primary.main" }} />,
                title: "Innovation",
                description:
                  "Leveraging technology to make blood donation more accessible and efficient.",
              },
            ].map((value, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      backgroundColor: "background.paper",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: (theme) => theme.shadows[8],
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4, textAlign: "center" }}>
                      <Box sx={{ mb: 2 }}>{value.icon}</Box>
                      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                        {value.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {value.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
        {/* Timeline Section */}
        <Box sx={{ mb: 12 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 700,
              mb: 8,
              textAlign: "center",
            }}
          >
            Our Journey
          </Typography>
          <Box sx={{ maxWidth: "800px", mx: "auto" }}>
            {[
              {
                year: "2020",
                title: "Foundation",
                description:
                  "Scarlet Lifeline was established with a vision to revolutionize blood donation.",
              },
              {
                year: "2021",
                title: "Technology Integration",
                description:
                  "Launched our digital platform to connect donors with those in need.",
              },
              {
                year: "2022",
                title: "Network Expansion",
                description:
                  "Expanded our network to cover major cities across the country.",
              },
              {
                year: "2023",
                title: "Innovation & Growth",
                description:
                  "Introduced new features and partnerships to enhance donor experience.",
              },
            ].map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Box sx={{ mb: 6, display: "flex", gap: 4 }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "primary.main",
                      width: "100px",
                    }}
                  >
                    {milestone.year}
                  </Typography>
                  <Box>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {milestone.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {milestone.description}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Box>

        {/* Call to Action */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "1.75rem", md: "2.5rem" },
              fontWeight: 600,
              mb: 3,
            }}
          >
            Join Our Mission
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              mb: 4,
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Become part of our journey to make quality blood donation accessible
            to all.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/donor/register")}
            sx={{
              py: 2,
              px: 6,
              borderRadius: 2,
              fontSize: "1.1rem",
            }}
          >
            Become a Donor
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutPage;
