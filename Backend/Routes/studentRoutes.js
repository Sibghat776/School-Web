import express from "express";
import {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  resetStudentPassword,
  getOwnProfile,
  updateOwnProfile,
  changeOwnPassword,
} from "../Controllers/studentController.js";
import { verifyAdmin } from "../utils/commonFunctions.js";
import { verifyRole } from "../utils/commonFunctions.js";

const router = express.Router();

// Student self routes
router.get("/me", verifyRole(["student"]), getOwnProfile);
router.patch("/me", verifyRole(["student"]), updateOwnProfile);
router.post("/me/change-password", verifyRole(["student"]), changeOwnPassword);

// Admin student management
router.post("/", verifyAdmin, createStudent);
router.get("/", verifyAdmin, getStudents);
router.get("/:id", verifyAdmin, getStudentById);
router.patch("/:id", verifyAdmin, updateStudent);
router.delete("/:id", verifyAdmin, deleteStudent);
router.post("/:id/reset-password", verifyAdmin, resetStudentPassword);

export default router;
