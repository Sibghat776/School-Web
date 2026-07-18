import express from "express";
import {
  submitComplaint,
  getAllComplaints,
  updateComplaintStatus,
  deleteComplaint,
} from "../Controllers/complaintController.js";
import { verifyAdmin } from "../utils/commonFunctions.js";

const router = express.Router();

// Public endpoint: submit a complaint
router.post("/", submitComplaint);

// Admin-protected routes
router.get("/", verifyAdmin, getAllComplaints);
router.patch("/:id", verifyAdmin, updateComplaintStatus);
router.delete("/:id", verifyAdmin, deleteComplaint);

export default router;
