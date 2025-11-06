import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Quiz from "../models/Quiz.js";

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  try {
    await User.deleteMany();
    await Quiz.deleteMany();

    const admin = await User.create({
      name: "Admin",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
    });

    const quiz1 = await Quiz.create({
      title: "Sample Quiz 1",
      description: "Test Quiz 1",
      difficulty: "Easy",
      questions: [{ question: "1+1?", answer: "2" }],
    });

    console.log("Data seeded successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
