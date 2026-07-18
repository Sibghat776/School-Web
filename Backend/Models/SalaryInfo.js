import mongoose from "mongoose";

const SalaryInfoSchema = new mongoose.Schema({
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
  employeeCode: { type: String, required: true, unique: true },
  joiningDate: { type: Date, required: true },
  monthlySalary: { type: Number, required: true },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  notes: { type: String },
}, { timestamps: true });

export default mongoose.model("SalaryInfo", SalaryInfoSchema);
