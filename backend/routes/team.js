import express from "express";
import Team from "../models/team.js";

const router = express.Router();

// Alle Teams abrufen
router.get("/", async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Team nach ID abrufen
router.get("/:id", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ error: "Team not found" });
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
