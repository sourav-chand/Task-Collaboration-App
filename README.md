# Task Collaboration App

A full-stack Task Collaboration App built with the MERN stack (MongoDB, Express.js, React, Node.js).

## 🧩 Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcrypt

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

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB database (local or cloud)
- Docker and Docker Compose (for containerized deployment)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd task-collaboration-app
   ```

2. **Install dependencies**

   ```bash
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

### Docker Deployment

This application includes Docker configuration for containerized deployment:

1. **Development Mode**

   ```bash
   docker-compose up --build
   ```

2. **Production Mode**
   ```bash
   docker-compose -f docker-compose.prod.yml up --build
   ```

The Docker setup includes:

- MongoDB service
- Node.js server application
- React/Vite client application

### Vercel Deployment

The server can also be deployed to Vercel as a serverless application:

1. Push your code to a Git repository
2. Import the repository to Vercel
3. Set the environment variables in Vercel dashboard:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret key
4. Deploy the project

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
│   ├── api/             # Vercel serverless entry point
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   └── ...
└── ...
```

## 📝 API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Projects

- `POST /api/projects` - Create a new project
- `GET /api/projects` - Get all projects for user
- `DELETE /api/projects/:id` - Delete a project

### Tasks

- `POST /api/tasks/:id/tasks` - Create a new task
- `GET /api/tasks/:id/tasks` - Get all tasks for a project
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
