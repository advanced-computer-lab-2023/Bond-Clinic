import express, { json } from "express";
import {
  login,
  logout,
  changePassword,
  resetPassword,
  verifyOTP,
  getFamilyMembers,
  addFamilyMember,
  getappointments,
  createPatient,
  deletePatient,
  fetchPatient,
  updatePatient,
  viewDoctorsWithSessionPrice,
  searchDoctor,
  filterDoctors,
  selectDoctor,
  adddoctor,
  getPrescriptions,
  addPrescription,
  addhealthrecordp,
  removeHealthRecord,
  addPackageToFamilyMember,
} from "../controllers/patientController.js";
import upload from "../Middleware/multer.js";
//router initialization
const router = express.Router();

//get request
router.get("/", fetchPatient);

router.post("/login", login);
router.get("/logout", logout);

router.put("/changePassword", changePassword);

router.post("/resetPassword", resetPassword);

router.post("/verifyOTP", verifyOTP);

//post request
router.post("/", createPatient);

//delete request
router.delete("/", deletePatient);

//put request
router.put("/", updatePatient);

//add family members
router.patch("/addfamily/", addFamilyMember);

router.patch("/addPackageToFamilyMember/", addPackageToFamilyMember);
//get family members
router.get("/getfamily/:username", getFamilyMembers);

//add doctor to patient
router.patch("/adddoctor/", adddoctor);

// prescriptions to patient
router.get("/getprescription/", getPrescriptions);
router.post("/addprescription/", addPrescription);

router.get("/getappointments/:username", getappointments);

//37
router.get("/doctors/session-price", viewDoctorsWithSessionPrice);

//38
router.get("/searchDoc", searchDoctor);

//39
router.get("/filter", filterDoctors);

//40
router.get("/select/:username", selectDoctor);

//2
router.post("/addhealthrecord", upload.single("file"), addhealthrecordp);
router.delete("/removehealthrecord/:recordId", removeHealthRecord);

export default router;
