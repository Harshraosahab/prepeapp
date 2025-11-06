import React, { useEffect } from "react";
import "./Notification.css";

const Notification = ({ type = "info", message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // auto close after 3s
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`notification ${type}`}>
      <div className="notification-content">
        <span className="notification-icon">
          {type === "success" && "✅"}
          {type === "error" && "❌"}
          {type === "info" && "ℹ️"}
        </span>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Notification;
