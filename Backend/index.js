import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import mongoose from "mongoose";
import createError from "http-errors"; // agar aap use kar rahe ho
import { contactRoute } from "./Routes/contactRoute.js";
import { galleryRouter } from "./Routes/galleryRoute.js";
import { registrationRouter } from "./Routes/registrationRoute.js";

dotenv.config();

const app = express();

// ------------------- Middlewares -------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.CLIENT_URL || true,
  credentials: true,
}));
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
    stack: err.stack
  });
});

// ------------------- DB Connection -------------------
const connectDB = async () => {
  const cached = global.mongoose || {};
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const MONGO = process.env.MONGO; // Vercel env variable name
    if (!MONGO) throw createError(500, "MongoDB URI not found in env");

    cached.promise = mongoose.connect(MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongooseInstance) => {
      console.log("✅ MongoDB Connected");
      return mongooseInstance;
    });
  }

  cached.conn = await cached.promise;
  global.mongoose = cached; // cache globally
  return cached.conn;
};

// ------------------- Local server only -------------------
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  connectDB().then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
  }).catch(err => {
    console.error("DB connection failed:", err);
    process.exit(1);
  });
}

// ------------------- Vercel Export -------------------
await connectDB(); // ensure DB connected in serverless function
export default app;