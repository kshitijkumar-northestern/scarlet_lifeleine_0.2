import { createTheme } from "@mui/material/styles";

export const createAppTheme = (mode) => {
  // Uber's exact color palette
  const uber = {
    black: "#000000",
    white: "#FFFFFF",
    primary: {
      main: "#000000", // Uber uses black as primary
      light: "#333333",
      dark: "#000000",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#EEEEEE", // Light gray for secondary elements
      light: "#F6F6F6",
      dark: "#DDDDDD",
      contrastText: "#000000",
    },
    gray: {
      50: "#F7F7F7",
      100: "#EEEEEE",
      200: "#E0E0E0",
      300: "#CFCFCF",
      400: "#B8B8B8",
      500: "#999999",
      600: "#666666",
      700: "#444444",
      800: "#2D2D2D",
      900: "#1A1A1A",
    },
  };

  return createTheme({
    palette: {
      mode,
      primary: uber.primary,
      secondary: uber.secondary,
      background: {
        default: mode === "dark" ? uber.black : uber.white,
        paper: mode === "dark" ? uber.gray[800] : uber.white,
      },
      text: {
        primary: mode === "dark" ? uber.white : uber.black,
        secondary: mode === "dark" ? uber.gray[400] : uber.gray[600],
      },
    },
    typography: {
      fontFamily:
        '"UberMove", "Uber Move", -apple-system, BlinkMacSystemFont, Helvetica, sans-serif',
      h1: {
        fontSize: "44px",
        fontWeight: 700,
        letterSpacing: "-0.5px",
      },
      h2: {
        fontSize: "36px",
        fontWeight: 700,
        letterSpacing: "-0.5px",
      },
      h3: {
        fontSize: "28px",
        fontWeight: 700,
        letterSpacing: "-0.3px",
      },
      h4: {
        fontSize: "24px",
        fontWeight: 500,
        letterSpacing: "-0.2px",
      },
      h5: {
        fontSize: "20px",
        fontWeight: 500,
        letterSpacing: "-0.2px",
      },
      h6: {
        fontSize: "16px",
        fontWeight: 500,
        letterSpacing: "-0.2px",
      },
      body1: {
        fontSize: "16px",
        lineHeight: 1.5,
        letterSpacing: "-0.1px",
      },
      body2: {
        fontSize: "14px",
        lineHeight: 1.5,
        letterSpacing: "-0.1px",
      },
      button: {
        textTransform: "none",
        fontWeight: 500,
        fontSize: "16px",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 4,
            padding: "12px 24px",
            textTransform: "none",
            fontSize: "16px",
            fontWeight: 500,
            letterSpacing: "-0.1px",
          },
          contained: {
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
              backgroundColor:
                mode === "dark" ? uber.gray[800] : uber.gray[100],
            },
          },
          containedPrimary: {
            backgroundColor: uber.black,
            color: uber.white,
            "&:hover": {
              backgroundColor: uber.gray[800],
            },
          },
          outlined: {
            borderWidth: 1,
            padding: "11px 23px",
            "&:hover": {
              borderWidth: 1,
              backgroundColor: "transparent",
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 4,
              "& fieldset": {
                borderColor: mode === "dark" ? uber.gray[600] : uber.gray[300],
                borderWidth: 1,
              },
              "&:hover fieldset": {
                borderColor: mode === "dark" ? uber.gray[500] : uber.gray[400],
              },
              "&.Mui-focused fieldset": {
                borderColor: uber.black,
                borderWidth: 1,
              },
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 4,
            boxShadow: "none",
            border: `1px solid ${
              mode === "dark" ? uber.gray[700] : uber.gray[200]
            }`,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "dark" ? uber.black : uber.white,
            boxShadow: "none",
            borderBottom: `1px solid ${
              mode === "dark" ? uber.gray[800] : uber.gray[200]
            }`,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: mode === "dark" ? uber.black : uber.white,
            borderRight: `1px solid ${
              mode === "dark" ? uber.gray[800] : uber.gray[200]
            }`,
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: mode === "dark" ? uber.gray[800] : uber.gray[200],
          },
        },
      },
    },
  });
};
