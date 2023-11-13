import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/login" element={<Login />} />
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
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
