// src/components/common/AboutPage.js
import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

const AboutPage = () => {
  return (
    <Box>
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Typography variant="h1" gutterBottom>
          About Scarlet Lifeline
        </Typography>
        <Typography variant="h4" sx={{ mb: 6, color: "text.secondary" }}>
          Making a difference one donation at a time
        </Typography>

        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" paragraph>
              Scarlet Lifeline is dedicated to connecting blood donors with
              those in need. Our mission is to ensure that every patient has
              access to safe, quality-assured blood products.
            </Typography>
            <Typography variant="body1" paragraph>
              Founded with a vision to revolutionize blood donation through
              technology, we've built a platform that makes it easier than ever
              for donors to save lives.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              elevation={0}
              sx={(theme) => ({
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "background.paper"
                    : "background.default",
                p: 3,
              })}
            >
              <CardContent>
                <Typography variant="h3" gutterBottom>
                  Our Impact
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Typography variant="body1">
                    • Over 10,000 successful donations
                  </Typography>
                  <Typography variant="body1">
                    • Partnership with 50+ hospitals
                  </Typography>
                  <Typography variant="body1">
                    • 24/7 emergency response team
                  </Typography>
                  <Typography variant="body1">
                    • Nationwide network of donors
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutPage;
