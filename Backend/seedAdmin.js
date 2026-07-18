import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./Models/Admin.js";
import dns from "dns";

dotenv.config();
dns.setServers(['8.8.8.8', '8.8.4.4']);

const MONGO = process.env.MONGO;
const email = process.argv[2] || "noorpubsch@gmail.com";
const password = process.argv[3] || "zfsmsma@123";
const name = process.argv[4] || "NPS1";

async function seed() {
  await mongoose.connect(MONGO);

  // Upsert so there is exactly ONE admin with the requested credentials,
  // regardless of any stale email that may already exist in the DB.
  const anyAdmin = await Admin.findOne({});
  if (anyAdmin) {
    anyAdmin.name = name;
    anyAdmin.email = email;
    anyAdmin.password = password; // pre-save hook hashes it
    await anyAdmin.save();
    console.log("Admin updated (existing doc):", email, "| password:", password);
  } else {
    const admin = new Admin({ name, email, password });
    await admin.save();
    console.log("Admin created:", email, "| password:", password);
  }

  // --- VERIFY: re-read from DB to confirm it is actually persisted ---
  const saved = await Admin.findOne({ email }).select("+password");
  if (!saved) {
    console.error("VERIFY FAILED: admin not found in DB after save");
    process.exit(1);
  }
  const isHashed = typeof saved.password === "string" && saved.password.startsWith("$2");
  console.log("VERIFY -> _id:", saved._id);
  console.log("VERIFY -> name:", saved.name);
  console.log("VERIFY -> email:", saved.email);
  console.log("VERIFY -> role:", saved.role, "| isAdmin:", saved.isAdmin);
  console.log("VERIFY -> passwordHashed:", isHashed, "(", saved.password.slice(0, 7) + "... )");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
