import express, { json } from "express";
import {login, changePassword, getFamilyMembers,addFamilyMember,getappointments, createPatient, deletePatient, fetchPatient, updatePatient, viewDoctorsWithSessionPrice, searchDoctor, filterDoctors, selectDoctor, adddoctor, getPrescriptions, addPrescription} from "../controllers/patientController.js";

//router initialization
const router = express.Router();

//get request
router.get("/", fetchPatient);

router.post('/login',login);

router.put('/changePassword', changePassword);

//post request
router.post("/", createPatient);

//delete request
router.delete('/',deletePatient);

//put request
router.put('/',updatePatient)

//add family members
router.patch('/addfamily/',addFamilyMember)

//get family members
router.get('/getfamily/:username',getFamilyMembers)

//add doctor to patient
router.patch('/adddoctor/',adddoctor);

// prescriptions to patient
router.get('/getprescription/',getPrescriptions);
router.post('/addprescription/',addPrescription)

router.get('/getappointments/:username',getappointments)



//37
router.get('/doctors/session-price', viewDoctorsWithSessionPrice);

//38
router.get("/searchDoc", searchDoctor);

//39
router.get("/filter", filterDoctors);

//40
router.get("/select/:username", selectDoctor);

export default router;
