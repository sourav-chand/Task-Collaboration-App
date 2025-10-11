import express from "express";
import auth from "../middleware/auth.js";
import {
  createProject,
  getUserProjects,
  addProjectMember,
  removeProjectMember,
  deleteProject,
} from "../controllers/projectsController.js";

const router = express.Router();

// @route    POST api/projects
// @desc     Create a project
// @access   Private
router.post("/", auth, createProject);

// @route    GET api/projects
// @desc     Get all projects for the user
// @access   Private
router.get("/", auth, getUserProjects);

// @route    POST api/projects/:id/members
// @desc     Add a member to a project
// @access   Private
router.post("/:id/members", auth, addProjectMember);

// @route    DELETE api/projects/:id/members/:member_id
// @desc     Remove a member from a project
// @access   Private
router.delete("/:id/members/:member_id", auth, removeProjectMember);

// @route    DELETE api/projects/:id
// @desc     Delete a project
// @access   Private
router.delete("/:id", auth, deleteProject);

export default router;
