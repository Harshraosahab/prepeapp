import express from "express";
import { loginUser, registerUser, getUserProfile } from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);

// Protected
router.get("/auth/me", protect, getUserProfile);

// Admin only
router.get("/", protect, admin, getUserProfile);

export default router;
