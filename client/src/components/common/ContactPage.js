// src/components/common/ContactPage.js
import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { Mail, Phone, LocationOn, ExpandMore } from "@mui/icons-material";
import { motion } from "framer-motion";

const ContactPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const contactInfo = [
    {
      icon: <Mail sx={{ fontSize: 30, color: "primary.main" }} />,
      title: "Email Us",
      content: "support@scarletlifeline.com",
      description: "We aim to respond within 24 hours",
    },
    {
      icon: <Phone sx={{ fontSize: 30, color: "primary.main" }} />,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      description: "Monday to Friday, 9am to 6pm",
    },
    {
      icon: <LocationOn sx={{ fontSize: 30, color: "primary.main" }} />,
      title: "Visit Us",
      content: "123 Health Avenue, Medical District",
      description: "New York, NY 10001",
    },
  ];

  const faqs = [
    {
      question: "How often can I donate blood?",
      answer:
        "Most people can donate whole blood every 8 weeks. The exact interval may vary based on your donation type and health status.",
    },
    {
      question: "What are the eligibility requirements for blood donation?",
      answer:
        "Generally, you must be at least 17 years old, weigh at least 110 pounds, and be in good health. Some medical conditions or recent travel may affect eligibility.",
    },
    {
      question: "How long does the donation process take?",
      answer:
        "The actual blood donation takes about 8-10 minutes. However, the entire process, including registration and health screening, typically takes about an hour.",
    },
    {
      question: "Is blood donation safe?",
      answer:
        "Yes, blood donation is very safe. We use sterile, disposable equipment for each donation, and all donors undergo health screening before donation.",
    },
    {
      question: "What should I do before donating blood?",
      answer:
        "Get plenty of sleep, eat a healthy meal, and drink extra fluids before donating. Avoid fatty foods and alcohol for 24 hours before donation.",
    },
  ];

  return (
    <Box sx={{ bgcolor: "background.default" }}>
      {/* Hero Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "background.paper" : "grey.50",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            {/* Contact Info Cards */}
            {contactInfo.map((info, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Box
                    sx={{
                      p: 4,
                      height: "100%",
                      borderRadius: 2,
                      bgcolor: "background.paper",
                      border: "1px solid",
                      borderColor: "divider",
                      transition: "transform 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                      },
                    }}
                  >
                    {info.icon}
                    <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                      {info.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="primary.main"
                      sx={{ mb: 1 }}
                    >
                      {info.content}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {info.description}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={8}>
          {/* Contact Form */}
          <Grid item xs={12} md={6}>
            <Typography variant="h3" sx={{ mb: 4, fontWeight: 600 }}>
              Send us a message
            </Typography>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Name"
                      required
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          bgcolor: "background.paper",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      required
                      type="email"
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          bgcolor: "background.paper",
                        },
                      }}
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
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          bgcolor: "background.paper",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      sx={{
                        py: 1.5,
                        px: 4,
                        borderRadius: 2,
                        width: "100%",
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </motion.div>
          </Grid>

          {/* FAQs */}
          <Grid item xs={12} md={6}>
            <Typography variant="h3" sx={{ mb: 4, fontWeight: 600 }}>
              Frequently Asked Questions
            </Typography>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {faqs.map((faq, index) => (
                  <Accordion
                    key={index}
                    elevation={0}
                    sx={{
                      border: "1px solid",
                      borderColor: "divider",
                      "&:before": { display: "none" },
                      borderRadius: "8px !important",
                      mb: 1,
                      overflow: "hidden",
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      sx={{
                        "& .MuiAccordionSummary-content": {
                          my: 2,
                        },
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {faq.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body1" color="text.secondary">
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactPage;
