//src/components/common/Navbar.js
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
  alpha,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Brightness4,
  Brightness7,
  Logout,
} from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import { useTheme } from "../../contexts/ThemeContext";

const Navbar = () => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const muiTheme = useMuiTheme();
  const { mode, toggleTheme } = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleLogout = () => {
    logout();
    navigate("/");
    handleDrawerToggle();
  };

  const menuItems = user
    ? [
        {
          text: "Dashboard",
          path: `/${role}/dashboard`,
        },
        {
          text: "Logout",
          icon: <Logout />,
          onClick: handleLogout,
        },
      ]
    : [
        {
          text: "Donor Login",
          path: "/donor/login",
        },
        {
          text: "Register",
          path: "/donor/register",
        },
        {
          text: "Admin Login",
          path: "/admin/login",
        },
      ];

  const drawer = (
    <Box
      sx={{
        height: "100%",
        backgroundColor: (theme) => theme.palette.background.default,
        pt: 2,
      }}
    >
      <List sx={{ px: 2 }}>
        {menuItems.map((item) => {
          const ItemComponent = item.path ? RouterLink : "div";

          return (
            <Box
              key={item.text}
              onClick={item.onClick}
              component={ItemComponent}
              to={item.path}
              sx={(theme) => ({
                width: "100%",
                mb: 0.5,
                textDecoration: "none",
                "&:last-child": {
                  mb: 0,
                },
                ".MuiButtonBase-root": {
                  border: "none",
                  boxShadow: "none",
                  textTransform: "none",
                  width: "100%",
                  p: 0,
                  borderRadius: 0,
                },
              })}
            >
              <Box
                sx={(theme) => ({
                  py: 1.5,
                  px: 2,
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: theme.palette.text.primary,
                  cursor: "pointer",
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#2C2C2E" : "#F2F2F7",
                  transition: "all 0.2s",
                  border: "none",
                  fontWeight: "normal",
                  borderRadius: 2,
                  margin: 1,
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "dark" ? "#3A3A3C" : "#E5E5EA",
                  },
                  "&:active": {
                    backgroundColor:
                      theme.palette.mode === "dark" ? "#3A3A3C" : "#E5E5EA",
                    transform: "scale(0.98)",
                  },
                })}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "inherit",
                  }}
                >
                  {item.text}
                </Typography>
                {item.icon && (
                  <Box
                    component="span"
                    sx={{
                      ml: 1,
                      display: "flex",
                      alignItems: "center",
                      color: "inherit",
                      opacity: 0.7,
                    }}
                  >
                    {item.icon}
                  </Box>
                )}
              </Box>
            </Box>
          );
        })}
      </List>
    </Box>
  );
  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor:
            mode === "dark" ? alpha("#1C1C1E", 0.8) : alpha("#FFFFFF", 0.8),
          backdropFilter: "blur(20px)",
          borderBottom: `0.5px solid ${
            mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
          }`,
          color: mode === "dark" ? "#FFFFFF" : "#000000",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ py: 1 }}>
            {isMobile && (
              <IconButton
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  mr: 2,
                  color: "inherit",
                }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                flexGrow: 1,
                textDecoration: "none",
                color: "inherit",
                fontWeight: 600,
                fontSize: "18px",
                letterSpacing: "-0.017em",
              }}
            >
              Scarlet Lifeline
            </Typography>

            <IconButton
              onClick={toggleTheme}
              sx={{
                color: "inherit",
                mr: !isMobile ? 2 : 0,
              }}
            >
              {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
            </IconButton>

            {!isMobile && (
              <Box sx={{ display: "flex", gap: 1 }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.text}
                    component={item.path ? RouterLink : "button"}
                    to={item.path}
                    onClick={item.onClick}
                    endIcon={item.icon}
                    sx={{
                      color: "inherit",
                      fontSize: "15px",
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      transition: "all 0.2s",
                      "&:hover": {
                        backgroundColor:
                          mode === "dark"
                            ? "rgba(255, 255, 255, 0.1)"
                            : "rgba(0, 0, 0, 0.05)",
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: 320,
            backgroundColor: mode === "dark" ? "#1C1C1E" : "#FFFFFF",
            border: "none",
          },
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
