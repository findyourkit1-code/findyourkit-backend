import express from "express";
import Team from "../models/Team.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to load JSON file
function loadJSON(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

router.get("/", async (req, res) => {
  try {
    console.log("🔄 Seeding database...");

    // Delete existing teams
    await Team.deleteMany({});
    console.log("🗑️ Deleted old teams.");

    const seedRoot = path.join(__dirname, "..", "seedData");
    const countries = fs.readdirSync(seedRoot);

    let total = 0;

    for (const country of countries) {
      const countryPath = path.join(seedRoot, country);

      // Skip non-directories
      if (!fs.lstatSync(countryPath).isDirectory()) continue;

      const leagueFiles = fs.readdirSync(countryPath);

      for (const leagueFile of leagueFiles) {
        const fullPath = path.join(countryPath, leagueFile);

        if (!leagueFile.endsWith(".json")) continue;

        const data = loadJSON(fullPath);

        await Team.insertMany(data);
        total += data.length;

        console.log(`✔ Imported ${data.length} teams from ${country}/${leagueFile}`);
      }
    }

    res.json({
      status: "success",
      total,
      message: `Imported ${total} teams successfully`
    });

  } catch (err) {
    console.error("❌ Seed error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
