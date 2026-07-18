import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  audience: {
    type: String,
    enum: ["All", "Admin", "Teacher", "Student", "Parent"],
    default: "All",
  },
  className: { type: String }, // target a specific class (optional)
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
}, { timestamps: true });

export default mongoose.model("Notification", NotificationSchema);
