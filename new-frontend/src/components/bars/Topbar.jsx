import React from "react";
import Toolbar from "@mui/material/Toolbar";
import DropdownMenu from "./DropdownMenu";
import { AppBar } from "@mui/material";

export default function Topbar() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fff",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignContent: "center",
          justifyContent: "flex-end",
        }}
      >
        <DropdownMenu />
      </Toolbar>
    </AppBar>
  );
}
