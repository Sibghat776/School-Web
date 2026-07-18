import express from "express";
import {
  createDiary,
  getDiary,
  updateDiary,
  deleteDiary,
} from "../Controllers/diaryController.js";
import { verifyRole } from "../utils/commonFunctions.js";

const router = express.Router();

// Teacher/Admin: manage diary
router.post("/", verifyRole(["admin", "teacher"]), createDiary);
router.patch("/:id", verifyRole(["admin", "teacher"]), updateDiary);
router.delete("/:id", verifyRole(["admin", "teacher"]), deleteDiary);

// All roles can view diary (filtered by class on frontend)
router.get("/", verifyRole(["admin", "teacher", "student", "parent"]), getDiary);

export default router;
