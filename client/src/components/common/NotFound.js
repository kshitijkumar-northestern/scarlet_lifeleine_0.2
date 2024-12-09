//src/components/common/NotFound.js
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
        textAlign: "center",
      }}
    >
      <Typography variant="h1" sx={{ fontSize: "6rem", fontWeight: "bold" }}>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Page Not Found
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        Return to Home
      </Button>
    </Box>
  );
};

export default NotFound;
