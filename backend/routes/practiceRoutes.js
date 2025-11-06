import express from "express";
import { createPractice, getUserPractices } from "../controllers/practiceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getUserPractices);
router.post("/", protect, createPractice);

export default router;
