import express from "express";
import { getStats, manageUsers, manageQuizzes, manageResumes } from "../controllers/adminController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin dashboard stats
router.get("/stats", protect, admin, getStats);

// Manage users
router.get("/users", protect, admin, manageUsers);

// Manage quizzes
router.get("/quizzes", protect, admin, manageQuizzes);

// Manage resumes
router.get("/resumes", protect, admin, manageResumes);

export default router;
