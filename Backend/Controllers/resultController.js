import Result from "../Models/Result.js";
import Student from "../Models/Student.js";
import { createSuccess, createError } from "../utils/commonFunctions.js";

// Teacher/Admin: add a result
export const addResult = async (req, res, next) => {
  try {
    const { grNumber, className, examType, subject, marksObtained, totalMarks, session } = req.body;
    if (!grNumber || !className || !examType || !subject || marksObtained === undefined) {
      return next(createError(400, "grNumber, className, examType, subject and marksObtained are required"));
    }
    const student = await Student.findOne({ grNumber });
    if (!student) return next(createError(404, "Student not found"));

    const grade = computeGrade(marksObtained, totalMarks || 100);

    const result = await Result.findOneAndUpdate(
      { student: student._id, examType, subject },
      {
        student: student._id,
        grNumber,
        className,
        examType,
        subject,
        marksObtained,
        totalMarks: totalMarks || 100,
        grade,
        session,
        addedBy: req.user.id,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const data = createSuccess(201, "Result saved", { result });
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

// Student: get own results
export const getOwnResults = async (req, res, next) => {
  try {
    const { examType } = req.query;
    const filter = { student: req.user.id };
    if (examType) filter.examType = examType;
    const results = await Result.find(filter).sort({ createdAt: -1 });
    const data = createSuccess(200, "Results fetched", { results });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// Admin/Teacher: get results by class / exam
export const getClassResults = async (req, res, next) => {
  try {
    const { className, examType, grNumber } = req.query;
    const filter = {};
    if (className) filter.className = className;
    if (examType) filter.examType = examType;
    if (grNumber) filter.grNumber = grNumber;
    const results = await Result.find(filter).populate("student", "name grNumber").sort({ createdAt: -1 });
    const data = createSuccess(200, "Results fetched", { results });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// Delete a result (admin/teacher)
export const deleteResult = async (req, res, next) => {
  try {
    const result = await Result.findByIdAndDelete(req.params.id);
    if (!result) return next(createError(404, "Result not found"));
    const data = createSuccess(200, "Result deleted", { result });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

function computeGrade(marks, total) {
  const pct = (marks / total) * 100;
  if (pct >= 90) return "A+";
  if (pct >= 80) return "A";
  if (pct >= 70) return "B";
  if (pct >= 60) return "C";
  if (pct >= 50) return "D";
  return "F";
}

