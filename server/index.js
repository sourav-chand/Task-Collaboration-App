const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/projects");
const taskRoutes = require("./routes/tasks");

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection with improved error handling
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

// Connect to MongoDB
connectDB();

// Retry connection on error
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected. Retrying connection...");
  setTimeout(connectDB, 5000); // Retry after 5 seconds
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// Basic route
app.get("/", (req, res) => {
  res.send("Task Collaboration App API Running...");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Socket.io setup
const io = require("socket.io")(server, {
  cors: {
    origin:
      process.env.NODE_ENV === "production" ? false : "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("joinProject", (projectId) => {
    socket.join(projectId);
    console.log(`User ${socket.id} joined project ${projectId}`);
  });

  socket.on("taskCreated", (data) => {
    socket.to(data.projectId).emit("taskCreated", data.task);
  });

  socket.on("taskUpdated", (data) => {
    socket.to(data.projectId).emit("taskUpdated", data.task);
  });

  socket.on("taskDeleted", (data) => {
    socket.to(data.projectId).emit("taskDeleted", data.taskId);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

module.exports = { app, io };
