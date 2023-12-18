import React from "react";
import FormControl from "@mui/material/FormControl";
import { Button, TextField,Snackbar,Alert } from "@mui/material";
import Paper from "@mui/material/Paper";

export default function RemoveUser() {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [severity, setseverity] = React.useState("success");
  const [username, setUsernameState] = React.useState("");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      username: username,
    };

    try {
      const response = await fetch("http://localhost:4000/api/admin/remove-user", {
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
      setSnackbarMessage("Admin "+username+" Removed Successfuly !");        
      setSnackbarOpen(true);
      }
      if (!response.ok) {
        setseverity("error");
        setSnackbarMessage("Error while Removing Admin : \n "+data.message);        
        setSnackbarOpen(true);
      }
    } catch (error) {
      setseverity("error");
      setSnackbarMessage("Error while removing Admin \n "+error);        
      setSnackbarOpen(true);
    }
  };
  return (
    <FormControl fullWidth component={Paper} sx={{ padding: 2 }}>
      <TextField
        id="outlined-basic"
        label="Username"
        variant="outlined"
        margin="normal"
        sx={{ width: "50%", alignSelf: "center" }}
        name="username"
        //autoComplete="username"
        value={username}
        onChange={(event) => setUsernameState(event.target.value)}
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
