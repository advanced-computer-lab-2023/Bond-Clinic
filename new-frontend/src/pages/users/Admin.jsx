import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";
import Navbar from "../../components/bars/Navbar";
import Appbar from "../../components/bars/Appbar";

export default function Admin() {
  return (
    <Box display={"flex"}>
      <CssBaseline />
      <Appbar />
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          marginTop: 10,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Box sx={{ width: "75%" }}></Box>
      </Box>
    </Box>
  );
}
