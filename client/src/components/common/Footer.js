// src/components/common/Footer.js
import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Link,
} from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  const footerLinks = {
    About: [
      { title: "Our Mission", path: "/about" },
      { title: "Team", path: "/team" },
      { title: "Careers", path: "/careers" },
      { title: "Impact", path: "/impact" },
    ],
    "For Donors": [
      { title: "How to Donate", path: "/how-to-donate" },
      { title: "Find Location", path: "/locations" },
      { title: "Eligibility", path: "/eligibility" },
      { title: "FAQs", path: "/faqs" },
    ],
    Resources: [
      { title: "Blog", path: "/blog" },
      { title: "News", path: "/news" },
      { title: "Research", path: "/research" },
      { title: "Privacy Policy", path: "/privacy" },
    ],
    Contact: [
      { title: "Support", path: "/contact" },
      { title: "Emergency", path: "/emergency" },
      { title: "Partner With Us", path: "/partners" },
      { title: "Feedback", path: "/feedback" },
    ],
  };

  const socialMedia = [
    { icon: <Facebook />, url: "https://facebook.com" },
    { icon: <Twitter />, url: "https://twitter.com" },
    { icon: <Instagram />, url: "https://instagram.com" },
    { icon: <LinkedIn />, url: "https://linkedin.com" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
        pt: { xs: 6, md: 8 },
        pb: { xs: 6, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        {/* Main Footer Content */}
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                Scarlet Lifeline
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Making a difference in communities worldwide through blood
                donation.
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                {socialMedia.map((social, index) => (
                  <IconButton
                    key={index}
                    component="a"
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: "text.secondary",
                      "&:hover": {
                        color: "primary.main",
                      },
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <Grid item xs={6} sm={3} md={2} key={category}>
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 700 }}>
                {category}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {links.map((link, index) => (
                  <Link
                    key={index}
                    component={RouterLink}
                    to={link.path}
                    sx={{
                      color: "text.secondary",
                      textDecoration: "none",
                      fontSize: "0.875rem",
                      "&:hover": {
                        color: "primary.main",
                      },
                    }}
                  >
                    {link.title}
                  </Link>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Bottom Section */}
        <Box
          sx={{
            mt: 8,
            pt: 3,
            borderTop: "1px solid",
            borderColor: "divider",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "center", sm: "flex-start" },
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Scarlet Lifeline. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Link
              component={RouterLink}
              to="/terms"
              sx={{
                color: "text.secondary",
                textDecoration: "none",
                fontSize: "0.875rem",
                "&:hover": { color: "primary.main" },
              }}
            >
              Terms of Service
            </Link>
            <Link
              component={RouterLink}
              to="/privacy"
              sx={{
                color: "text.secondary",
                textDecoration: "none",
                fontSize: "0.875rem",
                "&:hover": { color: "primary.main" },
              }}
            >
              Privacy Policy
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
