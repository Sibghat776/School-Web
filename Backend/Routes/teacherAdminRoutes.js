import express from "express";
import { getAllTeachers, updateTeacher, deleteTeacher } from "../Controllers/teacherAdminController.js";
import { verifyAdmin } from "../utils/commonFunctions.js";

const router = express.Router();

// Get all teachers (admin)
router.get("/teachers", verifyAdmin, getAllTeachers);
// Update teacher (admin)
router.patch("/teacher/:id", verifyAdmin, updateTeacher);
// Delete teacher (admin)
router.delete("/teacher/:id", verifyAdmin, deleteTeacher);

export default router;
