import React from "react";
import FormControl from "@mui/material/FormControl";
import { Button, TextField,Snackbar,Alert } from "@mui/material";
import Paper from "@mui/material/Paper";
export default function UpdatePackage() {

  const [type, setType] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [clinicDiscount, setclinicDiscount] = React.useState("");
  const [pharmacyDiscount, setpharmacyDiscount] = React.useState("");
  const [familyDiscount, setfamilyDiscount] = React.useState("");
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
      price: price,
      type: type,
      clinicDiscount:clinicDiscount,
      pharmacyDiscount:pharmacyDiscount,
      familyDiscount:familyDiscount
    };

    try {
      const response = await fetch("http://localhost:4000/api/package/updatePackage", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: `include`,
      });

      const data = await response.json();
      if (response.ok) {
      setseverity("success");
      setSnackbarMessage("Package "+type+" Updated Successfuly !");        
      setSnackbarOpen(true);
      }
      if (!response.ok) {
        setseverity("error");
        setSnackbarMessage("Error while updating Package : \n "+data.message);        
        setSnackbarOpen(true);
      }
    } catch (error) {
      setseverity("error");
      setSnackbarMessage("Error while adding Package \n "+error);        
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
        value={type}
        onChange={(event) => setType(event.target.value)}
        sx={{ width: "50%", alignSelf: "center" }}
      />
      <TextField
        type="number" 
        margin="normal"
        sx={{ width: "50%", alignSelf: "center" }}
        label="Price"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
      />
      <TextField
      type="number"
        margin="normal"
        sx={{ width: "50%", alignSelf: "center" }}
        label="Clinic Discount"
        value={clinicDiscount}
        onChange={(event) => setclinicDiscount(event.target.value)}
      />
      <TextField
      type="number"
        margin="normal"
        sx={{ width: "50%", alignSelf: "center" }}
        label="Pharmacy Discount"
        value={pharmacyDiscount}
        onChange={(event) => setpharmacyDiscount(event.target.value)}
      />
      <TextField
      type="number"
        margin="normal"
        sx={{ width: "50%", alignSelf: "center" }}
        label="Family Discount"
        value={familyDiscount}
        onChange={(event) => setfamilyDiscount(event.target.value)}
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
