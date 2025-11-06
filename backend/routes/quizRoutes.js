import express from "express";
import { getQuizzes, getQuizById, createQuiz, updateQuiz, deleteQuiz } from "../controllers/quizController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getQuizzes);
router.get("/:id", getQuizById);

// Admin only
router.post("/", protect, admin, createQuiz);
router.put("/:id", protect, admin, updateQuiz);
router.delete("/:id", protect, admin, deleteQuiz);

export default router;
