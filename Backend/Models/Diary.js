import mongoose from "mongoose";

const DiarySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  className: { type: String, required: true },
  section: { type: String },
  subject: { type: String },
  homeworkDate: { type: String },     // YYYY-MM-DD
  dueDate: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
}, { timestamps: true });

export default mongoose.model("Diary", DiarySchema);
