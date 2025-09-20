// src/services/socket.js
import { io } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

let socketRoot = null;
let socketDashboard = null;

export const connectSocket = () => {
  if (!socketRoot || !socketRoot.connected) {
    socketRoot = io(API_URL, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
  }
  return socketRoot;
};

export const connectDashboard = () => {
  if (!socketDashboard || !socketDashboard.connected) {
    socketDashboard = io(`${API_URL}/dashboard`, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
  }
  return socketDashboard;
};

export const getSocket = () => socketRoot;
export const getDashboardSocket = () => socketDashboard;
