// src/components/common/HomePage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  Favorite,
  People,
  Event,
  Security,
  LocalHospital,
  Timeline,
  EmojiEvents,
  Groups,
  Healing,
  Book,
  HealthAndSafety,
  QuestionAnswer,
  ArrowForward,
} from "@mui/icons-material";
import GlobeComponent from "./GlobeComponent";
import { cn } from "../../lib/utils";

// Card Components
const AppleCard = ({ icon, title, description, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    viewport={{ once: true }}
  >
    <Box
      sx={{
        p: 4,
        height: "100%",
        borderRadius: "20px",
        bgcolor: (theme) =>
          theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, 0.05)"
            : "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(20px)",
        border: (theme) =>
          `1px solid ${
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.05)"
          }`,
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: (theme) =>
            theme.palette.mode === "dark"
              ? "0 20px 40px rgba(0, 0, 0, 0.3)"
              : "0 20px 40px rgba(0, 0, 0, 0.1)",
          bgcolor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.08)"
              : "rgba(255, 255, 255, 0.95)",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
        <Box
          sx={{
            p: 1.5,
            borderRadius: "12px",
            bgcolor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(59, 130, 246, 0.2)"
                : "rgba(59, 130, 246, 0.1)",
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 1,
              fontSize: "1.1rem",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              lineHeight: 1.6,
            }}
          >
            {description}
          </Typography>
        </Box>
      </Box>
    </Box>
  </motion.div>
);

const TestimonialCard = ({ quote, author, location, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    viewport={{ once: true }}
  >
    <Box
      sx={{
        p: 4,
        height: "100%",
        borderRadius: "20px",
        bgcolor: (theme) =>
          theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, 0.05)"
            : "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(20px)",
        border: (theme) =>
          `1px solid ${
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.05)"
          }`,
      }}
    >
      <Typography
        variant="body1"
        sx={{
          mb: 3,
          fontStyle: "italic",
          color: "text.secondary",
          lineHeight: 1.6,
        }}
      >
        "{quote}"
      </Typography>
      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
        {author}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {location}
      </Typography>
    </Box>
  </motion.div>
);

const features = [
  {
    icon: <Favorite sx={{ fontSize: 30, color: "primary.main" }} />,
    title: "Save Lives",
    description:
      "Your blood donation can save up to three lives. Join our mission to make a difference.",
  },
  {
    icon: <People sx={{ fontSize: 30, color: "primary.main" }} />,
    title: "Join Community",
    description:
      "Be part of a caring community dedicated to helping others through blood donation.",
  },
  {
    icon: <Event sx={{ fontSize: 30, color: "primary.main" }} />,
    title: "Easy Scheduling",
    description:
      "Schedule your donations easily and get reminders for your next eligible donation date.",
  },
  {
    icon: <Security sx={{ fontSize: 30, color: "primary.main" }} />,
    title: "Safe & Secure",
    description:
      "All donations are conducted following strict safety protocols and guidelines.",
  },
  {
    icon: <LocalHospital sx={{ fontSize: 30, color: "primary.main" }} />,
    title: "Medical Support",
    description:
      "Expert medical staff available to assist and guide you through the donation process.",
  },
  {
    icon: <Timeline sx={{ fontSize: 30, color: "primary.main" }} />,
    title: "Track Impact",
    description:
      "Monitor your contributions and see the real impact of your donations.",
  },
];

const stats = [
  {
    icon: <EmojiEvents sx={{ fontSize: 30, color: "primary.main" }} />,
    number: "50K+",
    label: "Lives Saved",
  },
  {
    icon: <Groups sx={{ fontSize: 30, color: "primary.main" }} />,
    number: "100+",
    label: "Countries",
  },
  {
    icon: <Healing sx={{ fontSize: 30, color: "primary.main" }} />,
    number: "24/7",
    label: "Support",
  },
];

const testimonials = [
  {
    quote:
      "The blood donation I received saved my life during emergency surgery. I'm forever grateful to the donors who made this possible.",
    author: "Sarah Mitchell",
    location: "Emergency Surgery Recipient",
  },
  {
    quote:
      "Regular blood donation has become a meaningful part of my life. It's amazing to know I'm helping save lives.",
    author: "David Chen",
    location: "Regular Donor, 5+ Years",
  },
  {
    quote:
      "As a medical professional, I see firsthand how critical blood donations are. Every donation counts.",
    author: "Dr. Emily Rodriguez",
    location: "Emergency Room Physician",
  },
];

const resources = [
  {
    icon: <Book sx={{ fontSize: 30, color: "primary.main" }} />,
    title: "Donation Guide",
    description:
      "Everything you need to know about the donation process and preparing for your visit.",
  },
  {
    icon: <HealthAndSafety sx={{ fontSize: 30, color: "primary.main" }} />,
    title: "Safety Standards",
    description:
      "Learn about our rigorous safety protocols and quality standards for blood donation.",
  },
  {
    icon: <QuestionAnswer sx={{ fontSize: 30, color: "primary.main" }} />,
    title: "FAQs",
    description:
      "Find answers to commonly asked questions about blood donation and eligibility.",
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Container
        maxWidth="lg"
        sx={{ pt: { xs: 4, md: 8 }, pb: { xs: 6, md: 10 } }}
      >
        <Grid container spacing={4} alignItems="center">
          {/* Left Content */}
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Box>
                <Typography
                  variant="h1"
                  className={cn(
                    "bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-emerald-500"
                  )}
                  sx={{
                    fontSize: { xs: "2.5rem", md: "4rem" },
                    fontWeight: 700,
                    lineHeight: 1.2,
                    mb: 2,
                  }}
                >
                  Be the Drop That Makes a Life Flow Again
                </Typography>

                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                    color: "text.secondary",
                    mb: 4,
                    maxWidth: "500px",
                  }}
                >
                  Join our global network of donors making a difference in
                  communities worldwide.
                </Typography>

                <Box sx={{ display: "flex", gap: 2, mb: 6 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate("/donor/register")}
                    className={cn(
                      "bg-blue-500 hover:bg-blue-600 transition-all"
                    )}
                    sx={{
                      py: 1.5,
                      px: 4,
                      borderRadius: 2,
                      fontSize: "1rem",
                    }}
                  >
                    Become a Donor
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate("/about")}
                    className={cn(
                      "border-blue-500 text-blue-500 hover:border-blue-600 hover:bg-transparent"
                    )}
                    sx={{
                      py: 1.5,
                      px: 4,
                      borderRadius: 2,
                      fontSize: "1rem",
                    }}
                  >
                    Learn More
                  </Button>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    className={cn("bg-blue-500")}
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                    }}
                  />
                  <Typography sx={{ color: "text.secondary" }}>
                    Over 100,000 donors worldwide
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>

          {/* Globe Section */}
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <Box
                sx={{
                  height: { xs: "400px", md: "600px" },
                  width: "100%",
                  position: "relative",
                }}
              >
                <GlobeComponent />
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {[
              {
                number: "50K+",
                label: "Lives Saved",
              },
              {
                number: "100+",
                label: "Countries",
              },
              {
                number: "24/7",
                label: "Support",
              },
            ].map((stat, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 3,
                    }}
                  >
                    <Typography
                      variant="h2"
                      sx={{
                        fontSize: { xs: "2.5rem", md: "3.5rem" },
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
                        fontSize: "1.1rem",
                        color: "text.secondary",
                        fontWeight: 500,
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(0,0,0,0.3)"
              : "rgba(0,0,0,0.02)",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 700,
              mb: 8,
            }}
          >
            Why Choose Us
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <AppleCard {...feature} delay={index * 0.1} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 700,
              mb: 2,
            }}
          >
            Real Impact, Real Stories
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            sx={{ mb: 8, maxWidth: "800px", mx: "auto" }}
          >
            Hear from people whose lives have been touched by blood donation
          </Typography>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <TestimonialCard {...testimonial} delay={index * 0.2} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Resources Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(0,0,0,0.3)"
              : "rgba(0,0,0,0.02)",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 700,
              mb: 8,
            }}
          >
            Resources & Education
          </Typography>
          <Grid container spacing={4}>
            {resources.map((resource, index) => (
              <Grid item xs={12} md={4} key={index}>
                <AppleCard {...resource} delay={index * 0.2} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Technology Section */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Typography
                  variant="overline"
                  sx={{ color: "primary.main", fontWeight: 600 }}
                >
                  Advanced Technology
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: "2rem", md: "3rem" },
                    fontWeight: 700,
                    mb: 3,
                  }}
                >
                  State-of-the-Art Facilities
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 4, lineHeight: 1.8 }}
                >
                  Our centers are equipped with the latest technology and
                  staffed by experienced professionals to ensure safe and
                  efficient donations.
                </Typography>
                <Button
                  variant="outlined"
                  size="large"
                  endIcon={<ArrowForward />}
                  onClick={() => navigate("/facilities")}
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    px: 3,
                  }}
                >
                  Learn About Our Technology
                </Button>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: "20px",
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(20px)",
                  border: (theme) =>
                    `1px solid ${
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(0, 0, 0, 0.05)"
                    }`,
                }}
              >
                <Box
                  component="img"
                  src="/api/placeholder/600/400"
                  alt="Modern donation facility"
                  sx={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "12px",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Newsletter Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(0,0,0,0.3)"
              : "rgba(0,0,0,0.02)",
        }}
      >
        <Container maxWidth="sm">
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 700,
              mb: 2,
            }}
          >
            Stay Informed
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Subscribe to our newsletter for updates on blood drives, donor
            stories, and community impact.
          </Typography>
          <Box
            component="form"
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <TextField
              fullWidth
              placeholder="Enter your email"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(255, 255, 255, 0.8)",
                },
              }}
            />
            <Button
              variant="contained"
              size="large"
              sx={{
                borderRadius: "12px",
                py: 1.5,
                px: 4,
                minWidth: { sm: "150px" },
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
