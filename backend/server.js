import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// --- ROUTES ---
import healthRoute from "./routes/health.js";
import seedRoute from "./routes/seed.js";
import searchRoute from "./routes/search.js";   // <-- FEHLTE
import teamRoute from "./routes/team.js";       // <-- FEHLTE

app.use("/api/health", healthRoute);
app.use("/api/seed", seedRoute);
app.use("/api/search", searchRoute);  // <-- FEHLTE
app.use("/api/team", teamRoute);      // <-- FEHLTE

// --- MONGO CONNECTION ---
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("❌ ERROR: MONGO_URI not set!");
  process.exit(1);
}

mongoose
  .connect(mongoUri, { serverSelectionTimeoutMS: 30000 })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// --- START SERVER ---
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 API running on port ${PORT}`);
});
