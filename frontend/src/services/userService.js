// services/userService.js
import { apiFetch } from "./api";

export const loginUser = async (credentials) => {
  return apiFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
};

export const registerUser = async (userData) => {
  return apiFetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

export const fetchUsers = async () => {
  return apiFetch("/api/users");
};
