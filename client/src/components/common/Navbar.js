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
  ListItemIcon,
  ListItemText,
  Container,
  alpha,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Brightness4,
  Brightness7,
  Dashboard,
  Login,
  PersonAdd,
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
          icon: <Dashboard />,
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
          icon: <Login />,
          path: "/donor/login",
        },
        {
          text: "Register",
          icon: <PersonAdd />,
          path: "/donor/register",
        },
        {
          text: "Admin Login",
          icon: <Login />,
          path: "/admin/login",
        },
      ];

  const drawer = (
    <Box
      sx={{
        height: "100%",
        backgroundColor: mode === "dark" ? "#000000" : "#F2F2F7",
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            component={item.path ? RouterLink : "button"}
            to={item.path}
            onClick={item.onClick || handleDrawerToggle}
            sx={{
              my: 0.5,
              mx: 1,
              borderRadius: 2,
              transition: "all 0.2s",
              "&:hover": {
                backgroundColor: alpha(muiTheme.palette.primary.main, 0.08),
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: muiTheme.palette.text.primary,
                minWidth: 40,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                "& .MuiListItemText-primary": {
                  fontSize: "17px",
                  fontWeight: 500,
                },
              }}
            />
          </ListItem>
        ))}
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
                  color: muiTheme.palette.text.primary,
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
                color: muiTheme.palette.text.primary,
                fontWeight: 600,
                fontSize: "20px",
                letterSpacing: "-0.017em",
              }}
            >
              Scarlet Lifeline
            </Typography>

            <IconButton
              onClick={toggleTheme}
              sx={{
                color: muiTheme.palette.text.primary,
                mr: !isMobile ? 2 : 0,
              }}
            >
              {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
            </IconButton>

            {!isMobile && (
              <Box sx={{ display: "flex", gap: 1 }}>
                {menuItems.map((item) =>
                  item.path ? (
                    <Button
                      key={item.text}
                      component={RouterLink}
                      to={item.path}
                      startIcon={item.icon}
                      sx={{
                        color: muiTheme.palette.text.primary,
                        fontSize: "17px",
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        transition: "all 0.2s",
                        "&:hover": {
                          backgroundColor: alpha(
                            muiTheme.palette.primary.main,
                            0.08
                          ),
                        },
                      }}
                    >
                      {item.text}
                    </Button>
                  ) : (
                    <Button
                      key={item.text}
                      onClick={item.onClick}
                      startIcon={item.icon}
                      sx={{
                        color: muiTheme.palette.text.primary,
                        fontSize: "17px",
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        transition: "all 0.2s",
                        "&:hover": {
                          backgroundColor: alpha(
                            muiTheme.palette.primary.main,
                            0.08
                          ),
                        },
                      }}
                    >
                      {item.text}
                    </Button>
                  )
                )}
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
            width: 280,
            backgroundColor: mode === "dark" ? "#000000" : "#F2F2F7",
            borderRight: `0.5px solid ${
              mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
            }`,
          },
        }}
        sx={{
          display: { xs: "block", sm: "none" },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
