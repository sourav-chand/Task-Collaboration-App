import express from "express";
import auth from "../middleware/auth.js";
import {
  createTask,
  getProjectTasks,
  getUserAssignedTasks,
  updateTask,
  deleteTask,
} from "../controllers/tasksController.js";

const router = express.Router();

// @route    POST api/tasks/:project_id/tasks
// @desc     Create a task
// @access   Private
router.post("/:project_id/tasks", auth, createTask);

// @route    GET api/tasks/:project_id/tasks
// @desc     Get all tasks for a project
// @access   Private
router.get("/:project_id/tasks", auth, getProjectTasks);

// @route    GET api/tasks/assigned
// @desc     Get all tasks assigned to the user
// @access   Private
router.get("/assigned", auth, getUserAssignedTasks);

// @route    PUT api/tasks/:id
// @desc     Update a task
// @access   Private
router.put("/:id", auth, updateTask);

// @route    DELETE api/tasks/:id
// @desc     Delete a task
// @access   Private
router.delete("/:id", auth, deleteTask);

export default router;
