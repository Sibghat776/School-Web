import Complaint from "../Models/Complaint.js";
import { createSuccess, createError } from "../utils/commonFunctions.js";

// Public: submit a complaint
export const submitComplaint = async (req, res, next) => {
  try {
    const {
      parentName,
      studentName,
      studentGRNumber,
      contactNumber,
      email,
      complaintCategory,
      complaintMessage,
    } = req.body;

    if (!parentName || !contactNumber || !complaintCategory || !complaintMessage) {
      return next(createError(400, "Required complaint fields are missing"));
    }

    const complaint = await Complaint.create({
      parentName,
      studentName,
      studentGRNumber,
      contactNumber,
      email,
      complaintCategory,
      complaintMessage,
    });

    const data = createSuccess(201, "Complaint submitted successfully", { complaint });
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

// Admin: get all complaints
export const getAllComplaints = async (req, res, next) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    const data = createSuccess(200, "Complaints fetched", { complaints });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// Admin: update complaint status / response
export const updateComplaintStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, adminResponse } = req.body;
    const updates = {};
    if (status) updates.status = status;
    if (adminResponse !== undefined) updates.adminResponse = adminResponse;

    const complaint = await Complaint.findByIdAndUpdate(id, updates, { new: true });
    if (!complaint) return next(createError(404, "Complaint not found"));

    const data = createSuccess(200, "Complaint updated", { complaint });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// Admin: delete complaint
export const deleteComplaint = async (req, res, next) => {
  try {
    const { id } = req.params;
    const complaint = await Complaint.findByIdAndDelete(id);
    if (!complaint) return next(createError(404, "Complaint not found"));

    const data = createSuccess(200, "Complaint deleted", { complaint });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

