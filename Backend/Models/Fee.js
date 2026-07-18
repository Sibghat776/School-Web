import mongoose from "mongoose";

const FeeSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  grNumber: { type: String, required: true },
  className: { type: String, required: true },
  feeType: { type: String, required: true }, // e.g. "Tuition", "Exam", "Transport"
  amount: { type: Number, required: true },
  dueDate: { type: String, required: true },  // YYYY-MM-DD
  status: { type: String, enum: ["Pending", "Paid", "Overdue"], default: "Pending" },
  paidDate: { type: String },
  paidAmount: { type: Number },
  paymentMethod: { type: String },
  remarks: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
}, { timestamps: true });

export default mongoose.model("Fee", FeeSchema);
