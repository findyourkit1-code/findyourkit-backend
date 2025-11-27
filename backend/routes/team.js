import express from "express";
import Team from "../models/Team.js";

const router = express.Router();

// Team ID abrufen
router.get("/:id", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
