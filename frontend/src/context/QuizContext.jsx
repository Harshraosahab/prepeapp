import React, { createContext, useState, useEffect } from "react";
import { apiFetch } from "../services/api";

// eslint-disable-next-line react-refresh/only-export-components
export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const data = await apiFetch("/api/quizzes");
      if (Array.isArray(data)) {
        setQuizzes(data);
      } else {
        setQuizzes([]);
      }
    } catch (err) {
      console.error("Error fetching quizzes:", err);
      setQuizzes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <QuizContext.Provider value={{ quizzes, loading, refreshQuizzes: fetchQuizzes }}>
      {children}
    </QuizContext.Provider>
  );
};
