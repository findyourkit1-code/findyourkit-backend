import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import healthRoute from "./routes/health.js";
import searchRoute from "./routes/search.js";
import teamRoute from "./routes/team.js";

const app = express();

app.use(cors());
app.use(express.json());

// Health-check route
app.use("/api/health", healthRoute);

// API routes
app.use("/api/search", searchRoute);
app.use("/api/team", teamRoute);

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error("❌ ERROR: MONGO_URI is not set!");
  process.exit(1);
}

mongoose
  .connect(mongoUri, {
    serverSelectionTimeoutMS: 30000,
  })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 API running on port ${PORT}`));
