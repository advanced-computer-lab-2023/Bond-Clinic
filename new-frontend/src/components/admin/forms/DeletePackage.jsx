import React from "react";
import FormControl from "@mui/material/FormControl";
import { Button, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
export default function DeletePackage() {
  return (
    <FormControl fullWidth component={Paper} sx={{ padding: 2 }}>
      <TextField
        id="outlined-basic"
        label="Package Type"
        variant="outlined"
        margin="normal"
        sx={{ width: "50%", alignSelf: "center" }}
      />
      <Button
        sx={{
          width: "15%",
          alignSelf: "center",
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        Submit
      </Button>
    </FormControl>
  );
}