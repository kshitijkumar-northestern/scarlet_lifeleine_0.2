// src/styles/theme.js
import { createTheme } from "@mui/material/styles";

export const createAppTheme = (mode) => {
  const themeColors = {
    dark: {
      primary: {
        main: "#FF4B2B",
        light: "#FF6B3D",
        dark: "#E43D1A",
      },
      background: {
        default: "#121212",
        paper: "#1E1E1E",
      },
      text: {
        primary: "#FFFFFF",
        secondary: "#B0B0B0",
      },
    },
    light: {
      primary: {
        main: "#FF4B2B",
        light: "#FF6B3D",
        dark: "#E43D1A",
      },
      background: {
        default: "#FFFFFF",
        paper: "#F5F5F5",
      },
      text: {
        primary: "#2D3748",
        secondary: "#718096",
      },
    },
  };

  return createTheme({
    palette: {
      mode,
      ...(mode === "dark" ? themeColors.dark : themeColors.light),
    },
    typography: {
      fontFamily:
        '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      h1: {
        fontSize: "2.5rem",
        fontWeight: 700,
        letterSpacing: "-0.01562em",
      },
      h2: {
        fontSize: "2rem",
        fontWeight: 700,
        letterSpacing: "-0.00833em",
      },
      h3: {
        fontSize: "1.75rem",
        fontWeight: 600,
        letterSpacing: "0em",
      },
      h4: {
        fontSize: "1.5rem",
        fontWeight: 600,
        letterSpacing: "0.00735em",
      },
      h5: {
        fontSize: "1.25rem",
        fontWeight: 600,
        letterSpacing: "0em",
      },
      h6: {
        fontSize: "1rem",
        fontWeight: 600,
        letterSpacing: "0.0075em",
      },
      button: {
        textTransform: "none",
        fontWeight: 600,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: "10px 24px",
            fontSize: "1rem",
          },
          contained: {
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 8,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow:
              mode === "dark"
                ? "0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow:
              mode === "dark"
                ? "0 1px 3px 0 rgba(0, 0, 0, 0.4)"
                : "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
          },
        },
      },
    },
  });
};
