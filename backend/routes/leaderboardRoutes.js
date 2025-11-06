import express from "express";
import { getLeaderboard, updateLeaderboard, updateUserScore } from "../controllers/leaderboardController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getLeaderboard);
router.post("/update", protect, updateUserScore); // Users can update their own score
router.post("/", protect, admin, updateLeaderboard); // Admin can recalc leaderboard

export default router;
