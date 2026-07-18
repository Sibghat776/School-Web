import Attendance from "../Models/Attendance.js";
import Student from "../Models/Student.js";
import { createSuccess, createError } from "../utils/commonFunctions.js";

// Teacher/Admin: mark attendance for a class on a date (bulk)
export const markAttendance = async (req, res, next) => {
  try {
    const { date, className, records } = req.body; // records: [{ grNumber, status }]
    if (!date || !className || !Array.isArray(records) || records.length === 0) {
      return next(createError(400, "date, className and records are required"));
    }

    const results = [];
    for (const rec of records) {
      const student = await Student.findOne({ grNumber: rec.grNumber });
      if (!student) continue;
      const status = rec.status || "Present";
      const updated = await Attendance.findOneAndUpdate(
        { student: student._id, date },
        {
          student: student._id,
          grNumber: student.grNumber,
          className,
          date,
          status,
          markedBy: req.user.id,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      results.push(updated);
    }

    const data = createSuccess(200, "Attendance marked", { results });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// Get attendance for a class on a date
export const getClassAttendance = async (req, res, next) => {
  try {
    const { date, className } = req.query;
    if (!date || !className) return next(createError(400, "date and className are required"));
    const attendance = await Attendance.find({ date, className }).populate("student", "name grNumber");
    const data = createSuccess(200, "Attendance fetched", { attendance });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// Student: get own attendance
export const getOwnAttendance = async (req, res, next) => {
  try {
    const { from, to } = req.query;
    const filter = { student: req.user.id };
    if (from && to) filter.date = { $gte: from, $lte: to };
    const attendance = await Attendance.find(filter).sort({ date: -1 });
    const data = createSuccess(200, "Attendance fetched", { attendance });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// Attendance summary for a student
export const getOwnAttendanceSummary = async (req, res, next) => {
  try {
    const attendance = await Attendance.find({ student: req.user.id });
    const total = attendance.length;
    const present = attendance.filter((a) => a.status === "Present").length;
    const absent = attendance.filter((a) => a.status === "Absent").length;
    const late = attendance.filter((a) => a.status === "Late").length;
    const data = createSuccess(200, "Summary fetched", {
      summary: { total, present, absent, late, percentage: total ? ((present / total) * 100).toFixed(1) : 0 },
    });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

