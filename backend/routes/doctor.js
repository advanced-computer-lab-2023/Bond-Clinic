import express from "express";
import { createDoctor , deleteDoctor, fetchDoctor, updateDoctor } from "../controllers/doctorController.js";

//router initialization
const router = express.Router();

router.get('/',fetchDoctor);

router.post('/',createDoctor);

router.delete('/',deleteDoctor);

router.put('/',updateDoctor)

export default router