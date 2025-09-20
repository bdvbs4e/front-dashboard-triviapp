import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// -----------------
// USERS
// -----------------
export const getAllUsers = async () => {
  const res = await api.get("/api/users");
  return res.data;
};

export const getUserById = async (id) => {
  const res = await api.get(`/api/users/${id}`);
  return res.data;
};

export const createUser = async (userData) => {
  const res = await api.post("/api/users", userData);
  return res.data;
};

export const createAdmin = async (userData) => {
  const res = await api.post("/api/users/admin", userData);
  return res.data;
};

export const loginUser = async (email, password) => {
  const res = await api.post("/api/users/login", { email, password });
  return res.data;
};

// -----------------
// QUESTIONS
// -----------------
export const getRandomQuestions = async (category = "", limit = 5) => {
  const res = await api.get("/api/questions/random", {
    params: { category, limit },
  });
  return res.data;
};

// -----------------
// DASHBOARD
// -----------------
export const getDashboardSummary = async () => {
  const res = await api.get("/api/dashboard/summary");
  return res.data;
};

export const getGlobalStats = async () => {
  const res = await api.get("/api/dashboard/stats");
  return res.data;
};

export default api;
