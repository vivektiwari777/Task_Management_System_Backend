import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    },
    { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
