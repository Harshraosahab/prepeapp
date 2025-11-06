import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    score: { type: Number, default: 0 },
    rank: { type: Number },
  },
  { timestamps: true }
);

const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);
export default Leaderboard;
