import express from "express";
import {
  createFee,
  getFees,
  payFee,
  updateFee,
  deleteFee,
} from "../Controllers/feeController.js";
import { verifyRole } from "../utils/commonFunctions.js";

const router = express.Router();

// Admin/Accountant: manage fees
router.post("/", verifyRole(["admin", "accountant"]), createFee);
router.patch("/:id", verifyRole(["admin", "accountant"]), updateFee);
router.delete("/:id", verifyRole(["admin", "accountant"]), deleteFee);

// Mark as paid (admin/accountant)
router.post("/:id/pay", verifyRole(["admin", "accountant"]), payFee);

// Admin/Accountant/Student can view
router.get("/", verifyRole(["admin", "accountant", "student"]), getFees);

export default router;
