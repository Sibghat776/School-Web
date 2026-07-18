import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dns from "dns";

import { contactRoute } from "./Routes/contactRoute.js";
import { galleryRouter } from "./Routes/galleryRoute.js";
import { registrationRouter } from "./Routes/registrationRoute.js";

dotenv.config();
dns.setServers(['8.8.8.8', '8.8.4.4']);
import authRoutes from "./Routes/authRoutes.js";
import teacherApplicationRoutes from "./Routes/teacherApplicationRoutes.js";
import salaryRoutes from "./Routes/salaryRoutes.js";
import complaintRoutes from "./Routes/complaintRoutes.js";
import teacherAdminRoutes from "./Routes/teacherAdminRoutes.js";
import teacherSelfRoutes from "./Routes/teacherSelfRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";
import studentRoutes from "./Routes/studentRoutes.js";
import attendanceRoutes from "./Routes/attendanceRoutes.js";
import resultRoutes from "./Routes/resultRoutes.js";
import diaryRoutes from "./Routes/diaryRoutes.js";
import feeRoutes from "./Routes/feeRoutes.js";
import notificationRoutes from "./Routes/notificationRoutes.js";

const app = express();

// ---------------- Middleware ----------------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ---------------- CORS ----------------
// Reflect the request Origin so credentials (Authorization header) work in
// both dev (localhost:5173) and prod. Avoids the invalid "*" + credentials combo.
const allowedOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // allow non-browser tools / same-origin / listed origins
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true); // reflect any origin but still gate via credentials
    },
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
  })
);

app.use(helmet());

// ---------------- Health ----------------

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend Running 🚀",
  });
});

// ---------------- Routes ----------------

app.use("/api/contact", contactRoute);
app.use("/api/gallery", galleryRouter);
app.use("/api/registration", registrationRouter);
app.use("/api/auth", authRoutes);
app.use("/api/teacher", teacherApplicationRoutes);
app.use("/api/admin", salaryRoutes);
app.use("/api/admin", teacherAdminRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/teacher", teacherSelfRoutes);
app.use("/api/complaint", complaintRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/diary", diaryRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/notifications", notificationRoutes);

// ---------------- Error Handler ----------------

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Iske baad aapka mongoose.connect() ya mongodb ka code aana chahiye
// ---------------- Mongo ----------------

const MONGO = process.env.MONGO;

if (!MONGO) {
  throw new Error("MONGO URI Missing in .env");
}

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGO);

    isConnected = true;

    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed");
    console.error(err);

    process.exit(1);
  }
}

// ---------------- Local Server ----------------

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;

  (async () => {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server Running on Port ${PORT}`);
    });
  })();
}

// ---------------- Vercel ----------------

export default async function handler(req, res) {
  await connectDB();
  return app(req, res);
}