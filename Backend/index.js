import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import mongoose from "mongoose";
import createError from "http-errors";

import { contactRoute } from "./Routes/contactRoute.js";
import { galleryRouter } from "./Routes/galleryRoute.js";
import { registrationRouter } from "./Routes/registrationRoute.js";

dotenv.config();

const app = express();

// ------------------- Middlewares -------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL || true,
    credentials: true,
  }),
);
app.use(helmet());

// ------------------- Routes -------------------
app.use("/api/contact", contactRoute);
app.use("/api/gallery", galleryRouter);
app.use("/api/registration", registrationRouter);

// ------------------- Error Handler -------------------
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    status,
    message: err.message || "Something went wrong",
  });
});

// ------------------- DB CONNECTION (SAFE + VERCEL READY) -------------------
const MONGO = process.env.MONGO;

if (!MONGO) {
  throw new Error("❌ MongoDB URI not found in env");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO).then((m) => {
      console.log("✅ MongoDB Connected");
      return m;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

// ------------------- LOCAL SERVER ONLY -------------------
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;

  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`🚀 Server running on ${PORT}`);
      });
    })
    .catch((err) => {
      console.error("DB connection failed:", err);
      process.exit(1);
    });
}

// ------------------- VERCEL HANDLER -------------------
export default async function handler(req, res) {
  await connectDB();
  return app(req, res);
}
