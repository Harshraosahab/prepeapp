import Leaderboard from "../models/Leaderboard.js";

// Get leaderboard
export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find().populate("user", "name email").sort({ score: -1 }).limit(100);
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// User: Update their own score
export const updateUserScore = async (req, res) => {
  try {
    const { score } = req.body;
    const userId = req.user._id;
    
    const existingEntry = await Leaderboard.findOne({ user: userId });
    
    if (existingEntry) {
      // Update score if new score is higher
      if (score > existingEntry.score) {
        existingEntry.score = score;
        await existingEntry.save();
      }
      res.json(existingEntry);
    } else {
      // Create new entry
      const newEntry = await Leaderboard.create({ user: userId, score });
      res.json(newEntry);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: Update leaderboard
export const updateLeaderboard = async (req, res) => {
  try {
    const { userId, score } = req.body;
    const entry = await Leaderboard.findOneAndUpdate(
      { user: userId },
      { score, user: userId },
      { new: true, upsert: true }
    ).populate("user", "name email");
    res.json(entry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
