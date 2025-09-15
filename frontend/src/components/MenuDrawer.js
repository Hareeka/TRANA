import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import QuizIcon from "@mui/icons-material/Quiz";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import RedeemIcon from "@mui/icons-material/Redeem";
import DashboardIcon from "@mui/icons-material/Dashboard";

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { text: "Quiz", icon: <QuizIcon />, path: "/training" },
  { text: "Redeem Coupons", icon: <RedeemIcon />, path: "/coupons" },
];

export default function MenuDrawer() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDrawer = () => setOpen((prev) => !prev);

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: "#1976d2" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
            aria-label="open menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ userSelect: "none" }}>
            TRANA
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={toggleDrawer} ModalProps={{ keepMounted: true }}>
        <List sx={{ width: 240 }}>
          {menuItems.map(({ text, icon, path }) => (
            <ListItemButton
              key={path}
              selected={location.pathname === path}
              onClick={() => {
                navigate(path);
                setOpen(false);
              }}
            >
              {icon}
              <ListItemText primary={text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
}
