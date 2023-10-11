import express from "express";
import {fetchPatients, createDoctor , deleteDoctor, fetchDoctor, updateDoctor } from "../controllers/doctorController.js";

//router initialization
const router = express.Router();

router.get('/',fetchDoctor);

router.get('/getpatients/:username',fetchPatients);

router.post('/',createDoctor);

router.delete('/',deleteDoctor);

router.patch('/',updateDoctor)

export default router