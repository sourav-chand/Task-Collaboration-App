const express = require("express");
const { body, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Task = require("../models/Task");
const Project = require("../models/Project");

const router = express.Router();

// @route   POST /api/projects/:id/tasks
// @desc    Create a new task for a project
// @access  Private
router.post(
  "/:project_id/tasks",
  [auth, [body("title", "Title is required").notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const project = await Project.findById(req.params.project_id);

      if (!project) {
        return res.status(404).json({ msg: "Project not found" });
      }

      // Check if user is part of the project
      if (!project.members.includes(req.user.id)) {
        return res.status(401).json({ msg: "User not authorized" });
      }

      const { title, description, assignedTo, status } = req.body;

      // Handle empty assignedTo
      const assignedToValue =
        assignedTo && assignedTo.trim() !== "" ? assignedTo : undefined;

      const task = new Task({
        title,
        description,
        assignedTo: assignedToValue,
        status: status || "To Do",
        project: req.params.project_id,
      });

      const savedTask = await task.save();

      // Populate assignedTo and project details
      await savedTask.populate("assignedTo", "name");
      await savedTask.populate("project", "name");

      res.json(savedTask);
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "Project not found" });
      }
      res.status(500).send("Server error");
    }
  }
);

// @route   GET /api/projects/:id/tasks
// @desc    Get all tasks for a project
// @access  Private
router.get("/:project_id/tasks", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.project_id);

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    // Check if user is part of the project
    if (!project.members.includes(req.user.id)) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    const tasks = await Task.find({ project: req.params.project_id })
      .populate("assignedTo", "name")
      .populate("project", "name")
      .sort({ date: -1 });

    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Project not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route   PUT /api/tasks/:id
// @desc    Update a task
// @access  Private
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, description, assignedTo, status } = req.body;

    // Build task object
    const taskFields = {};
    if (title) taskFields.title = title;
    if (description) taskFields.description = description;
    if (status) taskFields.status = status;
    // Handle empty assignedTo
    if (assignedTo !== undefined) {
      taskFields.assignedTo =
        assignedTo && assignedTo.trim() !== "" ? assignedTo : undefined;
    }

    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    // Check if user is part of the project
    const project = await Project.findById(task.project);
    if (!project.members.includes(req.user.id)) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: taskFields },
      { new: true }
    );

    // Populate assignedTo and project details
    await task.populate("assignedTo", "name");
    await task.populate("project", "name");

    res.json(task);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Task not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    // Check if user is part of the project
    const project = await Project.findById(task.project);
    if (!project.members.includes(req.user.id)) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await task.remove();

    res.json({ msg: "Task removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Task not found" });
    }
    res.status(500).send("Server error");
  }
});

module.exports = router;
