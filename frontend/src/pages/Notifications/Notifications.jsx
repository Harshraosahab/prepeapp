import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { apiFetch } from "../../services/api";
import "./Notifications.css";

const Notifications = () => {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        const data = await apiFetch("/api/notifications");
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [user]);

  if (loading) return <div>Loading notifications...</div>;
  if (!user) return <div>Please login to view notifications</div>;

  return (
    <section className="notifications-section">
      <h2>Notifications</h2>
      <div className="notifications-container">
        {notifications.length > 0 ? (
          notifications.map((note) => (
            <div key={note._id || note.id} className={`notification-card ${note.read ? "read" : "unread"}`}>
              <div className="notification-type">{note.type || "info"}</div>
              <p>{note.message}</p>
              <span className="timestamp">{new Date(note.createdAt || note.timestamp).toLocaleString()}</span>
            </div>
          ))
        ) : (
          <p>No notifications available</p>
        )}
      </div>
    </section>
  );
};

export default Notifications;
