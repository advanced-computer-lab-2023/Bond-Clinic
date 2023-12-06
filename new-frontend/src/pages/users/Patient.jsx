import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";
import Navbar from "../../components/bars/Navbar";
import Appbar from "../../components/bars/Appbar";
import { useSelector } from "react-redux";
import { AppbarLabel } from "../../components/bars/consts/enums";
import FamilyMembersTable from "../../components/patient/tables/FamilyMembersTable";
import Typography from "@mui/material/Typography";
import FamilyMembersForm from "../../components/patient/forms/FamilyMembersForm";
import { NavbarLabel } from "../../components/bars/consts/enums";

export default function Patient() {
  const user = useSelector((state) => state.user);

  function HandleNavbar() {
    switch (user.openedNavbar) {
      case NavbarLabel.Prescriptions:
        return (
          <Box sx={{ width: "50%" }}>
            <Typography variant="h4" align="center" marginBottom={5}>
              Prescriptions
            </Typography>
          </Box>
        );
      case NavbarLabel.Doctors:
        return (
          <Box sx={{ width: "50%" }}>
            <Typography variant="h4" align="center" marginBottom={5}>
              Doctors
            </Typography>
          </Box>
        );
      case NavbarLabel.Packages:
        return (
          <Box sx={{ width: "50%" }}>
            <Typography variant="h4" align="center" marginBottom={5}>
              Packages
            </Typography>
          </Box>
        );
      default:
        return null;
    }
  }

  function HandleAppbar() {
    switch (user.openedAppbar) {
      case AppbarLabel.ViewFamilyMembers:
        return (
          <Box sx={{ width: "50%" }}>
            <Typography variant="h4" align="center" marginBottom={5}>
              Family Members
            </Typography>
            <FamilyMembersTable tableData={rows} />
          </Box>
        );
      case AppbarLabel.ViewAppointments:
        return (
          <Box sx={{ width: "50%" }}>
            <Typography variant="h4" align="center" margin={10}>
              Appointments
            </Typography>
          </Box>
        );
      case AppbarLabel.AddFamilyMember:
        return (
          <Box sx={{ width: "50%" }}>
            <Typography variant="h4" align="center" marginBottom={5}>
              Add Family Member
            </Typography>
            <FamilyMembersForm />
          </Box>
        );
      default:
        return;
    }
  }

  const rows = [
    {
      id: 1,
      name: "John Doe",
      nationalID: "123456789",
      age: 30,
      gender: "Male",
      relationToPatient: "Friend",
      packageType: "Basic Package",
    },
    {
      id: 2,
      name: "Jane Smith",
      nationalID: "987654321",
      age: 25,
      gender: "Female",
      relationToPatient: "Family",
      packageType: "Premium Package",
    },
    // Add more rows as needed
  ];
  return (
    <Box display={"flex"}>
      <CssBaseline />
      <Appbar />
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          height: "100vh",
        }}
      >
        <HandleAppbar />
        <HandleNavbar />
      </Box>
    </Box>
  );
}
