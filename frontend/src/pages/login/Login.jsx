import React, { useRef } from "react";
import {
  Button,
  Typography,
  Container,
  Stack,
  CssBaseline,
} from "@mui/material";
import LoginForm from "../../components/login/LoginForm";
import Cards from "../../components/login/Cards";

export default function Login() {
  const targetElementRef = useRef(null);
  const scrollToElement = () => {
    targetElementRef.current.scrollIntoView();
  };
  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Stack direction="column" spacing={"3vh"}>
        <Stack
          display="flex"
          direction="row"
          justifyContent="center"
          alignContent="center"
          paddingTop={"2vh"}
        >
          <img
            src="../../images/logo.png"
            alt="logo"
            style={{ width: "auto", height: "80px", paddingRight: "10px" }}
          />
          <Typography component="h1" variant="h2" align="center">
            Bond Clinic
          </Typography>
        </Stack>
        <Typography component="h1" variant="h6" align="center">
          Welcome to Bond Clinic, where you can find the best doctors in the
          world.
        </Typography>
        <Cards />
        <Button
          variant="contained"
          sx={{ width: "15%", alignSelf: "center" }}
          onClick={scrollToElement}
        >
          Get Started
        </Button>
      </Stack>
      <br/>
      <LoginForm ref={targetElementRef} />
    </Container>
  );
}
