import express, { json } from "express";
import {
  createPackage,
  updatePackage,
  deletePackage,
} from "../controllers/packageController.js";

const router = express .Router() ;
  router.post('/',createPackage)
  router.patch('/',updatePackage)
  router.delete('/',deletePackage);
// .get(getPackage);
export default router;
