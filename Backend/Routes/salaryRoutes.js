import express from "express";
import { createSalary, getAllSalaries, updateSalary, deleteSalary } from "../Controllers/salaryController.js";
import { verifyAdmin } from "../utils/commonFunctions.js";

const router = express.Router();

router.post("/salary", verifyAdmin, createSalary);
router.get("/salary", verifyAdmin, getAllSalaries);
router.patch("/salary/:id", verifyAdmin, updateSalary);
router.delete("/salary/:id", verifyAdmin, deleteSalary);

export default router;
