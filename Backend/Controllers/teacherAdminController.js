import Teacher from "../Models/Teacher.js";
import { createSuccess, createError } from "../utils/commonFunctions.js";

// @desc   Get all teachers (admin only)
// @route  GET /api/admin/teachers
export const getAllTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find().select('-password').sort({ createdAt: -1 });
    const data = createSuccess(200, "Fetched teachers", { teachers });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// @desc   Update teacher (admin only)
// @route  PATCH /api/admin/teacher/:id
export const updateTeacher = async (req, res, next) => {
  try {
    const { id } = req.params;
    const allowed = ["status", "classAssigned", "salaryInfo"]; // salaryInfo is ObjectId
    const updates = {};
    allowed.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });
    const teacher = await Teacher.findByIdAndUpdate(id, updates, { new: true }).select('-password');
    if (!teacher) return next(createError(404, "Teacher not found"));
    const data = createSuccess(200, "Teacher updated", { teacher });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// @desc   Delete teacher (admin only)
// @route  DELETE /api/admin/teacher/:id
export const deleteTeacher = async (req, res, next) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findByIdAndDelete(id);
    if (!teacher) return next(createError(404, "Teacher not found"));
    const data = createSuccess(200, "Teacher deleted", { teacher });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

