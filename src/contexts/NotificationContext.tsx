'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { ToastNotification } from '@/types';

interface NotificationContextType {
  notifications: ToastNotification[];
  notify: (notification: Omit<ToastNotification, 'id'>) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<ToastNotification[]>([]);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const notify = useCallback(
    ({ type, title, message }: Omit<ToastNotification, 'id'>) => {
      const id = 'notif_' + Math.random().toString(36).substring(2, 9);
      const newNotif: ToastNotification = { id, type, title, message };
      setNotifications((prev) => [...prev, newNotif]);

      // Auto dismiss after 4 seconds
      setTimeout(() => {
        removeNotification(id);
      }, 4000);
    },
    [removeNotification]
  );

  return (
    <NotificationContext.Provider value={{ notifications, notify, removeNotification }}>
      {children}
      {/* Toast container overlay */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`pointer-events-auto p-4 rounded-xl shadow-2xl border text-sm backdrop-blur-md transition-all animate-bounce-in flex items-start justify-between gap-3 ${
              n.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-100'
                : n.type === 'error'
                ? 'bg-rose-950/90 border-rose-500/40 text-rose-100'
                : n.type === 'warning'
                ? 'bg-amber-950/90 border-amber-500/40 text-amber-100'
                : 'bg-zinc-900/90 border-zinc-700 text-zinc-100'
            }`}
          >
            <div>
              <p className="font-semibold">{n.title}</p>
              {n.message && <p className="text-xs opacity-90 mt-0.5">{n.message}</p>}
            </div>
            <button
              onClick={() => removeNotification(n.id)}
              className="opacity-70 hover:opacity-100 font-bold ml-2 text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}
