import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./QuizCard.css";

const QuizCard = ({ title, description, difficulty, questions, quizId }) => {
  const navigate = useNavigate();

  const handleStart = () => {
    if (quizId) {
      navigate(`/quiz?id=${quizId}`);
    } else {
      navigate("/quiz");
    }
  };

  return (
    <motion.div
      className="quiz-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="quiz-card-header">
        <h3>{title}</h3>
        <span className={`difficulty ${difficulty.toLowerCase()}`}>
          {difficulty}
        </span>
      </div>

      <p className="quiz-desc">{description}</p>
      <p className="quiz-meta">{questions?.length || questions || 0} Questions</p>

      <motion.button
        className="btn-start"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleStart}
      >
        Start Quiz
      </motion.button>
    </motion.div>
  );
};

export default QuizCard;
