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
  .route("/get-me")
  .get(authMiddleware, getTask)
  .post(authMiddleware, createTask);

taskRoute
  .route("/:id/get-me")
  .get(authMiddleware, getTaskById)
  .put(authMiddleware, updateTask)
  .delete(authMiddleware, deleteTask);


export default taskRoute;