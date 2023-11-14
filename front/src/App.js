import { BrowserRouter, Routes, Route } from "react-router-dom";
import PatientRegistrationForm from "./pages/patientRegistration.js";
import DoctorRegistrationForm from "./pages/doctorRegistration.js";
import LandingPage from "./pages/LandingPage.js";
import AdminPanel from "./pages/admin.js";
import Patient from "./pages/patient.js";
<<<<<<< Updated upstream

=======
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
import Success from "./pages/success.js";
>>>>>>> Stashed changes
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route 
            path="/"
            element={<LandingPage/>}
            />
            <Route
            path="/patient/register"
            element={<PatientRegistrationForm/>}
            />
            <Route
            path="/doctor/register"
            element={<DoctorRegistrationForm/>}
            />
            <Route
            path="/admin/home"
            element={<AdminPanel/>}
            />
            <Route
            path="/patient/home"
            element={<Patient/>}
            />
<<<<<<< Updated upstream
=======
            <Route path="/patient/packages" element={<PatientPackages />} />
            <Route path="/patient/doctors" element={<PatientDoctors />} />
            <Route path="/patient/success-payment" element={<Success />} />
>>>>>>> Stashed changes
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
