import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import mongoose from "mongoose";

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
  })
);

app.use(helmet());

// ------------------- Health Route -------------------
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend Running 🚀",
  });
});

// ------------------- Routes -------------------
app.use("/api/contact", contactRoute);
app.use("/api/gallery", galleryRouter);
app.use("/api/registration", registrationRouter);

// ------------------- Error Handler -------------------
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    status: err.status || 500,
    message: err.message || "Something went wrong",
  });
});

// ------------------- MongoDB Connection -------------------
const MONGO = process.env.MONGO;

if (!MONGO) {
  throw new Error("MongoDB URI missing in .env");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO)
      .then((mongoose) => {
        console.log("✅ MongoDB Connected");
        return mongoose;
      })
      .catch((err) => {
        console.error("❌ MongoDB Error:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// ------------------- Localhost Server -------------------
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;

  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on ${PORT}`);
    });
  });
}

// ------------------- Vercel Handler -------------------
export default async function handler(req, res) {
  await connectDB();
  return app(req, res);
}