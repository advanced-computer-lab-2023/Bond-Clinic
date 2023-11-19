import * as React from "react";
import { Button, Typography, Container, Stack } from "@mui/material";
import LoginForm from "../../components/login/LoginForm";
import Cards from "../../components/Cards";
import Grid from "@mui/material/Grid";

// TODO remove, this demo shouldn't need to reset the theme.

export default function Login() {
  return (
    <Container component="main" maxWidth="xl">
      <Stack direction="column" spacing={100}>
        <Stack direction="column" spacing={10}>
          <Typography
            sx={{ paddingTop: 5 }}
            component="h1"
            variant="h1"
            align="center"
          >
            Welcome to Bond Clinic
          </Typography>
          <Cards />
          <Grid>
            <Button variant="contained" sx={{ mt: 3, mb: 2 }}>
              Get Started
            </Button>
          </Grid>
        </Stack>
        <LoginForm />
      </Stack>
    </Container>
  );
}
