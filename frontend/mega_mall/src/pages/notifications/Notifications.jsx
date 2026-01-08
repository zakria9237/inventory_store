import { useEffect, useState } from "react";
import {
  getNotifications,
  markNotificationRead,
} from "../../api/notifications.api";
import NotificationItem from "../../components/notifications/NotificationItem";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  const loadNotifications = async () => {
    const data = await getNotifications();
    setNotifications(data);
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleRead = async (id) => {
    await markNotificationRead(id);
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, is_read: true } : n
      )
    );
  };

  return (
    <div className="max-w-xl mx-auto mt-5">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>

      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        notifications.map((note) => (
          <NotificationItem
            key={note.id}
            note={note}
            onRead={handleRead}
          />
        ))
      )}
    </div>
  );
};

export default Notifications;
