import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: "ok",
    mongoUriPresent: !!process.env.MONGO_URI,
    mongoUri: process.env.MONGO_URI ? "SET" : "NOT SET",
    nodeEnv: process.env.NODE_ENV || "unknown",
    timestamp: new Date().toISOString()
  });
});

export default router;
