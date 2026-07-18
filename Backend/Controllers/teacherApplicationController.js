import TeacherApplication from "../Models/TeacherApplication.js";
import { createSuccess, createError } from "../utils/commonFunctions.js";

// @desc   Submit teacher application (public)
// @route  POST /api/teacher/apply
export const applyTeacher = async (req, res, next) => {
  try {
    const { teacherName, fatherName, classAssigned, qualification } = req.body;
    if (!teacherName || !fatherName || !classAssigned || !qualification) {
      return next(createError(400, "All fields are required"));
    }
    const application = await TeacherApplication.create({
      teacherName: teacherName.trim(),
      fatherName: fatherName.trim(),
      classAssigned: classAssigned.trim(),
      qualification: qualification.trim(),
    });
    const data = createSuccess(201, "Application submitted", { application });
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

// @desc   Get all teacher applications (admin only)
// @route  GET /api/admin/teacher-applications
export const getAllApplications = async (req, res, next) => {
  try {
    const applications = await TeacherApplication.find().sort({ createdAt: -1 });
    const data = createSuccess(200, "Fetched teacher applications", { applications });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// @desc   Update application status / class / salary info (admin only)
// @route  PATCH /api/admin/teacher/:id
export const updateApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = {};
    const allowed = ["status", "classAssigned", "salaryInfo"];
    allowed.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });
    const updated = await TeacherApplication.findByIdAndUpdate(id, updates, { new: true });
    if (!updated) return next(createError(404, "Application not found"));
    const data = createSuccess(200, "Application updated", { updated });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// @desc   Delete application (admin only)
// @route  DELETE /api/admin/teacher/:id
export const deleteApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await TeacherApplication.findByIdAndDelete(id);
    if (!deleted) return next(createError(404, "Application not found"));
    const data = createSuccess(200, "Application deleted", { deleted });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

