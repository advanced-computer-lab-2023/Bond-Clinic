import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import PatientRegistrationForm from "./pages/patientRegistration.js";
import DoctorRegistrationForm from "./pages/doctorRegistration.js";
import LandingPage from "./pages/LandingPage.js";
import AdminPanel from "./pages/admin.js";
import Patient from "./pages/patient.js";
import Doctor from "./pages/doctor.js";
import Packages from "./pages/packages.js";
import PatientFamilyMembers from "./pages/patientFamilyMembers.js";
import AppointmentsTable from "./components/appointments.js";
import PatientPrescriptions from "./pages/patientPrescriptions.js";
import PatientPackages from "./pages/patientPackages.tsx";
import PatientDoctors from "./pages/patientDoctor.js";
import Login from "./pages/login.js";
import ResetPassword from "./pages/ResetPassword.js";
import OtpVerification from "./pages/OtpVerification.js";
import RoleContext from "./pages/RoleContext.js";

function App() {
  const [role, setRole] = useState('');

  return (
    <div className="App">
    <RoleContext.Provider value={{ role, setRole }}>  
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/resetPassword" element={<ResetPassword/>} />
            <Route path="/verifyOTP" element={<OtpVerification/>} />

            <Route path="/" element={<LandingPage />} />
            <Route
              path="/patient/register"
              element={<PatientRegistrationForm />}
            />
            <Route
              path="/doctor/register"
              element={<DoctorRegistrationForm />}
            />
            <Route path="/admin/home" element={<AdminPanel />} />
            <Route path="/patient/home" element={<Patient />} />
            <Route path="/doctor/home" element={<Doctor />} />
            <Route path="/admin/packages" element={<Packages />} />
            <Route
              path="/patient/appointments"
              element={<AppointmentsTable />}
            />
            <Route
              path="/patient/familymembers"
              element={<PatientFamilyMembers />}
            />
            <Route
              path="/patient/prescriptions"
              element={<PatientPrescriptions />}
            />
            <Route path="/patient/packages" element={<PatientPackages />} />
            <Route path="/patient/doctors" element={<PatientDoctors />} />
            <Route path="/doctor/wallet" element={<Wallet />} />
            <Route path="/patient/wallet" element={<Wallet />} />
          </Routes>
        </div>
      </BrowserRouter>
      </RoleContext.Provider>
    </div>
  );
}

export default App;
