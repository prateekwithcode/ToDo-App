import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  createTask,
  deleteTask,
  getTask,
  getTaskById,
  updateTask,
} from "../controllers/taskController";
const taskRoute = express.Router();

taskRoute
  .route("/td")
  .get(authMiddleware, getTask)
  .post(authMiddleware, createTask);

taskRoute
  .route("/:id/td")
  .get(authMiddleware, getTaskById)
  .put(authMiddleware, updateTask)
  .delete(authMiddleware, deleteTask);


export default taskRoute;