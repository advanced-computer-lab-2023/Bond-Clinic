import React from "react";
import Navbar from "../../components/bars/Navbar";
import CssBaseline from "@mui/material/CssBaseline";
import Topbar from "../../components/bars/Topbar";
import Divider from "@mui/material/Divider";
import { Box } from "@mui/material";
export default function Admin() {
  return (
    <Box component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Navbar />
      <Divider />
      <Topbar />
      <Divider />
    </Box>
  );
}
