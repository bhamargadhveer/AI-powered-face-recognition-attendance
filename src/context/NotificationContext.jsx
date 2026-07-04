import { createContext, useContext, useState } from "react";
import { notifications as seed } from "../data/notifications.js";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [items, setItems] = useState(seed);
  const unread = items.filter((n) => !n.read).length;
  const markAllRead = () => setItems((xs) => xs.map((n) => ({ ...n, read: true })));
  const markRead = (id) =>
    setItems((xs) => xs.map((n) => (n.id === id ? { ...n, read: true } : n)));
  return (
    <NotificationContext.Provider value={{ items, unread, markAllRead, markRead }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => useContext(NotificationContext);