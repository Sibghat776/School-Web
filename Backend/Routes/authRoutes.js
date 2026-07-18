import express from "express";
import { adminLogin, teacherLogin, studentLogin } from "../Controllers/authController.js";

const router = express.Router();

router.post("/admin-login", adminLogin);
router.post("/teacher-login", teacherLogin);
router.post("/student-login", studentLogin);

export default router;
