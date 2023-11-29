import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";
import Navbar from "../../components/bars/Navbar";

export default function Patient() {
  return (
    <Box component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Navbar type="Patient" />
    </Box>
  );
}
