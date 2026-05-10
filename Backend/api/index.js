import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import mongoose from "mongoose";

import { contactRoute } from "../Routes/contactRoute.js";
import { galleryRouter } from "../Routes/galleryRoute.js";
import { registrationRouter } from "../Routes/registrationRoute.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: process.env.MONGO || true,
  credentials: true
}));

app.use(helmet());

// health route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend Running 🚀"
  });
});

// routes
app.use("/api/contact", contactRoute);
app.use("/api/gallery", galleryRouter);
app.use("/api/registration", registrationRouter);

// Mongo connect
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  await mongoose.connect(process.env.MONGO);

  console.log("Mongo Connected");
  isConnected = true;
};

// connect once
await connectDB();

export default app;