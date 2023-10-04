import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function LandingPage() {
  return (
    <body>
      <div className="title">
        <h1>Welcome to El7a2ni Clinic</h1>
        <p>Please select your preference:</p>
        <div className="role-buttons">
          <Link to="/patient" className="button">
            Continue as a New Patient
          </Link>
          <Link to="/doctor" className="button">
            Continue as a New Doctor
          </Link>
          <Link to="/admin" className="button">
            Continue as an Admin
          </Link>
        </div>
      </div>
    </body>
  );
}

export default LandingPage;
