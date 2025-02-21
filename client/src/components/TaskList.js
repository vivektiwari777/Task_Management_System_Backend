import React, { useEffect, useState } from "react";
import { getTasks } from "../services/api";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const data = await getTasks();
            if (Array.isArray(data)) {
                setTasks(data);
            } else {
                console.error("Unexpected response format:", data);
                setTasks([]); // Reset tasks if response is incorrect
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    return (
        <div>
            <h2>Tasks</h2>
            <ul>
                {tasks.map((task, index) => (
                    <li key={task._id || index}>
                        {task.title} - {task.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
