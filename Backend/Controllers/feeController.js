import Fee from "../Models/Fee.js";
import Student from "../Models/Student.js";
import { createSuccess, createError } from "../utils/commonFunctions.js";

// Admin/Accountant: create fee record for a student
export const createFee = async (req, res, next) => {
  try {
    const { grNumber, feeType, amount, dueDate, remarks } = req.body;
    if (!grNumber || !feeType || !amount || !dueDate) {
      return next(createError(400, "grNumber, feeType, amount and dueDate are required"));
    }
    const student = await Student.findOne({ grNumber });
    if (!student) return next(createError(404, "Student not found"));

    const fee = await Fee.create({
      student: student._id,
      grNumber,
      className: student.className,
      feeType,
      amount,
      dueDate,
      remarks,
      createdBy: req.user.id,
    });
    const data = createSuccess(201, "Fee record created", { fee });
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

// List fees (admin filters by className/grNumber/status; student sees own)
export const getFees = async (req, res, next) => {
  try {
    let filter = {};
    if (req.user.role === "student") {
      filter.student = req.user.id;
    } else {
      const { className, grNumber, status } = req.query;
      if (className) filter.className = className;
      if (grNumber) filter.grNumber = grNumber;
      if (status) filter.status = status;
    }
    const fees = await Fee.find(filter).populate("student", "name grNumber").sort({ createdAt: -1 });
    const total = fees.reduce((s, f) => s + (f.amount || 0), 0);
    const paid = fees.filter((f) => f.status === "Paid").reduce((s, f) => s + (f.paidAmount || 0), 0);
    const data = createSuccess(200, "Fees fetched", { fees, summary: { total, paid, pending: total - paid } });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// Mark fee as paid
export const payFee = async (req, res, next) => {
  try {
    const { paidAmount, paymentMethod, paidDate } = req.body;
    const fee = await Fee.findById(req.params.id);
    if (!fee) return next(createError(404, "Fee record not found"));
    fee.status = "Paid";
    fee.paidAmount = paidAmount || fee.amount;
    fee.paymentMethod = paymentMethod;
    fee.paidDate = paidDate || new Date().toISOString().split("T")[0];
    await fee.save();
    const data = createSuccess(200, "Fee marked paid", { fee });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// Update / delete fee
export const updateFee = async (req, res, next) => {
  try {
    const fee = await Fee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!fee) return next(createError(404, "Fee record not found"));
    const data = createSuccess(200, "Fee updated", { fee });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const deleteFee = async (req, res, next) => {
  try {
    const fee = await Fee.findByIdAndDelete(req.params.id);
    if (!fee) return next(createError(404, "Fee record not found"));
    const data = createSuccess(200, "Fee deleted", { fee });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

