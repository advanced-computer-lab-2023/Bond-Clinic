import {
  Box,
  Container,
  CssBaseline,
  Link,
  Grid,
  TextField,
  FormControlLabel,
  FormControl,
  Button,
  Divider,
  Chip,
} from "@mui/material";

import * as React from "react";
import Typography from "@mui/material/Typography";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import PatientRegisterForm from "../../components/login/PatientRegisterForm";
import DoctorRegisterForm from "../../components/login/DoctorRegisterForm";

export default function Register() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const [doctorToggle, setDoctorToggle] = React.useState(false);

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
        {doctorToggle ? (
          <DoctorRegisterForm />
        ) : (
          <PatientRegisterForm setDoctorToggle={setDoctorToggle} />
        )}
      </Box>
      <Button
        onClick={() => {
          setDoctorToggle(!doctorToggle);
          console.log(doctorToggle);
        }}
        fullWidth
        variant="outlined"
      >
        Want to join us? Register as a doctor
      </Button>
    </Container>
  );
}
