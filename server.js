import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

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
    origin: "https://task-management-system-backend-l3le.vercel.app",  // Ensure frontend URL is correct
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// Middleware
app.use(express.json());

// Swagger Configuration
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Task Management System API",
            version: "1.0.0",
            description: "API documentation for the Task Management System",
        },
        servers: [
            {
                url: "http://localhost:5000", // Local server
            },
            {
                url: "https://task-management-system-backend-a6xg.onrender.com", // Render server
            },
        ],
    },
    apis: ["./routes/*.js"], // Path to your API route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Debugging: Log Routes
console.log("✅ Loading Routes...");

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/ai", aiRoutes);

// WebSocket for real-time task updates
const io = new Server(server, {
    cors: { origin: "https://task-management-system-backend-l3le.vercel.app" }  // Ensure WebSockets allow frontend access
});

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
