import express from "express";
import Teacher from "../Models/Teacher.js";
import bcrypt from "bcrypt";
import { createSuccess, createError, verifyRole } from "../utils/commonFunctions.js";

const router = express.Router();

// Teacher self profile
router.get("/me", verifyRole(["teacher"]), async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.user.id).select("-password");
    if (!teacher) return next(createError(404, "Teacher not found"));
    const data = createSuccess(200, "Profile fetched", { teacher });
    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
});

// Teacher change password
router.post("/me/change-password", verifyRole(["teacher"]), async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) return next(createError(400, "Current and new password required"));
    const teacher = await Teacher.findById(req.user.id);
    if (!teacher) return next(createError(404, "Teacher not found"));
    const match = await bcrypt.compare(currentPassword, teacher.password);
    if (!match) return next(createError(401, "Current password is incorrect"));
    teacher.password = newPassword;
    await teacher.save();
    const data = createSuccess(200, "Password changed", {});
    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
});

export default router;
