//src/styles/globalStyles.js
import { alpha } from "@mui/material/styles";

export const globalStyles = {
  ".page-container": {
    minHeight: "calc(100vh - 64px)",
    padding: "24px",
    backgroundColor: "#f5f5f5",
  },
  ".card-hover": {
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-4px)",
    },
  },
  ".glass-effect": {
    backgroundColor: alpha("#ffffff", 0.8),
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
  },
};
