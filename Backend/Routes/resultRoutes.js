import express from "express";
import {
  addResult,
  getOwnResults,
  getClassResults,
  deleteResult,
} from "../Controllers/resultController.js";
import { verifyRole } from "../utils/commonFunctions.js";

const router = express.Router();

// Teacher/Admin: add & manage results
router.post("/", verifyRole(["admin", "teacher"]), addResult);
router.get("/class", verifyRole(["admin", "teacher"]), getClassResults);
router.delete("/:id", verifyRole(["admin", "teacher"]), deleteResult);

// Student: own results
router.get("/me", verifyRole(["student"]), getOwnResults);

export default router;
