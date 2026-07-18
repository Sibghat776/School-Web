import mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema({
  parentName: { type: String, required: true },
  studentName: { type: String },
  studentGRNumber: { type: String },
  contactNumber: { type: String, required: true },
  email: { type: String },
  complaintCategory: {
    type: String,
    enum: ["Academic", "Behavioral", "Fee/Finance", "Facility", "Staff", "Other"],
    required: true,
  },
  complaintMessage: { type: String, required: true },
  status: { type: String, enum: ["Pending", "In Review", "Resolved"], default: "Pending" },
  adminResponse: { type: String },
}, { timestamps: true });

export default mongoose.model("Complaint", ComplaintSchema);
