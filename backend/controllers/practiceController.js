import Practice from "../models/Practice.js";

// Create practice session
export const createPractice = async (req, res) => {
  try {
    const practice = await Practice.create({ ...req.body, user: req.user._id });
    res.status(201).json(practice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user practices
export const getUserPractices = async (req, res) => {
  try {
    const practices = await Practice.find({ user: req.user._id }).populate("quiz");
    res.json(practices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
