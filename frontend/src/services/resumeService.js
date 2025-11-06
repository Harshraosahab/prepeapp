// services/resumeService.js
import { apiFetch } from "./api";

export const uploadResume = async (resumeData) => {
  // If using FormData for file upload
  return apiFetch("/api/resumes", {
    method: "POST",
    body: resumeData, // FormData instance
  });
};

export const getResume = async (userId) => {
  return apiFetch(`/api/resumes/${userId}`);
};
