import express from "express";
import { fetchPatients, createDoctor ,getappointments, deleteDoctor, fetchDoctor, viewHealthRecords, addhealthrecord, updateDoctor, addAvailableTimeSlot, getWallet,reservefollowup } from "../controllers/doctorController.js";
import {viewContract, acceptContract} from "../controllers/employmentContractController.js";

//router initialization
const router = express.Router();

router.post('/reservefollowup',reservefollowup)

router.get('/',fetchDoctor);

router.get('/getpatients',fetchPatients);

router.get('/getappointments',getappointments)

router.post('/',createDoctor);

router.delete('/',deleteDoctor);

router.patch('/',updateDoctor)

//16
// View employment contract
router.get("/contract/:doctorId", viewContract);

// Accept employment contract
router.patch("/contract/:doctorId/accept", acceptContract);

//17
// Add a new route for adding available time slots
router.post("/add-available-time-slot", addAvailableTimeSlot);

router.get("/wallet",getWallet);

//24
router.get("/healthrecords/:patientId", viewHealthRecords);
router.post("/healthrecords/:patientId", addhealthrecord);

export default router