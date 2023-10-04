import { BrowserRouter, Routes, Route } from "react-router-dom";
import PatientRegistrationForm from "./pages/patientRegistration.js";
import DoctorRegistrationForm from "./pages/doctorRegistration.js";
import LandingPage from "./pages/LandingPage.js";
import AdminPanel from "./pages/admin.js";

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
            path="/patient"
            element={<PatientRegistrationForm/>}
            />
            <Route
            path="/doctor"
            element={<DoctorRegistrationForm/>}
            />
            <Route
            path="/admin"
            element={<AdminPanel/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
