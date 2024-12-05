// src/styles/theme.js
import { createTheme, alpha } from "@mui/material/styles";

export const createAppTheme = (mode) => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: "#E53935",
        light: "#FF6F60",
        dark: "#AB000D",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#2196F3",
        light: "#6EC6FF",
        dark: "#0069C0",
        contrastText: "#ffffff",
      },
      background: {
        default: mode === "dark" ? "#121212" : "#f5f5f5",
        paper: mode === "dark" ? "#1E1E1E" : "#ffffff",
      },
    },
    typography: {
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      h1: {
        fontSize: "2.5rem",
        fontWeight: 600,
      },
      h2: {
        fontSize: "2rem",
        fontWeight: 600,
      },
      h3: {
        fontSize: "1.75rem",
        fontWeight: 600,
      },
      h4: {
        fontSize: "1.5rem",
        fontWeight: 600,
      },
      h5: {
        fontSize: "1.25rem",
        fontWeight: 600,
      },
      h6: {
        fontSize: "1rem",
        fontWeight: 600,
      },
      button: {
        textTransform: "none",
        fontWeight: 500,
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            background:
              mode === "dark" ? alpha("#1E1E1E", 0.8) : alpha("#ffffff", 0.8),
            backdropFilter: "blur(10px)",
            boxShadow: "none",
            borderBottom: `1px solid ${mode === "dark" ? "#333" : "#eee"}`,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: "none",
          },
        },
      },
    },
  });
};
