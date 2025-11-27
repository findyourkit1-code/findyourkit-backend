import express from "express";
import Team from "../models/Team.js";

const router = express.Router();

// Suche nach ZIP oder Name
router.get("/", async (req, res) => {
  try {
    const { zip } = req.query;

    const teams = await Team.find({ zip });
    res.json({ results: teams });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
