import { BrowserRouter, Routes, Route } from "react-router-dom";
import PatientRegistrationForm from "./pages/patientRegistration.js";
import DoctorRegistrationForm from "./pages/doctorRegistration.js";
import LandingPage from "./pages/LandingPage.js";
import AdminPanel from "./pages/admin.js";
import Patient from "./pages/patient.js";
import Doctor from "./pages/doctor.js";

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
            <Route
            path="/doctor/home"
            element={<Doctor/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
