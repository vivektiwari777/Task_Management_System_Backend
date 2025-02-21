 Backend Link -https://task-management-system-backend-1.onrender.com

Backend
The backend of the Task Management System is developed using Node.js with the Express.js framework. It is responsible for handling all the business logic, data storage, and server-side functionality. Key features of the backend include:

JWT Authentication – Secure user login and registration, with role-based access control. Users can authenticate via JWT (JSON Web Tokens), ensuring that only authorized users can access the system.

Task Management API – Handles creating, updating, deleting, and assigning tasks. The API supports full CRUD operations (Create, Read, Update, Delete) for tasks, allowing users to manage their tasks efficiently.

Real-time Updates (WebSockets/Socket.io) – The backend uses WebSockets (via Socket.io) to enable real-time updates for task status changes. When a task is updated, all connected users see the changes instantly without needing to refresh the page.

AI-powered Task Breakdown (Gemini AI API) – The backend integrates with the Gemini AI API to automatically generate sub-tasks and provide task suggestions. This feature helps users plan their tasks more effectively by breaking down complex tasks into smaller, manageable steps.

Database – The backend uses MongoDB for data storage, depending on the needs of the application. MongoDB is used for its flexibility in storing unstructured data, while PostgreSQL is chosen for structured data and relational tasks.

Deployment – The backend is deployed on Render to ensure scalability and high performance. It can easily handle multiple users and scale as needed.

You can access the live backend through the following link:
https://task-management-system-backend-1.onrender.com


