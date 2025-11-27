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
// If you have team routes, import them like:
// import teamRoute from "./routes/team.js";

app.use("/api/health", healthRoute);
app.use("/api/seed", seedRoute);
// app.use("/api/team", teamRoute);

// --- MONGO CONNECTION ---
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("❌ ERROR: MONGO_URI not set in environment variables");
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// --- START SERVER ---
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🚀 API running on port ${PORT}`);
});
