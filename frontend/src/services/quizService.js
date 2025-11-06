// services/quizService.js
import { apiFetch } from "./api";

export const getAllQuizzes = async () => {
  return apiFetch("/api/quizzes");
};

export const getQuizById = async (id) => {
  return apiFetch(`/api/quizzes/${id}`);
};

export const submitQuiz = async (quizId, answers) => {
  return apiFetch(`/api/quizzes/${quizId}/submit`, {
    method: "POST",
    body: JSON.stringify({ answers }),
  });
};
