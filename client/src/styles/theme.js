// src/styles/theme.js
import { createTheme, alpha } from "@mui/material/styles";

const themeColors = {
  dark: {
    primary: {
      main: "#0A84FF",
      light: "#5E9EFF",
      dark: "#0066CC",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#32D74B",
      light: "#66E87A",
      dark: "#28B03B",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#FF453A",
      light: "#FF6961",
      dark: "#CC372E",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#FF9F0A",
      light: "#FFB340",
      dark: "#CC7F08",
      contrastText: "#FFFFFF",
    },
    info: {
      main: "#64D2FF",
      light: "#8FDFFF",
      dark: "#50A8CC",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#32D74B",
      light: "#66E87A",
      dark: "#28B03B",
      contrastText: "#FFFFFF",
    },
    grey: {
      50: "#F2F2F7",
      100: "#E5E5EA",
      200: "#D1D1D6",
      300: "#C7C7CC",
      400: "#AEAEB2",
      500: "#8E8E93",
      600: "#636366",
      700: "#48484A",
      800: "#3A3A3C",
      900: "#2C2C2E",
    },
    background: {
      default: "#000000",
      paper: "#1C1C1E",
      elevated: "#2C2C2E",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
    },
    divider: "rgba(255, 255, 255, 0.12)",
    action: {
      active: "rgba(255, 255, 255, 0.7)",
      hover: "rgba(255, 255, 255, 0.08)",
      selected: "rgba(255, 255, 255, 0.16)",
      disabled: "rgba(255, 255, 255, 0.3)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
      focus: "rgba(255, 255, 255, 0.12)",
    },
  },
  light: {
    primary: {
      main: "#007AFF",
      light: "#47A1FF",
      dark: "#0056B3",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#34C759",
      light: "#65D882",
      dark: "#248A3D",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#FF3B30",
      light: "#FF6961",
      dark: "#CC2F26",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#FF9500",
      light: "#FFB340",
      dark: "#CC7600",
      contrastText: "#FFFFFF",
    },
    info: {
      main: "#5856D6",
      light: "#7A79E2",
      dark: "#4644AB",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#34C759",
      light: "#65D882",
      dark: "#248A3D",
      contrastText: "#FFFFFF",
    },
    grey: {
      50: "#F2F2F7",
      100: "#E5E5EA",
      200: "#D1D1D6",
      300: "#C7C7CC",
      400: "#AEAEB2",
      500: "#8E8E93",
      600: "#636366",
      700: "#48484A",
      800: "#3A3A3C",
      900: "#2C2C2E",
    },
    background: {
      default: "#F2F2F7",
      paper: "#FFFFFF",
      elevated: "#FFFFFF",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.6)",
      disabled: "rgba(0, 0, 0, 0.38)",
    },
    divider: "rgba(0, 0, 0, 0.12)",
    action: {
      active: "rgba(0, 0, 0, 0.54)",
      hover: "rgba(0, 0, 0, 0.04)",
      selected: "rgba(0, 0, 0, 0.08)",
      disabled: "rgba(0, 0, 0, 0.26)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
      focus: "rgba(0, 0, 0, 0.12)",
    },
  },
};

export const createAppTheme = (mode) => {
  return createTheme({
    palette: {
      mode,
      ...(mode === "dark" ? themeColors.dark : themeColors.light),
    },
    typography: {
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, Roboto, sans-serif',
      h1: {
        fontSize: "34px",
        fontWeight: 700,
        letterSpacing: "-0.03em",
        lineHeight: 1.2,
      },
      h2: {
        fontSize: "28px",
        fontWeight: 600,
        letterSpacing: "-0.02em",
        lineHeight: 1.3,
      },
      h3: {
        fontSize: "22px",
        fontWeight: 600,
        letterSpacing: "-0.02em",
        lineHeight: 1.3,
      },
      h4: {
        fontSize: "20px",
        fontWeight: 600,
        letterSpacing: "-0.01em",
        lineHeight: 1.4,
      },
      h5: {
        fontSize: "17px",
        fontWeight: 600,
        letterSpacing: "-0.01em",
        lineHeight: 1.4,
      },
      h6: {
        fontSize: "15px",
        fontWeight: 600,
        letterSpacing: "-0.01em",
        lineHeight: 1.4,
      },
      body1: {
        fontSize: "17px",
        letterSpacing: "-0.01em",
        lineHeight: 1.5,
      },
      body2: {
        fontSize: "15px",
        letterSpacing: "-0.01em",
        lineHeight: 1.5,
      },
      button: {
        textTransform: "none",
        fontWeight: 600,
        letterSpacing: "-0.01em",
      },
      caption: {
        fontSize: "13px",
        letterSpacing: "-0.01em",
        lineHeight: 1.4,
      },
      overline: {
        fontSize: "11px",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        lineHeight: 1.4,
        fontWeight: 600,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: "8px 16px",
            fontSize: "15px",
            fontWeight: 600,
            textTransform: "none",
            transition: "all 0.2s ease-in-out",
          },
          contained: {
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
              transform: "translateY(-1px)",
            },
          },
          outlined: {
            borderWidth: 2,
            "&:hover": {
              borderWidth: 2,
            },
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          root: {
            "& .MuiBackdrop-root": {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          },
          paper: ({ theme }) => ({
            backgroundColor:
              theme.palette.mode === "dark" ? "#1C1C1E" : "#FFFFFF",
            border: "none",
            "& .MuiListItemButton-root, & .MuiButton-root": {
              margin: "4px 8px",
              borderRadius: "8px",
              border: "none",
              boxShadow: "none",
              padding: "8px 16px",
              justifyContent: "flex-start",
              width: "auto",
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.05)",
                border: "none",
                boxShadow: "none",
              },
              "&.Mui-selected": {
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? alpha(theme.palette.primary.main, 0.2)
                    : alpha(theme.palette.primary.main, 0.1),
                border: "none",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? alpha(theme.palette.primary.main, 0.3)
                      : alpha(theme.palette.primary.main, 0.15),
                  border: "none",
                  boxShadow: "none",
                },
              },
            },
            "& .MuiButton-root": {
              fontSize: "14px",
              fontWeight: 500,
              color: theme.palette.mode === "dark" ? "#FFFFFF" : "#000000",
              textTransform: "none",
              "& .MuiButton-startIcon": {
                marginRight: "16px",
                marginLeft: 0,
                color: theme.palette.mode === "dark" ? "#FFFFFF" : "#000000",
              },
            },
            "& .MuiListItemIcon-root": {
              color: theme.palette.mode === "dark" ? "#FFFFFF" : "#000000",
              minWidth: "40px",
            },
            "& .MuiListItemText-primary": {
              fontSize: "14px",
              fontWeight: 500,
              color: theme.palette.mode === "dark" ? "#FFFFFF" : "#000000",
            },
            "& .MuiListItemText-secondary": {
              fontSize: "13px",
              color:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.6)"
                  : "rgba(0, 0, 0, 0.6)",
            },
            "& .MuiDivider-root": {
              margin: "8px",
              borderColor:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.1)",
            },
            "& .MuiListSubheader-root": {
              textTransform: "uppercase",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.5px",
              color:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.7)"
                  : "rgba(0, 0, 0, 0.7)",
              lineHeight: "32px",
              backgroundColor: "transparent",
            },
          }),
        },
      },

      MuiChip: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor:
              theme.palette.mode === "dark" ? "#3A3A3C" : "#E5E5EA",
            color: theme.palette.mode === "dark" ? "#FFFFFF" : "#000000",
            fontSize: "13px",
            height: "24px",
            borderRadius: "12px",
            "&:hover": {
              backgroundColor:
                theme.palette.mode === "dark" ? "#48484A" : "#D1D1D6",
            },
            "&.MuiChip-clickable:hover": {
              backgroundColor:
                theme.palette.mode === "dark" ? "#48484A" : "#D1D1D6",
            },
          }),
          deleteIcon: {
            fontSize: "16px",
            margin: "0 4px 0 -4px",
            "&:hover": {
              opacity: 0.8,
            },
          },
        },
      },
      MuiSnackbar: {
        styleOverrides: {
          root: {
            "& .MuiAlert-root": {
              color: "#FFFFFF",
              backdropFilter: "blur(10px)",
              backgroundColor: ({ theme }) =>
                alpha(
                  theme.palette.background.paper,
                  theme.palette.mode === "dark" ? 0.8 : 0.9
                ),
              boxShadow: ({ theme }) =>
                theme.palette.mode === "dark"
                  ? "0 4px 16px rgba(0, 0, 0, 0.5)"
                  : "0 4px 16px rgba(0, 0, 0, 0.2)",
              "& .MuiAlert-icon": {
                color: "#FFFFFF",
              },
              "& .MuiAlert-action": {
                color: "#FFFFFF",
              },
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor:
              mode === "dark" ? alpha("#1C1C1E", 0.8) : alpha("#FFFFFF", 0.8),
            boxShadow: "none",
            borderBottom: `1px solid ${
              mode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)"
            }`,
            backdropFilter: "blur(10px)",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 10,
              transition: "all 0.2s ease-in-out",
              backgroundColor:
                mode === "dark"
                  ? alpha("#FFFFFF", 0.05)
                  : alpha("#000000", 0.05),
              "&:hover": {
                backgroundColor:
                  mode === "dark"
                    ? alpha("#FFFFFF", 0.08)
                    : alpha("#000000", 0.08),
              },
              "&.Mui-focused": {
                backgroundColor:
                  mode === "dark"
                    ? alpha("#FFFFFF", 0.08)
                    : alpha("#000000", 0.08),
                boxShadow: `0 0 0 4px ${alpha(
                  mode === "dark" ? "#0A84FF" : "#007AFF",
                  0.2
                )}`,
              },
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow:
              mode === "dark"
                ? "0 2px 8px rgba(0, 0, 0, 0.3)"
                : "0 2px 8px rgba(0, 0, 0, 0.12)",
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            padding: "12px 16px",
          },
          standardSuccess: ({ theme }) => ({
            backgroundColor: alpha(theme.palette.success.main, 0.1),
            color: theme.palette.success.main,
          }),
          standardError: ({ theme }) => ({
            backgroundColor: alpha(theme.palette.error.main, 0.1),
            color: theme.palette.error.main,
          }),
          standardWarning: ({ theme }) => ({
            backgroundColor: alpha(theme.palette.warning.main, 0.1),
            color: theme.palette.warning.main,
          }),
          standardInfo: ({ theme }) => ({
            backgroundColor: alpha(theme.palette.info.main, 0.1),
            color: theme.palette.info.main,
          }),
        },
      },
    },
    shape: {
      borderRadius: 10,
    },
  });
};
