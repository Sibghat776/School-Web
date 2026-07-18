import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  grNumber: { type: String, required: true },
  className: { type: String, required: true },
  examType: { type: String, required: true }, // e.g. "Mid Term", "Final"
  subject: { type: String, required: true },
  marksObtained: { type: Number, required: true },
  totalMarks: { type: Number, required: true, default: 100 },
  grade: { type: String },
  session: { type: String }, // e.g. "2025-2026"
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
}, { timestamps: true });

ResultSchema.index({ student: 1, examType: 1, subject: 1 }, { unique: true });

export default mongoose.model("Result", ResultSchema);
