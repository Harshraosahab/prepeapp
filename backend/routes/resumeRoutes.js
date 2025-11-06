import express from "express";
import { createResume, getResumes, getResumeByUser } from "../controllers/resumeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected routes
router.get("/", protect, getResumes); // Admin can get all, users get their own
router.get("/my", protect, getResumeByUser); // Get current user's resume
router.post("/", protect, createResume);

export default router;
