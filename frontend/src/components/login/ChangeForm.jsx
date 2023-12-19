import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Snackbar,Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function ChangeForm() {
  const [oldpass,SetOldpass] = React.useState("");
  const [pass1, SetPass1] = React.useState("");
  const [pass2, SetPass2] = React.useState("");
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [severity, setseverity] = React.useState("success");
  const navigate = useNavigate();

  
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {oldPassword:oldpass,newPassword:pass1, reNewPassword:pass2}
    try {
      const response = await fetch("http://localhost:4000/api/user/reset-password", {
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
      setSnackbarMessage(data.message+" Please Login again");        
      setSnackbarOpen(true);
      setTimeout(() => {
        navigate("/");
      }, 3000)
      }
      if (!response.ok) {
        setseverity("error");
        setSnackbarMessage("Error  : \n "+data.message);        
        setSnackbarOpen(true);
      }
    } catch (error) {
      setseverity("error");
      setSnackbarMessage("Error : \n "+error);        
      setSnackbarOpen(true);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography
        align="center"
        sx={{ marginBottom: 3 }}
        component="h1"
        variant="h3"
      >
        Change Password
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Old Password"
        type="password"
        autoComplete="current-password"
        value = {oldpass}
        onChange={(event)=>SetOldpass(event.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="New Password"
        type="password"
        value = {pass1}
        onChange={(event)=>SetPass1(event.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Repeat Password"
        type="password"
        value = {pass2}
        onChange={(event)=>SetPass2(event.target.value)}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Submit
      </Button>
      <Snackbar open={snackbarOpen} autoHideDuration={7000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
           {snackbarMessage}
      </Alert>
</Snackbar>
    </Box>
  );
}
