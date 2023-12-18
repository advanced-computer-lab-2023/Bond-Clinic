import React from "react";
import FormControl from "@mui/material/FormControl";
import { Button, Container, TextField,Snackbar,Alert } from "@mui/material";
import Paper from "@mui/material/Paper";


export default function AddUser() {
  const [username, setUsernameState] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [severity, setseverity] = React.useState("success");
  
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
      password: password,
    };

    try {
      const response = await fetch("http://localhost:4000/api/admin/add-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: `include`,
      });

      const data = await response.json();
      if (response.ok) {
      setseverity("success");
      setSnackbarMessage("Admin "+username+" Added Successfuly !");        
      setSnackbarOpen(true);
      }
      if (!response.ok) {
        setseverity("error");
        setSnackbarMessage("Error while adding Admin \n "+data.error);        
        setSnackbarOpen(true);
      }
    } catch (error) {
      setseverity("error");
      setSnackbarMessage("Error while adding Admin \n "+error);        
      setSnackbarOpen(true);
    }
  };
  return (
    <Container>
    <FormControl  fullWidth component={Paper} sx={{ padding: 2 }}>
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
      <TextField
        margin="normal"
        sx={{ width: "50%", alignSelf: "center" }}
        name="password"
        label="Password"
        type="password"
        id="password"
       // autoComplete="current-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
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
      </Button >

    </FormControl>
    <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
           {snackbarMessage}
      </Alert>
</Snackbar>

    </Container>
  );
}
