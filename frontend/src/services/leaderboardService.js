// services/leaderboardService.js
import { apiFetch } from "./api";

export const getLeaderboard = async () => {
  return apiFetch("/api/leaderboard");
};
