import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Snackbar,Alert } from "@mui/material";
//import logo from "../../images/logo.svg";
import Typography from "@mui/material/Typography";
import Progress from "../../components/Progress";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetForm() {
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [otp,Setotp] = React.useState("");
  const [pass1, SetPass1] = React.useState("");
  const [pass2, SetPass2] = React.useState("");
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [severity, setseverity] = React.useState("success");
 const navigate = useNavigate();
  const inputRef1 = useRef();
  const inputRef2 = useRef();



  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  const [value, setValue] = React.useState(0);
  const handleSubmit = async (event) => {
    {
    event.preventDefault();
    const formData = {username:username , email:email,OTP:otp,newPassword:pass1, reNewPassword:pass2}
    try {
        let api = (value == 0 ? "forgot-password" : (value == 33)? "checkotp": "reset-password");
      const response = await fetch("http://localhost:4000/api/user/"+api, {
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
      setSnackbarMessage(data.message);        
      setSnackbarOpen(true);
      setValue(value + 33);
      if(value == 66){
        setSnackbarMessage(data.message+" You will be redirected now to login")
      }
      inputRef1.current.remove();
      inputRef2.current.remove();
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
    console.log(value);
  }
};
  const buttonLabel = () => {
    if (value == 33) return "Verify OTP";
    else if (value == 66) return "Reset Password";
    else return "Send OTP";
  };
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography
        align="center"
        sx={{ marginBottom: 3 }}
        component="h1"
        variant="h3"
      >
        Reset Password
      </Typography>
      <TextField
        ref={inputRef1}
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        value={username}
        onChange={(event)=>setUsername(event.target.value)}
      />
      <TextField
        ref={inputRef2}
        margin="normal"
        required ="true"
        fullWidth
        name="email"
        label="Email Address"
        type="email"
        id="email"
        autoComplete="email"
        value={email}
        onChange={(event)=>setEmail(event.target.value)}
      />
      {value == 33 ? (
        <TextField
          margin="normal"
          required
          fullWidth
          name="otp"
          label="OTP"
          type="otp"
          id="otp"
          autoComplete="otp"
          value = {otp}
          onChange={(event)=>Setotp(event.target.value)}
        />
      ) : value == 66 ? (
        <div>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="New Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={pass1}
            onChange={(event)=>SetPass1(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Repeat Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={pass2}
            onChange={(event)=>SetPass2(event.target.value)}
          />
        </div>
      ) : value == 99 ? (        setTimeout(() => {
        navigate("/");
      }, 5000)):null}

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {buttonLabel()}
      </Button>
      <Progress value={value} />
      <Snackbar open={snackbarOpen} autoHideDuration={7000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
           {snackbarMessage}
      </Alert>
</Snackbar>
    </Box>
  );
}
