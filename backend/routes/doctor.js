import express from "express";
import { uploadDocuments, updateDoctor, searchPatient, getRegisteredPatients, filterPatientsUpcomingAppointments, 
         selectPatient, viewRegisteredPatient, acceptContract, viewContract, addAvailableTimeSlots, 
         addPatinetPrescription } from "../controllers/doctorController.js";

//router initialization
const router = express.Router();

// (Req 4) As a doctor upload and submit required documents upon registrationas a doctor such as ID, Medical licenses and medical degree 
router.post("/upload-documents", uploadDocuments);

// (Req 14) As a doctor edit/ update my email, hourly rate or affiliation (hospital)
router.patch('/update-doctor',updateDoctor);

// (Req 34) As a doctor search for a patient by name
router.get("/search-patient", searchPatient);

// (Req 33) As a doctor view a list of all my patients
router.get("/registered-patients", getRegisteredPatients);

// (Req 35) As a doctor filter patients based on upcoming appointments
router.post("/filter-upcoming-appointments", filterPatientsUpcomingAppointments);

// (Req 36) As a doctor select a patient from the list of patients
router.post("/select-patient", selectPatient);

// (Req 25) As a doctor view information and health records of patient registered with me
router.get("/view-patient-record", viewRegisteredPatient)

// (Req 16) As a doctor view the employment contract
router.get("/view-contract", viewContract);

// (Req 16) As a doctor accept the employment contract
router.patch("/accept-contract", acceptContract);

// (Req 17) As a doctor add my available time slots for appointments
router.patch("/add-available-time-slot", addAvailableTimeSlots);

// (Req 62) As a doctor add a patient's prescription
router.post("/add-prescription", addPatinetPrescription);

// router.post('/reservefollowup',reservefollowup)

// router.get('/getappointments',getappointments)

// // router.post('/',createDoctor);

// // router.delete('/',deleteDoctor);

// //16
// router.get("/:doctorId/:clinicId", viewContract);
// router.patch("/accept/:doctorId/:clinicId", acceptContract);

// //17
// // Add a new route for adding available time slots
// router.post("/add-available-time-slot", addAvailableTimeSlot);

// router.get("/wallet",getWallet);

// //24
// router.get("/healthrecords/:patientId", viewHealthRecords);
// router.post("/healthrecords/:patientId", addhealthrecord);

export default router