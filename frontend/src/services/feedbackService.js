// services/feedbackService.js
import { apiFetch } from "./api";

export const submitFeedback = async (feedbackData) => {
  return apiFetch("/api/feedback", {
    method: "POST",
    body: JSON.stringify(feedbackData),
  });
};

export const getFeedback = async () => {
  return apiFetch("/api/feedback");
};
