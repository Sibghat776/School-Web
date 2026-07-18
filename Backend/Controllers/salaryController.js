import SalaryInfo from "../Models/SalaryInfo.js";
import Teacher from "../Models/Teacher.js";
import { createSuccess, createError } from "../utils/commonFunctions.js";

// @desc   Create salary record for a teacher (admin only)
// @route  POST /api/admin/salary
export const createSalary = async (req, res, next) => {
  try {
    const { teacherId, employeeCode, joiningDate, monthlySalary, status, notes } = req.body;
    if (!teacherId || !employeeCode || !joiningDate || !monthlySalary) {
      return next(createError(400, "Missing required salary fields"));
    }
    // Ensure teacher exists
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) return next(createError(404, "Teacher not found"));

    const salary = await SalaryInfo.create({
      teacherId,
      employeeCode,
      joiningDate,
      monthlySalary,
      status: status || "Active",
      notes,
    });
    // Link salary to teacher
    teacher.salaryInfo = salary._id;
    await teacher.save();

    const data = createSuccess(201, "Salary record created", { salary });
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

// @desc   Get all salary records (admin only)
// @route  GET /api/admin/salary
export const getAllSalaries = async (req, res, next) => {
  try {
    const salaries = await SalaryInfo.find().populate("teacherId", "name email");
    const data = createSuccess(200, "Fetched salary records", { salaries });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// @desc   Update a salary record (admin only)
// @route  PATCH /api/admin/salary/:id
export const updateSalary = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const salary = await SalaryInfo.findByIdAndUpdate(id, updates, { new: true });
    if (!salary) return next(createError(404, "Salary record not found"));
    const data = createSuccess(200, "Salary record updated", { salary });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// @desc   Delete a salary record (admin only)
// @route  DELETE /api/admin/salary/:id
export const deleteSalary = async (req, res, next) => {
  try {
    const { id } = req.params;
    const salary = await SalaryInfo.findByIdAndDelete(id);
    if (!salary) return next(createError(404, "Salary record not found"));
    // Remove reference from teacher if exists
    await Teacher.findByIdAndUpdate(salary.teacherId, { $unset: { salaryInfo: "" } });
    const data = createSuccess(200, "Salary record deleted", { salary });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

