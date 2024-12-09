// src/styles/globalStyles.js
import { alpha } from "@mui/material/styles";

export const globalStyles = {
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },
  html: {
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    height: "100%",
    width: "100%",
  },
  body: {
    height: "100%",
    width: "100%",
  },
  "#root": {
    height: "100%",
    width: "100%",
  },
  ".page-container": {
    minHeight: "calc(100vh - 64px)",
    padding: "24px",
    backgroundColor: (theme) => theme.palette.background.default,
  },
  ".content-container": {
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
    padding: "0 16px",
  },
  ".card-hover": {
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: (theme) =>
        theme.palette.mode === "dark"
          ? "0 4px 12px rgba(0, 0, 0, 0.4)"
          : "0 4px 12px rgba(0, 0, 0, 0.15)",
    },
  },
  ".glass-effect": {
    backdropFilter: "blur(16px)",
    backgroundColor: (theme) =>
      alpha(
        theme.palette.background.paper,
        theme.palette.mode === "dark" ? 0.7 : 0.8
      ),
    border: (theme) =>
      `1px solid ${
        theme.palette.mode === "dark"
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(0, 0, 0, 0.1)"
      }`,
  },
  ".table-container": {
    borderRadius: "12px",
    overflow: "hidden",
    backgroundColor: (theme) => theme.palette.background.paper,
    "& .MuiTableCell-root": {
      borderBottom: (theme) =>
        `1px solid ${
          theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(0, 0, 0, 0.1)"
        }`,
    },
    "& .MuiTableRow-root:hover": {
      backgroundColor: (theme) =>
        theme.palette.mode === "dark"
          ? alpha("#FFFFFF", 0.05)
          : alpha("#000000", 0.02),
    },
  },
  ".scroll-container": {
    "&::-webkit-scrollbar": {
      width: "8px",
      height: "8px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: (theme) =>
        theme.palette.mode === "dark" ? "#2C2C2E" : "#F2F2F7",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: (theme) =>
        theme.palette.mode === "dark" ? "#48484A" : "#C7C7CC",
      borderRadius: "4px",
      "&:hover": {
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#636366" : "#A9A9AC",
      },
    },
  },
  ".sidebar-notification": {
    backgroundColor: (theme) =>
      theme.palette.mode === "dark"
        ? alpha(theme.palette.background.paper, 0.5)
        : alpha(theme.palette.background.paper, 0.7),
    borderRadius: "12px",
    padding: "12px",
    margin: "8px",
    boxShadow: (theme) =>
      theme.palette.mode === "dark"
        ? "0 2px 8px rgba(0, 0, 0, 0.2)"
        : "0 2px 8px rgba(0, 0, 0, 0.1)",
    transition: "all 0.2s ease-in-out",
    cursor: "pointer",
    "&:hover": {
      transform: "translateY(-1px)",
      backgroundColor: (theme) =>
        theme.palette.mode === "dark"
          ? alpha(theme.palette.background.paper, 0.6)
          : alpha(theme.palette.background.paper, 0.8),
    },
    "& .notification-title": {
      color: (theme) => theme.palette.text.primary,
      fontSize: "14px",
      fontWeight: 600,
      marginBottom: "4px",
    },
    "& .notification-content": {
      color: (theme) => theme.palette.text.secondary,
      fontSize: "13px",
    },
  },
  ".flex-center": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  ".flex-between": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ".flex-column": {
    display: "flex",
    flexDirection: "column",
  },
  ".text-truncate": {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  ".section-title": {
    fontSize: "20px",
    fontWeight: 600,
    letterSpacing: "-0.01em",
    marginBottom: "16px",
    color: (theme) => theme.palette.text.primary,
  },
  "@media (max-width: 600px)": {
    ".page-container": {
      padding: "16px",
    },
    ".content-container": {
      padding: "0 12px",
    },
    ".section-title": {
      fontSize: "18px",
      marginBottom: "12px",
    },
  },
  "@media (max-width: 960px)": {
    ".hide-on-mobile": {
      display: "none",
    },
  },
  "@media (min-width: 961px)": {
    ".hide-on-desktop": {
      display: "none",
    },
  },
  "@supports (padding: env(safe-area-inset-top))": {
    ".page-container": {
      paddingTop: "calc(env(safe-area-inset-top) + 24px)",
      paddingBottom: "calc(env(safe-area-inset-bottom) + 24px)",
      paddingLeft: "calc(env(safe-area-inset-left) + 24px)",
      paddingRight: "calc(env(safe-area-inset-right) + 24px)",
    },
  },
};
