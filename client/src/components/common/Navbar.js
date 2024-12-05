import React from "react";
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
import { useState } from "react";

const Navbar = () => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const muiTheme = useMuiTheme();
  const { mode, toggleTheme } = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
    <List>
      {menuItems.map((item) => (
        <ListItem
          button
          key={item.text}
          component={item.path ? RouterLink : "button"}
          to={item.path}
          onClick={item.onClick || handleDrawerToggle}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <>
      <AppBar position="sticky">
        <Container maxWidth="lg">
          <Toolbar>
            {isMobile && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
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
              }}
            >
              Scarlet Lifeline
            </Typography>

            <IconButton onClick={toggleTheme} color="inherit">
              {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
            </IconButton>

            {!isMobile && (
              <Box sx={{ display: "flex", gap: 2 }}>
                {menuItems.map((item) =>
                  item.path ? (
                    <Button
                      key={item.text}
                      color="inherit"
                      component={RouterLink}
                      to={item.path}
                      startIcon={item.icon}
                    >
                      {item.text}
                    </Button>
                  ) : (
                    <Button
                      key={item.text}
                      color="inherit"
                      onClick={item.onClick}
                      startIcon={item.icon}
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
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
