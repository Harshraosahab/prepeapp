import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Quiz from "../models/Quiz.js";
import Resume from "../models/Resume.js";

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const cleanup = async () => {
  try {
    await User.deleteMany();
    await Quiz.deleteMany();
    await Resume.deleteMany();
    console.log("Database cleaned successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

cleanup();
