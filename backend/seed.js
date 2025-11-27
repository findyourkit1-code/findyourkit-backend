import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// IMPORT ALL LEAGUE FILES
import { germany_1 } from "./seedData/germany_1.js";
import { germany_2 } from "./seedData/germany_2.js";
import { germany_3 } from "./seedData/germany_3.js";

import { england_1 } from "./seedData/england_1.js";
import { england_2 } from "./seedData/england_2.js";
import { england_3 } from "./seedData/england_3.js";

// ... you can import the rest similarly
import { national_teams } from "./seedData/national_teams.js";

// COMBINE ALL TEAMS HERE
const teams = [
  ...germany_1,
  ...germany_2,
  ...germany_3,
  ...england_1,
  ...england_2,
  ...england_3,
  ...national_teams
];

// MODEL
const teamSchema = new mongoose.Schema({
  name: String,
  country: String,
  league: String,
  tier: Number
});
const Team = mongoose.model("Team", teamSchema);

async function seed() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) { console.error("Missing MONGO_URI"); process.exit(1); }

  await mongoose.connect(mongoUri);
  await Team.deleteMany({});
  const res = await Team.insertMany(teams);
  console.log("Imported:", res.length);
  await mongoose.disconnect();
}

seed();