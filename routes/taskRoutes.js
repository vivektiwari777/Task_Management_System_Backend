import express from "express";
import { createTask, getTasks } from "../controllers/taskController.js";
import { authMiddleware } from "../middleware/authMiddleware.js"; // Use named import

const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);

export default router;