import React, { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";
import Navbar from "../../components/bars/Navbar";
import Appbar from "../../components/bars/Appbar";
import { useSelector } from "react-redux";
import { AppbarLabel, NavbarLabel } from "../../components/bars/consts/enums";
import Typography from "@mui/material/Typography";
import AddUser from "../../components/admin/forms/AddUser";
import RemoveUser from "../../components/admin/forms/RemoveUser";
import NewDoctorTable from "../../components/admin/tables/NewDoctorTable";
import AddPackage from "../../components/admin/forms/AddPackage";
import UpdatePackage from "../../components/admin/forms/UpdatePackage";
import DeletePackage from "../../components/admin/forms/DeletePackage";
import DocumentsTable from "../../components/admin/tables/DocumentsTable";

export default function Admin() {
  const user = useSelector((state) => state.user);
  const [data, setData] = React.useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/admin/registered-doctors-requests",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: `include`,
        }
      );
      const dataa = await response.json();
      setData(dataa);
      console.log(dataa);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const data = [
  //   {
  //     key: "1",
  //     name: "John Brown",
  //     age: 32,
  //     hourlyRate: "$10",
  //     affiliation: "Hospital",
  //     eduacationalBackground: "University",
  //   },
  //   {
  //     key: "2",
  //     name: "Jim Green",
  //     age: 42,
  //     hourlyRate: "$10",
  //     affiliation: "Hospital",
  //     eduacationalBackground: "University",
  //   },
  //   {
  //     key: "3",
  //     name: "Joe Black",
  //     age: 32,
  //     hourlyRate: "$10",
  //     affiliation: "Hospital",
  //     eduacationalBackground: "University",
  //   },
  // ];

  function HandleNavbar() {
    switch (user.openedNavbar) {
      case NavbarLabel.DoctorRegistration:
        return (
          <Box sx={{ width: "50%" }}>
            <Typography variant="h4" align="center" marginBottom={5}>
              Doctors Table
            </Typography>
            <NewDoctorTable data={data} />
          </Box>
        );
      default:
        return null;
    }
  }

  function HandleAppbar() {
    switch (user.openedAppbar) {
      case AppbarLabel.AddUser:
        return (
          <Box sx={{ width: "50%" }}>
            <Typography variant="h4" align="center" marginBottom={5}>
              Add Users
            </Typography>
            <AddUser />
          </Box>
        );
      case AppbarLabel.RemoveUser:
        return (
          <Box sx={{ width: "50%" }}>
            <Typography variant="h4" align="center" marginBottom={5}>
              Remove User
            </Typography>
            <RemoveUser />
          </Box>
        );
      case AppbarLabel.AddPackage:
        return (
          <Box sx={{ width: "50%" }}>
            <Typography variant="h4" align="center" margin={10}>
              Add Package
            </Typography>
            <AddPackage />
          </Box>
        );
      case AppbarLabel.DeletePackage:
        return (
          <Box sx={{ width: "50%" }}>
            <Typography variant="h4" align="center" margin={10}>
              Delete Package
            </Typography>
            <DeletePackage />
          </Box>
        );
      case AppbarLabel.UpdatePackage:
        return (
          <Box sx={{ width: "50%" }}>
            <Typography variant="h4" align="center" margin={10}>
              Update Package
            </Typography>
            <UpdatePackage />
          </Box>
        );
      default:
        return;
    }
  }
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
