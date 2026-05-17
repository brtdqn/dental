import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

interface Notification {
  id: string;
  type: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface NotificationState {
  notifications: Notification[];
  socket: Socket | null;
  addNotification: (notification: Notification) => void;
  setNotifications: (notifications: Notification[]) => void;
  connect: (token: string) => void;
  disconnect: () => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  socket: null,

  addNotification: (notification) => set((state) => ({
    notifications: [notification, ...state.notifications]
  })),

  setNotifications: (notifications) => set({ notifications }),

  connect: (token) => {
    if (get().socket) return;

    const socket = io('http://localhost:3001/notifications', {
      auth: { token },
    });

    socket.on('connect', () => {
      console.log('Connected to notifications gateway');
      socket.emit('join');
    });

    socket.on('notification', (data: Notification) => {
      get().addNotification(data);
    });

    set({ socket });
  },

  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));
