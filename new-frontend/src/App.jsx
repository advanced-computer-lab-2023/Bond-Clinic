import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import our custom CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/style.scss";

import LandingPage from "./pages/LandingPage.jsx";

import PatientRegistration from "./pages/registration/PatientRegistration.jsx";
import DoctorRegistration from "./pages/registration/DoctorRegistration.jsx";

import AdminHome from "./pages/home/AdminHome.jsx";
import PatientHome from "./pages/home/PatientHome.jsx";
import DoctorHome from "./pages/home/DoctorHome.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/patient/register" element={<PatientRegistration />} />
          <Route path="/doctor/register" element={<DoctorRegistration />} />
          <Route path="/admin/home/:username" element={<AdminHome />} />
          <Route path="/patient/home/:username" element={<PatientHome />} />
          <Route path="/doctor/home/:username" element={<DoctorHome />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
