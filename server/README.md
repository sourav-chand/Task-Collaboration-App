# Task Collaboration App - Backend

This is the backend API for the Task Collaboration App built with Node.js, Express, and MongoDB.

## Features

- User authentication (register, login, get current user)
- Project management (create, get all, delete)
- Task management (create, get all for project, update, delete)
- JWT-based authentication
- MongoDB database integration

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (for cloud database)

## Installation

1. Clone the repository
2. Navigate to the server directory:
   ```
   cd server
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the server directory and add the following:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/taskcollab?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret_key
   ```
5. Replace `<username>` and `<password>` in the MONGO_URI with your MongoDB Atlas credentials
6. Start the development server:
   ```
   npm run dev
   ```

## MongoDB Atlas Setup

1. Sign up for a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
2. Create a new cluster (M0 free tier is sufficient for development)
3. In the cluster dashboard, click "Connect" and select "Connect your application"
4. Copy the connection string
5. Update the MONGO_URI in your `.env` file with your actual credentials:
   - Replace `sourav` with your MongoDB Atlas username
   - Replace `YOUR_ACTUAL_PASSWORD` with your MongoDB Atlas password
   - Ensure the database name `taskcollab` is correct (you can change it if needed)
6. In your MongoDB Atlas dashboard, go to "Network Access" and add your IP address to the whitelist (or add `0.0.0.0/0` to allow all IPs for development only)
7. Make sure you have created a database user with read/write permissions

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/user` - Get current user

### Projects

- `POST /api/projects` - Create a new project
- `GET /api/projects` - Get all projects for the user
- `DELETE /api/projects/:id` - Delete a project

### Tasks

- `POST /api/tasks/:project_id/tasks` - Create a new task
- `GET /api/tasks/:project_id/tasks` - Get all tasks for a project
- `GET /api/tasks/assigned` - Get all tasks assigned to the user
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Environment Variables

- `NODE_ENV` - Node environment (development/production)
- `PORT` - Server port (default: 5000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token generation

## License

MIT
