🚀 TaskFlow App

A full-stack task management system that allows users to manage projects and tasks efficiently with secure authentication and role-based access.

🌐 Live Demo
🔗 Frontend (Vercel): https://your-vercel-url.vercel.app
🔗 Backend (Render): https://taskflow-app-offt.onrender.com
✨ Features
🔐 JWT Authentication (Login/Register)
👤 Role-based access (Admin/User)
📁 Project Management
✅ Task Management (Create, Update, Delete)
📊 Analytics Dashboard
👑 Admin Panel (Manage Users)
🛡️ Secure REST APIs (Spring Security)
🌍 Fully deployed full-stack application
🖼️ Screenshots

Add images in /screenshots folder and update paths if needed

🔑 Login Page
<img width="1895" height="968" alt="Screenshot 2026-04-24 212909" src="https://github.com/user-attachments/assets/2644432d-f0fd-4ca9-baae-e989669628a1" />


📝 Register Page
<img width="1917" height="952" alt="image" src="https://github.com/user-attachments/assets/39e296f9-94f9-4303-9f2d-5a37b4123c0b" />


📊 Dashboard
<img width="1900" height="831" alt="Screenshot 2026-04-24 213022" src="https://github.com/user-attachments/assets/6eacfd0e-03f9-4349-bb97-18224ca0c18e" />


👑 Admin Panel
<img width="1910" height="847" alt="Screenshot 2026-04-24 212937" src="https://github.com/user-attachments/assets/e008bce6-cd58-49f6-a9f7-5fcb6db44c3a" />

🛠️ Tech Stack
💻 Frontend
React
Axios
React Router
Context API
⚙️ Backend
Spring Boot
Spring Security
JWT Authentication
REST APIs
🗄️ Database
PostgreSQL
☁️ Deployment
Backend → Render
Frontend → Vercel
📁 Project Structure
🔹 Frontend (/frontend/src)
api/           → axios config
components/    → reusable UI components
context/       → authentication context
pages/         → app pages (Login, Dashboard, Admin, etc.)
App.jsx        → main app routing
🔹 Backend (/backend/src/main/java)
config/        → security, JWT, CORS
controller/    → REST endpoints
service/       → business logic
repository/    → database access
entity/        → database models
dto/           → request/response objects
⚙️ Local Setup
1️⃣ Clone Repository
git clone https://github.com/kalyanchakravarthy4/taskflow-app.git
cd taskflow-app
2️⃣ Backend Setup
cd backend
.\mvnw.cmd clean package
java -jar target/demo-0.0.1-SNAPSHOT.jar
3️⃣ Frontend Setup
cd frontend
npm install
npm start
🔐 Environment Variables
Backend (application.properties or Render ENV)
spring.datasource.url=jdbc:postgresql://<host>:5432/<db>
spring.datasource.username=<username>
spring.datasource.password=<password>

jwt.secret=your_secret_key
Frontend (axios.js)
baseURL: "https://taskflow-app-offt.onrender.com/api"
🔌 API Endpoints
🔐 Auth
POST /api/auth/register
POST /api/auth/login
👤 Users
GET /api/admin/users
DELETE /api/admin/users/{id}
📁 Projects
GET /api/projects
POST /api/projects
✅ Tasks
GET /api/tasks
POST /api/tasks
PUT /api/tasks/{id}
DELETE /api/tasks/{id}
🚧 Future Improvements
📱 Mobile responsiveness
🔔 Notifications system
📅 Due date reminders
📊 Advanced analytics
🌙 Dark mode UI
🙌 Author

Kalyan Chakravarthy

GitHub: https://github.com/kalyanchakravarthy4
⭐ Support

If you like this project:

👉 Give it a ⭐ on GitHub
👉 Share with others

