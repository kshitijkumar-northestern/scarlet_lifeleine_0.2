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
      icon: <Mail sx={{ fontSize: 24, color: "primary.main" }} />,
      title: "Email",
      content: "support@scarletlifeline.com",
    },
    {
      icon: <Phone sx={{ fontSize: 24, color: "primary.main" }} />,
      title: "Phone",
      content: "+1 (555) 123-4567",
    },
    {
      icon: <LocationOn sx={{ fontSize: 24, color: "primary.main" }} />,
      title: "Address",
      content: "123 Health Avenue, New York",
    },
  ];

  const faqs = [
    {
      question: "How often can I donate blood?",
      answer:
        "Most people can donate whole blood every 8 weeks. The exact interval may vary based on your donation type and health status.",
    },
    {
      question: "What are the eligibility requirements?",
      answer:
        "Generally, you must be at least 17 years old, weigh at least 110 pounds, and be in good health. Some medical conditions or recent travel may affect eligibility.",
    },
    {
      question: "How long does it take?",
      answer:
        "The actual blood donation takes about 8-10 minutes. However, the entire process, including registration and health screening, typically takes about an hour.",
    },
    {
      question: "Is blood donation safe?",
      answer:
        "Yes, blood donation is very safe. We use sterile, disposable equipment for each donation, and all donors undergo health screening before donation.",
    },
  ];

  return (
    <Box sx={{ bgcolor: "background.default", pb: 8 }}>
      {/* Hero Section */}
      <Box
        sx={{
          pt: { xs: 8, md: 12 },
          pb: { xs: 6, md: 8 },
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 700,
              mb: 2,
            }}
          >
            Contact Us
          </Typography>
          <Typography
            variant="h4"
            color="text.secondary"
            sx={{
              fontSize: { xs: "1.25rem", md: "1.5rem" },
              maxWidth: "800px",
            }}
          >
            Have questions? We're here to help.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Contact Info */}
        <Box sx={{ mt: 6, mb: 8 }}>
          <Grid container spacing={4}>
            {contactInfo.map((info, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 2,
                    }}
                  >
                    {info.icon}
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ mb: 0.5, fontWeight: 600 }}
                      >
                        {info.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {info.content}
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Form and FAQs */}
        <Grid container spacing={8}>
          {/* Contact Form */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ mb: 4, fontWeight: 600 }}>
              Send us a message
            </Typography>
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
                    size="large"
                    sx={{
                      height: 48,
                      px: 6,
                    }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>

          {/* FAQs */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ mb: 4, fontWeight: 600 }}>
              Frequently Asked Questions
            </Typography>
            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                elevation={0}
                sx={{
                  "&:before": { display: "none" },
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary">{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactPage;
