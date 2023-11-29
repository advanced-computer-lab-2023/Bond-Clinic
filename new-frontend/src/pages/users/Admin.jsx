import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Topbar from "../../components/bars/Navbar";
import { Box } from "@mui/material";
export default function Admin() {
  return (
    <Box component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Topbar />
    </Box>
  );
}
