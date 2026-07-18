import express from "express";
import {
  applyTeacher,
  getAllApplications,
  updateApplication,
  deleteApplication,
} from "../Controllers/teacherApplicationController.js";
import { verifyAdmin } from "../utils/commonFunctions.js"; // verifyAdmin middleware

const router = express.Router();

// Public route for teachers to apply
router.post("/apply", applyTeacher);

// Admin protected routes
router.get("/admin/teacher-applications", verifyAdmin, getAllApplications);
router.patch("/admin/teacher/:id", verifyAdmin, updateApplication);
router.delete("/admin/teacher/:id", verifyAdmin, deleteApplication);

export default router;
