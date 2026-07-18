import Admin from "../Models/Admin.js";
import Teacher from "../Models/Teacher.js";
import Student from "../Models/Student.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createSuccess, createError } from "../utils/commonFunctions.js";

const generateToken = (user) => {
  const payload = {
    id: user._id,
    role: user.role,
    isAdmin: user.isAdmin || false,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Admin login (replaces hard‑coded check)
export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = (email || "").trim().toLowerCase();
    const admin = await Admin.findOne({
      email: { $regex: new RegExp(`^${normalizedEmail.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i") },
    });
    if (!admin) return next(createError(401, "Invalid credentials"));
    const match = await bcrypt.compare(password, admin.password);
    if (!match) return next(createError(401, "Invalid credentials"));
    const token = generateToken(admin);
    const data = createSuccess(200, "Admin logged in", { token });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// Teacher login
export const teacherLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const teacher = await Teacher.findOne({ email });
    if (!teacher) return next(createError(401, "Invalid credentials"));
    if (teacher.status !== "Approved") return next(createError(403, "Teacher account not approved"));
    const match = await bcrypt.compare(password, teacher.password);
    if (!match) return next(createError(401, "Invalid credentials"));
    const token = generateToken(teacher);
    const data = createSuccess(200, "Teacher logged in", { token });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// Student login (GR number + password)
export const studentLogin = async (req, res, next) => {
  try {
    const { grNumber, password } = req.body;
    const student = await Student.findOne({ grNumber });
    if (!student) return next(createError(401, "Invalid credentials"));
    const match = await bcrypt.compare(password, student.password);
    if (!match) return next(createError(401, "Invalid credentials"));
    const token = generateToken(student);
    const data = createSuccess(200, "Student logged in", { token });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

