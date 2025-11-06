import express from "express";
import { getNotifications, createNotification, markAsRead } from "../controllers/notificationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getNotifications);
router.post("/", protect, createNotification);
router.put("/read/:id", protect, markAsRead);

export default router;
