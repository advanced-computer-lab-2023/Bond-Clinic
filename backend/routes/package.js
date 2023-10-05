import express, { json } from "express";
import {
  createPackage,
  updatePackage,
  deletePackage,
} from "../controllers/packageController.js";

const router = express
  .Router()
  .post('/',createPackage)
  .put('/',updatePackage)
  .delete('/',deletePackage);
// .get(getPackage);
export default router;
