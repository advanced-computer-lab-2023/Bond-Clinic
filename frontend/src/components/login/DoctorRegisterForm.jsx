import {
  Box,
  Grid,
  TextField,
  FormControl,
  Button,
  Divider,Snackbar,Alert
} from "@mui/material";

import * as React from "react";
import Typography from "@mui/material/Typography";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DoctorRegisterForm() {
  const [username, setUsername] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [dob, setDob] = React.useState(null);
  const [gender, setGender] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [rate, setRate] = React.useState("");
  const [affiliation, setAffiliation] = React.useState("");
  const [educationalbg, setEducationalbg] = React.useState("");
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
    const formData = {
      username:username,name:name,email:email,password:password,dob:dob,gender:gender,phoneNumber:phoneNumber,
        hourlyRate:rate,affiliation:affiliation , educationBg:educationalbg    };
        console.log("TESTT : "+dob)
    try {
      const response = await fetch("http://localhost:4000/api/user/doctor-register", {
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
      setSnackbarMessage(data.message+"\n you will be redirected now to login ");        
      setSnackbarOpen(true);
      setTimeout(() => {
        navigate("/");
      }, 5000);
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
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "50%",
      }}
    >
      <Typography
        sx={{ marginBottom: 1 }}
        component="h1"
        variant="h3"
        align="center"
      >
        Doctor Registration
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Name"
        name="name"
        autoComplete="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="number"
        label="Phone Number"
        id="number"
        autoComplete="current-number"
        value={phoneNumber}
        onChange={(event) => setPhoneNumber(event.target.value)}
      />
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 1,
          marginBottom: 2,
        }}
        spacing={2}
      >
        <Grid item sx={{ width: "50%" }}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="gender">Gender</InputLabel>
            <Select label="Gender" value={gender} onChange={(event) => setGender(event.target.value)}>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item sx={{ width: "50%" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              closeOnSelect
              sx={{ width: "100%" }}
              label="Date of Birth"
              value={dob}
              onChange={(selectedDate) => setDob(selectedDate)}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
      <Divider>Specialization Information</Divider>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
        columnSpacing={2}
      >
        <Grid item sx={{ width: "50%" }}>
          <FormControl sx={{ width: "100%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              type="number"
              id="hourlyRate"
              label="Hourly Rate"
              name="hourlyRate"
              value={rate}
              onChange={(event) => setRate(event.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item sx={{ width: "50%" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="affiliation"
            label="Affiliation (hospital, clinic, etc.)"
            name="affiliation"
            value={affiliation}
            onChange={(event) => setAffiliation(event.target.value)}
          />
        </Grid>
      </Grid>
      <TextField
        margin="normal"
        required
        fullWidth
        id="educationalBg"
        label="Educational Background"
        name="educationalBg"
        value={educationalbg}
        onChange={(event) => setEducationalbg(event.target.value)}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Submit
      </Button>
      <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
           {snackbarMessage}
      </Alert>
</Snackbar>
    </Box>
  );
}
