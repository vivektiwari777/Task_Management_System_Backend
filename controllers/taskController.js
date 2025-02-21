import Task from "../models/taskModel.js";
import { generateTaskBreakdown } from "../utils/geminiHelper.js";

export const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required" });
        }

        let breakdown = "";
        if (generateTaskBreakdown) {
            breakdown = await generateTaskBreakdown(title);
        }

        const task = new Task({
            title,
            description,
            status: "pending",
            user: req.user.id,
        });
        await task.save();

        res.status(201).json({ message: "Task created", task, breakdown });
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();

        if (!Array.isArray(tasks)) {
            return res.status(400).json({ message: "Invalid task data" });
        }

        res.json(tasks); // ✅ Send array directly instead of `{ tasks }`
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ message: "Server error" });
    }
};