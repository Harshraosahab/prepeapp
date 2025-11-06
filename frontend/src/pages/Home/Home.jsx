import React, { useEffect, useState } from "react";
import "./Home.css";
import QuizCard from "../../components/QuizCard/QuizCard";
import ResumeForm from "../../components/ResumeForm/ResumeForm";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Home = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch quizzes dynamically (you’ll replace URL with your backend)
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/quizzes");
        const data = await response.json();
        setQuizzes(data);
      } catch (error) {
        console.error("Failed to load quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <motion.section
        className="hero-section"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Welcome to Placement Prep Platform</h1>
        <p>
          Your one-stop destination for placement preparation — practice quizzes,
          build resumes, and get ready for interviews.
        </p>
      </motion.section>

      {/* Quiz Section */}
      <motion.section
        className="quiz-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <h2>Practice Quizzes</h2>

        {loading ? (
          <p className="loading-text">Loading quizzes...</p>
        ) : (
          <div className="quiz-grid">
            {quizzes.length > 0 ? (
              quizzes.map((quiz) => (
                <QuizCard
                  key={quiz._id}
                  title={quiz.title}
                  description={quiz.description}
                  difficulty={quiz.difficulty}
                  questions={quiz.questionsCount}
                />
              ))
            ) : (
              <p className="no-quizzes">No quizzes available right now.</p>
            )}
          </div>
        )}
      </motion.section>

      {/* Resume Builder Section */}
      <motion.section
        className="resume-section"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h2>Build Your Resume</h2>
        <ResumeForm />
      </motion.section>
    </div>
  );
};

export default Home;
