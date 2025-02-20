import express from "express";
import { generateTaskSuggestion, generateTaskBreakdown } from "../utils/geminiHelper.js"; // Ensure correct filename

const router = express.Router();

// ✅ Task Suggestion Route
router.post("/suggest", async (req, res) => {
    const { userInput } = req.body;
    if (!userInput) return res.status(400).json({ error: "User input is required" });

    const suggestion = await generateTaskSuggestion(userInput);
    res.json({ suggestion });
});

// ✅ Task Breakdown Route
router.post("/breakdown", async (req, res) => {
    const { taskTitle } = req.body;
    if (!taskTitle) return res.status(400).json({ error: "Task title is required" });

    const breakdown = await generateTaskBreakdown(taskTitle);
    res.json({ breakdown });
});

export default router;
