import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  createTask,
  deleteTask,
  getTask,
  getTaskById,
  updateTask,
} from "../controllers/taskController.js";
const taskRoute = express.Router();

taskRoute
  .route("/")
  .get(authMiddleware, getTask)
  .post(authMiddleware, createTask);

taskRoute
  .route("/:id")
  .get(authMiddleware, getTaskById)
  .put(authMiddleware, updateTask)
  .delete(authMiddleware, deleteTask);


export default taskRoute;