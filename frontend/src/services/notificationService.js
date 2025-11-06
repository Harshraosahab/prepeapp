// services/notificationService.js
import { apiFetch } from "./api";

export const getNotifications = async () => {
  return apiFetch("/api/notifications");
};

export const markNotificationRead = async (notificationId) => {
  return apiFetch(`/api/notifications/${notificationId}/read`, {
    method: "PATCH",
  });
};
