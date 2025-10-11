# Task Collaboration App

A full-stack Task Collaboration App built with the MERN stack (MongoDB, Express.js, React, Node.js).

## 🧩 Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcrypt
- **Real-time**: Socket.io

## 🎯 Features

### 🔐 Authentication

- User registration and login
- Password hashing with bcrypt
- JWT-based authentication
- Protected routes

### 📁 Project Management

- Create, view, and delete projects
- Projects linked to their creators

### ✅ Task Board

- Add, update, and delete tasks
- Kanban-style board with drag-and-drop
- Task status: To Do, In Progress, Done

### ⚡ Real-Time Collaboration (Bonus)

- Socket.io for real-time updates
- Live task creation and status changes

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB database (local or cloud)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd task-collaboration-app
   ```

2. **Install dependencies**

   ```bash
   # Install root dependencies
   npm install

   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the `server` directory:

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. **Run the application**

   ```bash
   # Run both frontend and backend concurrently
   npm run dev

   # Or run separately
   npm run server  # Backend
   npm run client  # Frontend
   ```

### Project Structure

```
task-collaboration-app/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── context/     # React context providers
│   │   ├── pages/       # Page components
│   │   ├── utils/       # Utility functions
│   │   └── ...
│   └── ...
├── server/              # Node.js backend
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   └── ...
└── ...
```

## 🎁 Bonus Features

- Real-time updates with Socket.io
- Responsive design with Tailwind CSS
- Clean, modern UI/UX

## 📝 API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Projects

- `POST /api/projects` - Create a new project
- `GET /api/projects` - Get all projects for user
- `DELETE /api/projects/:id` - Delete a project

### Tasks

- `POST /api/projects/:id/tasks` - Create a new task
- `GET /api/projects/:id/tasks` - Get all tasks for a project
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

