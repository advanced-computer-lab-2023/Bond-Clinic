import React from "react";
import FormControl from "@mui/material/FormControl";
import { Button, TextField,Snackbar,Alert } from "@mui/material";
import Paper from "@mui/material/Paper";
export default function DeletePackage() {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [severity, setseverity] = React.useState("success");
  const [type, setType] = React.useState("");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      type: type
    };

    try {
      const response = await fetch("http://localhost:4000/api/package/deletePackage", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: `include`,
      });

      const data = await response.json();
      if (response.ok) {
      setseverity("success");
      setSnackbarMessage(data.message);        
      setSnackbarOpen(true);
      }
      if (!response.ok) {
        setseverity("error");
        setSnackbarMessage("Error while deleting Package : \n "+data.message);        
        setSnackbarOpen(true);
      }
    } catch (error) {
      setseverity("error");
      setSnackbarMessage("Error while deleting Package \n "+error);        
      setSnackbarOpen(true);
    }
  };




  return (
    <FormControl fullWidth component={Paper} sx={{ padding: 2 }}>
      <TextField
        id="outlined-basic"
        label="Package Type"
        variant="outlined"
        margin="normal"
        sx={{ width: "50%", alignSelf: "center" }}
        value={type}
        onChange={(event) => setType(event.target.value)}
      />
      <Button onClick={handleSubmit}
        sx={{
          width: "15%",
          alignSelf: "center",
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        Submit
      </Button>
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
           {snackbarMessage}
      </Alert>
</Snackbar>
    </FormControl>
  );
}
