import React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { AdminNavbarItems } from "./consts/AdminNavbarItems";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Drawer
      sx={{
        drawer: {
          width: 320,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 320,
            boxSizing: "border-box",
            backgroundColor: "#101F33",
            color: "rgba(255, 255, 255, 0.7)",
          },
          "& .Mui-selected": {
            color: "red",
          },
        },
        icons: {
          color: "rgba(255, 255, 255, 0.7)!important",
          marginLeft: "20px",
        },
        text: {
          "& span": {
            marginLeft: "-10px",
            fontWeight: "600",
            fontSize: "16px",
          },
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        <img
          src="../../images/logo.png"
          alt="logo"
          style={{ width: "auto", height: "50px", marginRight: "10px" }}
        />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/admin/home"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontWeight: 700,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          BOND CLINIC
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {AdminNavbarItems.map((item) => (
          <ListItem button key={item.id} onClick={() => navigate(item.route)}>
            <ListItemIcon sx={AdminNavbarItems.icons}>{item.icon}</ListItemIcon>
            <ListItemText sx={AdminNavbarItems.text} primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Navbar;
