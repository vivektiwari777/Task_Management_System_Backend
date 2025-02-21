import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import TaskSuggest from "../components/TaskSuggest";
import "../styles.css";
import { getTasks, createTask, generateSuggestion, generateBreakdown } from "../services/api"; // AI APIs

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [aiResponses, setAiResponses] = useState({}); // Store AI responses per task

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const data = await getTasks();
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const handleCreateTask = async (taskData) => {
        try {
            await createTask(taskData);
            fetchTasks(); // Refresh task list
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    const handleSuggest = async (taskId, taskTitle) => {
        try {
            const response = await generateSuggestion(taskTitle); // ✅ Pass taskTitle directly
            if (response && response.suggestion) {
                setAiResponses((prev) => ({
                    ...prev,
                    [taskId]: { ...prev[taskId], suggestion: response.suggestion }
                }));
            } else {
                console.error("Invalid response format:", response);
            }
        } catch (error) {
            console.error("Error generating suggestion:", error);
        }
    };


    const handleBreakdown = async (taskId, taskTitle) => {
        try {
            const response = await generateBreakdown(taskTitle);
            if (response && response.breakdown) {
                setAiResponses((prev) => ({
                    ...prev,
                    [taskId]: { ...prev[taskId], breakdown: response.breakdown }
                }));
            } else {
                console.error("Invalid response format:", response);
            }
        } catch (error) {
            console.error("Error generating breakdown:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token"); // Clear the stored token
        window.location.href = "/login"; // Redirect to login page
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2>Dashboard</h2>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>

            {/* Task Creation Form */}
            <TaskForm onCreateTask={handleCreateTask} />

            {/* Scrollable Task List */}
            <div className="task-list-container">
                {tasks.map((task) => (
                    <div key={task._id} className="task-card">
                        <h3>{task.title}</h3>
                        <p className="task-status">Status: {task.status}</p>

                        <div className="task-actions">
                            {/* AI Buttons */}
                            <button className="task-button" onClick={() => handleSuggest(task._id, task.title)}>Task Suggest</button>
                            <button className="task-button" onClick={() => handleBreakdown(task._id, task.title)}>Task Breakdown</button>
                        </div>

                        {/* AI Responses */}
                        {aiResponses[task._id]?.suggestion && (
                            <p className="ai-suggestion"><strong>AI Suggestion:</strong> {aiResponses[task._id].suggestion}</p>
                        )}
                        {aiResponses[task._id]?.breakdown && (
                            <TaskSuggest breakdown={aiResponses[task._id].breakdown} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
