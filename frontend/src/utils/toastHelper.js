import { NOTIFICATION_TYPES } from "./constants";

let toastCallback = null;

export const setToastHandler = (callback) => {
  toastCallback = callback;
};

export const showToast = (message, type = NOTIFICATION_TYPES.INFO) => {
  if (toastCallback) {
    toastCallback({ message, type });
  } else {
    console.warn("Toast handler not set.");
  }
};

export const showSuccess = (msg) => showToast(msg, NOTIFICATION_TYPES.SUCCESS);
export const showError = (msg) => showToast(msg, NOTIFICATION_TYPES.ERROR);
export const showInfo = (msg) => showToast(msg, NOTIFICATION_TYPES.INFO);
