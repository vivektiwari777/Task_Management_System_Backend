import React from "react";

const TaskSuggest = ({ breakdown }) => {
    return (
        <div className="task-suggest">
            <h3>AI Breakdown</h3>
            <ul>
                {breakdown.split("\n").map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ul>
        </div>
    );
};

export default TaskSuggest;
