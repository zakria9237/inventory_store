import api from "./axios";

export const getNotifications = async () => {
  const res = await api.get("/notifications/my/");
  return Array.isArray(res.data) ? res.data : [];
};

export const markNotificationRead = async (id) => {
  await api.post("/notifications/read/", {
    notification_id: id,
  });
};
