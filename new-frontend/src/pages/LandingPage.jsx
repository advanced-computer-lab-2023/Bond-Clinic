import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import ThemeProvider from "react-bootstrap/ThemeProvider";

function LandingPage() {
  return (
    <body>
      <ThemeProvider
        breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
        minBreakpoint="xxs"
      >
        <h1 className="page-title">El7a2ni Virtual Clinic</h1>
        <div className="card">
          <h3 className="card-title">Please select your preference:</h3>
          <div className="card-buttons">
            <div className="mb-2">
              <Stack gap={2} className="col-md-5 mx-auto">
                <Link to="/patient/register" className="button">
                  <Button variant="outline-primary" size="lg">
                    Continue as a New Patient
                  </Button>
                </Link>
                <Link to="/doctor/register" className="button">
                  <Button variant="outline-primary" size="lg">
                    Continue as a New Doctor
                  </Button>
                </Link>
                <Link to="/admin/home" className="button">
                  <Button variant="outline-primary" size="lg">
                    Continue as an Admin
                  </Button>
                </Link>
              </Stack>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </body>
  );
}

export default LandingPage;
