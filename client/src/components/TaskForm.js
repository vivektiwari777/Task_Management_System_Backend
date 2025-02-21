import React, { useState } from "react";
import { createTask } from "../services/api"; // API call function

const TaskForm = ({ onTaskAdded }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) return alert("Title and description are required!");

        try {
            const newTask = await createTask({ title, description, status: "Pending" });
            console.log("Task Created:", newTask);

            if (typeof onTaskAdded === "function") {
                onTaskAdded(newTask); // Ensure onTaskAdded exists before calling
            }

            setTitle("");
            setDescription("");
        } catch (error) {
            console.error("Error creating task:", error.response?.data || error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title"
                required
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter task description"
                required
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;
