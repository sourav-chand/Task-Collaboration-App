import express from "express";
import auth from "../middleware/auth.js";
import {
  registerUser,
  loginUser,
  getAuthUser,
} from "../controllers/authController.js";

const router = express.Router();

// @route    POST /api/auth/register
// @desc     Register a new user
router.post("/register", registerUser);

// @route    POST /api/auth/login
// @desc     Authenticate user & return token
router.post("/login", loginUser);

// @route    GET /api/auth/user
// @desc     Get authenticated user
router.get("/user", auth, getAuthUser);

export default router;
