import * as React from "react";
import {
  Button,
  Typography,
  Container,
  Stack,
  CssBaseline,
} from "@mui/material";
import LoginForm from "../../components/login/LoginForm";
import Cards from "../../components/Cards";

export default function Login() {
  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <Stack direction="column" spacing={8}>
        <Typography
          sx={{ paddingTop: 5 }}
          component="h1"
          variant="h1"
          align="center"
        >
          Bond Clinic
        </Typography>
        <Typography component="h1" variant="h4" align="center">
          Welcome to Bond Clinic, where you can find the best doctors in the
          world.
        </Typography>
        <Cards />
        <Button
          variant="contained"
          sx={{ width: "15%", alignSelf: "center" }}
          onClick={() => {
            window.scrollBy(0, 1080);
          }}
        >
          Get Started
        </Button>
      </Stack>
      <LoginForm />
    </Container>
  );
}
