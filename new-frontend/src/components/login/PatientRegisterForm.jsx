import {
  Box,
  Container,
  CssBaseline,
  Grid,
  TextField,
  FormControl,
  Button,
  Divider,
} from "@mui/material";

import * as React from "react";
import Typography from "@mui/material/Typography";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function PatientRegisterForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography sx={{ marginTop: 10 }} component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
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
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="number"
            label="Phone Number"
            id="number"
            autoComplete="current-number"
          />
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: 2,
              marginBottom: 2,
            }}
            spacing={2}
          >
            <Grid item>
              <FormControl sx={{ width: 600 }}>
                <InputLabel id="gender">Gender</InputLabel>
                <Select label="Gender">
                  <MenuItem value="M">Male</MenuItem>
                  <MenuItem value="F">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  closeOnSelect
                  sx={{ width: 600 }}
                  label="Date of Birth"
                  // value={value}
                  // onChange={(newValue) => setValue(newValue)}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Divider>Emergency Contact Information</Divider>
          <TextField
            margin="normal"
            required
            fullWidth
            id="ecName"
            label="Emergency Contact Name"
            name="ecName"
            autoComplete="name"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="ecNumber"
            label="Emergency Contact Phone Number"
            id="ecNumber"
            autoComplete="current-number"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
}