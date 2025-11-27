import express from "express";
import mongoose from "mongoose";
import { germany_1 } from "../seedData/germany_1.js";
import { germany_2 } from "../seedData/germany_2.js";
import { germany_3 } from "../seedData/germany_3.js";
import { england_1 } from "../seedData/england_1.js";
import { england_2 } from "../seedData/england_2.js";
import { england_3 } from "../seedData/england_3.js";
import { national_teams } from "../seedData/national_teams.js";

import Team from "../models/Team.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const teams = [
      ...germany_1,
      ...germany_2,
      ...germany_3,
      ...england_1,
      ...england_2,
      ...england_3,
      ...national_teams
    ];

    await Team.deleteMany({});
    const result = await Team.insertMany(teams);

    res.json({ status: "ok", imported: result.length });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

export default router;
