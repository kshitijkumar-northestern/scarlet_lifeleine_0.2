import React from "react";
import { Backdrop, CircularProgress, Box } from "@mui/material";

const LoadingSpinner = ({ loading, children }) => {
  if (!loading) return children;

  return (
    <Box position="relative">
      {children}
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          position: "absolute",
          borderRadius: 2,
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default LoadingSpinner;
