import User from "../models/User.js";
import Quiz from "../models/Quiz.js";
import Resume from "../models/Resume.js";

// Get admin dashboard stats
export const getStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const quizzes = await Quiz.countDocuments();
    const resumes = await Resume.countDocuments();

    res.json({ users, quizzes, resumes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Manage users
export const manageUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Manage quizzes
export const manageQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Manage resumes
export const manageResumes = async (req, res) => {
  try {
    const resumes = await Resume.find().populate("user", "name email");
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
