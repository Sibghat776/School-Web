import express from "express";
import {
  createNotification,
  getNotifications,
  deleteNotification,
} from "../Controllers/notificationController.js";
import { verifyRole } from "../utils/commonFunctions.js";

const router = express.Router();

// Admin: create & delete
router.post("/", verifyRole(["admin"]), createNotification);
router.delete("/:id", verifyRole(["admin"]), deleteNotification);

// All authenticated roles can view
router.get("/", verifyRole(["admin", "teacher", "student", "parent", "accountant", "reception"]), getNotifications);

export default router;
