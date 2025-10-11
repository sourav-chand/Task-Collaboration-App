import express from "express";
import { check, validationResult } from "express-validator";
import auth from "../middleware/auth.js";
import Task from "../models/Task.js";
import Project from "../models/Project.js";
import User from "../models/User.js";

const router = express.Router();

// @route    POST api/tasks/:project_id/tasks
// @desc     Create a task
// @access   Private
router.post(
  "/:project_id/tasks",
  [auth, [check("title", "Title is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const project = await Project.findById(req.params.project_id);

      // Check if project exists
      if (!project) {
        return res.status(404).json({ msg: "Project not found" });
      }

      // Check if user is member of the project
      if (
        !project.members.some((member) => member.toString() === req.user.id)
      ) {
        return res.status(401).json({ msg: "User not authorized" });
      }

      // Validate assignedTo user if provided
      let assignedTo = null;
      if (req.body.assignedTo) {
        const user = await User.findById(req.body.assignedTo);
        if (!user) {
          return res.status(404).json({ msg: "Assigned user not found" });
        }
        // Check if assigned user is a member of the project
        if (
          !project.members.some(
            (member) => member.toString() === req.body.assignedTo
          )
        ) {
          return res
            .status(400)
            .json({ msg: "Assigned user is not a member of this project" });
        }
        assignedTo = req.body.assignedTo;
      }

      const newTask = new Task({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        project: req.params.project_id,
        assignedTo: assignedTo,
      });

      const task = await newTask.save();

      // Populate related fields
      await task.populate("assignedTo", "name");
      await task.populate("project", "name");

      res.json(task);
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "Project not found" });
      }
      res.status(500).send("Server error");
    }
  }
);

// @route    GET api/tasks/:project_id/tasks
// @desc     Get all tasks for a project
// @access   Private
router.get("/:project_id/tasks", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.project_id);

    // Check if project exists
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    // Check if user is member of the project
    if (!project.members.some((member) => member.toString() === req.user.id)) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    const tasks = await Task.find({ project: req.params.project_id })
      .populate("assignedTo", "name")
      .populate("project", "name")
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Project not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route    GET api/tasks/assigned
// @desc     Get all tasks assigned to the user
// @access   Private
router.get("/assigned", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.id })
      .populate("assignedTo", "name")
      .populate("project", "name")
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route    PUT api/tasks/:id
// @desc     Update a task
// @access   Private
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // Check if task exists
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    // Check if user is member of the project
    const project = await Project.findById(task.project);
    if (!project.members.some((member) => member.toString() === req.user.id)) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    const { title, description, status, assignedTo } = req.body;

    // Update task fields
    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;

    // Handle assignedTo update
    if (assignedTo !== undefined) {
      if (assignedTo === "" || assignedTo === null) {
        // Unassign task
        task.assignedTo = null;
      } else {
        // Validate assigned user
        const user = await User.findById(assignedTo);
        if (!user) {
          return res.status(404).json({ msg: "Assigned user not found" });
        }
        // Check if assigned user is a member of the project
        if (
          !project.members.some((member) => member.toString() === assignedTo)
        ) {
          return res
            .status(400)
            .json({ msg: "Assigned user is not a member of this project" });
        }
        task.assignedTo = assignedTo;
      }
    }

    const updatedTask = await task.save();

    // Populate related fields
    await updatedTask.populate("assignedTo", "name");
    await updatedTask.populate("project", "name");

    res.json(updatedTask);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Task not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route    DELETE api/tasks/:id
// @desc     Delete a task
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // Check if task exists
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    // Check if user is member of the project
    const project = await Project.findById(task.project);
    if (!project.members.some((member) => member.toString() === req.user.id)) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({ msg: "Task removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Task not found" });
    }
    res.status(500).send("Server error");
  }
});

export default router;
