import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  grNumber: { type: String, required: true },
  className: { type: String, required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  status: { type: String, enum: ["Present", "Absent", "Late", "Leave"], default: "Present" },
  markedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
}, { timestamps: true });

AttendanceSchema.index({ student: 1, date: 1 }, { unique: true });

export default mongoose.model("Attendance", AttendanceSchema);
