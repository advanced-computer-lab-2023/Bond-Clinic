import express from "express";
import { createAdmin, deleteAdmin } from "../controllers/adminController.js";

//router initialization
const router = express.Router();

//router.get('/',);

router.post('/',createAdmin);

router.delete('/',deleteAdmin);

export default router