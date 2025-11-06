import React, { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({ type: "", message: "" });

  const showNotification = (type, message, duration = 3000) => {
    setNotification({ type, message });
    setTimeout(() => setNotification({ type: "", message: "" }), duration);
  };

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
