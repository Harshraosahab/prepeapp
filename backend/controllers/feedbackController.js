import Feedback from "../models/Feedback.js";

// Create feedback
export const createFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.create({ ...req.body, user: req.user._id });
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all feedbacks (Admin)
export const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("user", "name email");
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
