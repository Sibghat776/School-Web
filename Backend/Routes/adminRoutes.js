import express from "express";
import Admin from "../Models/Admin.js";
import bcrypt from "bcrypt";
import { createSuccess, createError, verifyAdmin } from "../utils/commonFunctions.js";

const router = express.Router();

// Get admin profile
router.get("/me", verifyAdmin, async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.user.id).select("-password");
    if (!admin) return next(createError(404, "Admin not found"));
    const data = createSuccess(200, "Profile fetched", { admin });
    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
});

// Change admin password
router.post("/change-password", verifyAdmin, async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) return next(createError(400, "Current and new password required"));
    const admin = await Admin.findById(req.user.id);
    if (!admin) return next(createError(404, "Admin not found"));
    const match = await bcrypt.compare(currentPassword, admin.password);
    if (!match) return next(createError(401, "Current password is incorrect"));
    admin.password = newPassword;
    await admin.save();
    const data = createSuccess(200, "Password changed", {});
    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
});

export default router;
