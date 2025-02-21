import express from "express";
import { register, login } from "../controllers/authController.js"; // Auth Controller
import { generateBreakdown, generateSuggestion } from "../controllers/aiController.js"; // ✅ Import AI Controller

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/breakdown", generateBreakdown); // AI Breakdown Route
router.post("/suggest", generateSuggestion);

export default router;
