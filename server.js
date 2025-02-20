import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

// Load environment variables
dotenv.config();
console.log("✅ ENV Variables Loaded");

// Database Connection
connectDB();

// Express App Setup
const app = express();
const server = http.createServer(app);

// CORS Configuration
app.use(cors({
    origin: "http://localhost:3000",  // Ensure frontend URL is correct
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// Middleware
app.use(express.json());

// WebSocket Setup
const io = new Server(server, {
    cors: { origin: "http://localhost:3000" }  // Ensure WebSockets allow frontend access
});

// Debugging: Log Routes
console.log("✅ Loading Routes...");

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/ai", aiRoutes);

// WebSocket for real-time task updates
io.on("connection", (socket) => {
    console.log(`🔗 User connected: ${socket.id}`);

    socket.on("taskUpdated", (task) => {
        io.emit("taskUpdated", task);
    });

    socket.on("disconnect", () => {
        console.log("❌ User disconnected");
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

export { io }; // If needed elsewhere
