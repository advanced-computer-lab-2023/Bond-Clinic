import { Grid } from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import pic1 from "../../images/card-pic-1.svg";
import pic2 from "../../images/card-pic-2.jpg";
import pic3 from "../../images/card-pic-3.jpg";

export default function Cards() {
  return (
    <Grid container spacing={3} width={"100%"}>
      <Grid item md={4}>
        <Card elevation={3}>
          <CardMedia sx={{ height: "28vh" }} image={pic1} />
          <CardHeader title="Patient" subheader="Patient" />
          <CardContent>
            <Typography variant="body2" color="textSecondary">
            Welcome to El7a2ny Clinic, where your health is our priority! At El7a2ny, we're committed to delivering exceptional medical care personalized to your unique needs. Our experienced team ensures your well-being with compassionate healthcare. Thank you for choosing El7a2ny Clinic, your trusted partner in health.            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item md={4}>
        <Card elevation={3}>
          <CardMedia sx={{ height: "28vh" }} image={pic2} />
          <CardHeader title="Doctor" subheader="Doctor" />
          <CardContent>
            <Typography variant="body2" color="textSecondary">
            Join El7a2ny Clinic, a hub of medical excellence! At El7a2ny, we value your health journey and offer a supportive environment for doctors to thrive. Join our dedicated team, where your expertise contributes to a healthier community. Welcome to El7a2ny Clinic, where your impact matters.            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item md={4}>
        <Card elevation={3}>
          <CardMedia sx={{ height: "28vh" }} image={pic3} />
          <CardHeader title="Pharmacist" subheader="Pharmacist" />
          <CardContent>
            <Typography variant="body2" color="textSecondary">
            Discover a fulfilling career at El7a2ny Clinic! As a pharmacist, your role is vital in ensuring optimal patient care. At El7a2ny, we prioritize your professional growth, providing a dynamic workspace where your skills make a difference. Welcome to El7a2ny Clinic, where your pharmacy career flourishes.            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
