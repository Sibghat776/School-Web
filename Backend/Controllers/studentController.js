import Student from "../Models/Student.js";
import bcrypt from "bcrypt";
import { createSuccess, createError } from "../utils/commonFunctions.js";

// Admin: create a student account (also sets default password = grNumber)
export const createStudent = async (req, res, next) => {
  try {
    const {
      name, grNumber, email, className, section, parentName,
      parentContact, address, dateOfBirth, gender, password,
    } = req.body;

    if (!name || !grNumber) {
      return next(createError(400, "Name and GR number are required"));
    }

    const exists = await Student.findOne({ grNumber });
    if (exists) return next(createError(409, "Student with this GR number already exists"));

    const student = await Student.create({
      name: name.trim(),
      grNumber: grNumber.trim(),
      email,
      className,
      section,
      parentName,
      parentContact,
      address,
      dateOfBirth,
      gender,
      password: password || grNumber, // default password = grNumber
    });

    const data = createSuccess(201, "Student created", { student });
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

// Admin: list students (with optional search/filter)
export const getStudents = async (req, res, next) => {
  try {
    const { search, className, status } = req.query;
    const filter = {};
    if (className) filter.className = className;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { grNumber: { $regex: search, $options: "i" } },
        { parentName: { $regex: search, $options: "i" } },
      ];
    }
    const students = await Student.find(filter).select("-password").sort({ createdAt: -1 });
    const data = createSuccess(200, "Students fetched", { students, count: students.length });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// Admin: get one student
export const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id).select("-password");
    if (!student) return next(createError(404, "Student not found"));
    const data = createSuccess(200, "Student fetched", { student });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// Admin: update student
export const updateStudent = async (req, res, next) => {
  try {
    const updates = req.body;
    if (updates.password) delete updates.password; // password change handled separately
    const student = await Student.findByIdAndUpdate(req.params.id, updates, { new: true }).select("-password");
    if (!student) return next(createError(404, "Student not found"));
    const data = createSuccess(200, "Student updated", { student });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// Admin: delete student
export const deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return next(createError(404, "Student not found"));
    const data = createSuccess(200, "Student deleted", { student });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// Admin: reset student password
export const resetStudentPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const student = await Student.findById(req.params.id);
    if (!student) return next(createError(404, "Student not found"));
    student.password = password || student.grNumber;
    await student.save();
    const data = createSuccess(200, "Password reset", { student: { id: student._id, grNumber: student.grNumber } });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// Student (self): get own profile
export const getOwnProfile = async (req, res, next) => {
  try {
    const student = await Student.findById(req.user.id).select("-password");
    if (!student) return next(createError(404, "Student not found"));
    const data = createSuccess(200, "Profile fetched", { student });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// Student (self): update own profile (limited fields)
export const updateOwnProfile = async (req, res, next) => {
  try {
    const allowed = ["email", "parentContact", "address"];
    const updates = {};
    allowed.forEach((f) => { if (req.body[f] !== undefined) updates[f] = req.body[f]; });
    const student = await Student.findByIdAndUpdate(req.user.id, updates, { new: true }).select("-password");
    const data = createSuccess(200, "Profile updated", { student });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// Student (self): change password
export const changeOwnPassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) return next(createError(400, "Current and new password required"));
    const student = await Student.findById(req.user.id);
    if (!student) return next(createError(404, "Student not found"));
    const match = await bcrypt.compare(currentPassword, student.password);
    if (!match) return next(createError(401, "Current password is incorrect"));
    student.password = newPassword;
    await student.save();
    const data = createSuccess(200, "Password changed", {});
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

