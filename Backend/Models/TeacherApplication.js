import mongoose from "mongoose";

const TeacherApplicationSchema = new mongoose.Schema({
  teacherName: { type: String, required: true, trim: true },
  fatherName: { type: String, required: true, trim: true },
  classAssigned: { type: String, required: true, trim: true },
  qualification: { type: String, required: true, trim: true },
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
}, { timestamps: true });

export default mongoose.model("TeacherApplication", TeacherApplicationSchema);
