import axios from "axios";

// CREATE AXIOS INSTANCE
const API = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials:true
});

// ============================
// 🔐 REQUEST INTERCEPTOR
// ============================
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

// ============================
// ⚠️ RESPONSE INTERCEPTOR
// ============================
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // token expire / unauthorized
    if (error.response?.status === 401) {
      console.log("Unauthorized - logging out");
      localStorage.removeItem("token");
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

// ============================
// 🔑 AUTH APIs
// ============================

// REGISTER
export const registerUser = (data) =>
  API.post("/user/register", data);

// LOGIN
export const loginUser = (data) =>
  API.post("/user/login", data);

// GET CURRENT USER
export const getCurrentUser = () =>
  API.get("/user/me");

// ============================
// 📋 TASK APIs
// ============================

// GET ALL TASKS
export const getTasks = () =>
  API.get("/tasks");

// GET SINGLE TASK
export const getTaskById = (id) =>
  API.get(`/tasks/${id}`);

// CREATE TASK
export const createTask = (data) =>
  API.post("/tasks", data);

// UPDATE TASK
export const updateTask = (id, data) =>
  API.put(`/tasks/${id}`, data);

// DELETE TASK
export const deleteTask = (id) =>
  API.delete(`/tasks/${id}`);

// ============================
// 📦 EXPORT DEFAULT
// ============================
export default API;