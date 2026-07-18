import mongoose from "mongoose";
import bcrypt from "bcrypt";

const TeacherSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, default: "teacher" },
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  classAssigned: { type: String },
  salaryInfo: { type: mongoose.Schema.Types.ObjectId, ref: "SalaryInfo" },
}, { timestamps: true });

// Hash password before saving
TeacherSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.model("Teacher", TeacherSchema);
