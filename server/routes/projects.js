import express from "express";
import { check, validationResult } from "express-validator";
import auth from "../middleware/auth.js";
import Project from "../models/Project.js";
import User from "../models/User.js";

const router = express.Router();

// @route    POST api/projects
// @desc     Create a project
// @access   Private
router.post(
  "/",
  [auth, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, description } = req.body;

      const project = new Project({
        name,
        description,
        owner: req.user.id,
        members: [req.user.id],
      });

      const savedProject = await project.save();

      // Populate owner and members fields
      await savedProject.populate("owner", "name");
      await savedProject.populate("members", "name email");

      res.json(savedProject);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route    GET api/projects
// @desc     Get all projects for the user
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [{ owner: req.user.id }, { members: req.user.id }],
    })
      .populate("owner", "name")
      .populate("members", "name email")
      .sort({ createdAt: -1 });

    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route    POST api/projects/:id/members
// @desc     Add a member to a project
// @access   Private
router.post("/:id/members", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    // Check if project exists
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    // Check if user is owner
    if (project.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    const { userId } = req.body;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Check if user is already a member
    if (project.members.some((member) => member.toString() === userId)) {
      return res
        .status(400)
        .json({ msg: "User is already a member of this project" });
    }

    // Add user to members
    project.members.push(userId);
    await project.save();

    // Populate members field
    await project.populate("members", "name email");

    res.json(project);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Project not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route    DELETE api/projects/:id/members/:member_id
// @desc     Remove a member from a project
// @access   Private
router.delete("/:id/members/:member_id", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    // Check if project exists
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    // Check if user is owner
    if (project.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Check if member exists in project
    const removeIndex = project.members
      .map((member) => member.toString())
      .indexOf(req.params.member_id);

    if (removeIndex === -1) {
      return res
        .status(400)
        .json({ msg: "User is not a member of this project" });
    }

    // Remove member
    project.members.splice(removeIndex, 1);
    await project.save();

    // Populate members field
    await project.populate("members", "name email");

    res.json(project);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Project or member not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route    DELETE api/projects/:id
// @desc     Delete a project
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    // Check if project exists
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    // Check if user is owner
    if (project.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await Project.findByIdAndDelete(req.params.id);

    res.json({ msg: "Project removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Project not found" });
    }
    res.status(500).send("Server error");
  }
});

export default router;
