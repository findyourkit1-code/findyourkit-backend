import mongoose from "mongoose";
import { teams } from "./seedData.js";
import dotenv from "dotenv";
dotenv.config();

const mongoUri = process.env.MONGO_URI;

const teamSchema = new mongoose.Schema({
  name: String,
  country: String,
  league: String,
  tier: Number
});
const Team = mongoose.model("Team", teamSchema);

async function seed() {
  await mongoose.connect(mongoUri);
  await Team.deleteMany({});
  const res = await Team.insertMany(teams);
  console.log("Imported teams:", res.length);
  mongoose.disconnect();
}

seed();
