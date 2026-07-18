import express from "express";
import {
  markAttendance,
  getClassAttendance,
  getOwnAttendance,
  getOwnAttendanceSummary,
} from "../Controllers/attendanceController.js";
import { verifyRole } from "../utils/commonFunctions.js";

const router = express.Router();

// Teacher/Admin: mark & view class attendance
router.post("/", verifyRole(["admin", "teacher"]), markAttendance);
router.get("/class", verifyRole(["admin", "teacher"]), getClassAttendance);

// Student: own attendance
router.get("/me", verifyRole(["student"]), getOwnAttendance);
router.get("/me/summary", verifyRole(["student"]), getOwnAttendanceSummary);

export default router;
