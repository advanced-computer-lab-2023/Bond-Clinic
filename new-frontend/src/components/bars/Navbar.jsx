import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { AdminNavbarItems } from "./consts/AdminNavbarItems";
import DropdownMenu from "./DropdownMenu";
const drawerWidth = 240;

export default function Navbar() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "white",
        }}
      >
        <Toolbar>
          <a href="/admin/home">
            <img
              src="../../images/logo.png"
              alt="logo"
              style={{ width: "50px", height: "auto", marginRight: "10px" }}
            />
          </a>
          <Typography
            component="a"
            href="/admin/home"
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "black",
              textDecoration: "none",
            }}
          >
            Bond Clinic
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <DropdownMenu />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {AdminNavbarItems.map((item) => (
              <ListItem
                button
                key={item.id}
                onClick={() => console.log("clicked")}
              >
                <ListItemIcon sx={AdminNavbarItems.icons}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText sx={AdminNavbarItems.text} primary={item.label} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </Box>
  );
}
