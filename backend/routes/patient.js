import express, { json } from "express";
import { createPatient,deletePatient, fetchPatient, updatePatient} from "../controllers/patientController.js";

//router initialization
const router = express.Router();

//get request
router.get("/", fetchPatient);

//post request
router.post("/", createPatient);

//delete request
router.delete('/',deletePatient);

//put request
router.put('/',updatePatient)

export default router;
