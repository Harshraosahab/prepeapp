import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import path from "path";

import connectDB from "./config/db.js";

// Routes
import userRoutes from "./routes/userRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import practiceRoutes from "./routes/practiceRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

// Middleware
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api", userRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/practice", practiceRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/admin", adminRoutes);

// Serve frontend in production
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html")));
}

// Error middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n✅ Server running on port ${PORT}`);
  console.log(`✅ Register: POST http://localhost:${PORT}/api/auth/register`);
  console.log(`✅ Login: POST http://localhost:${PORT}/api/auth/login`);
  console.log(`✅ Get User: GET http://localhost:${PORT}/api/auth/me\n`);
});
