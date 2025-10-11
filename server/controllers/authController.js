import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Utility to handle JWT signing
const generateToken = (userId) =>
  jwt.sign({ user: { id: userId } }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

// Middleware for handling validation results
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  next();
};

// @route    POST /api/auth/register
// @desc     Register a new user
export const registerUser = [
  check("name", "Name is required").notEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password must be at least 6 characters").isLength({
    min: 6,
  }),
  handleValidation,
  async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(400).json({ msg: "User already exists" });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({ name, email, password: hashedPassword });
      const token = generateToken(user.id);

      res.status(201).json({ token });
    } catch (error) {
      console.error("Register Error:", error.message);
      res.status(500).json({ msg: "Server error" });
    }
  },
];

// @route    POST /api/auth/login
// @desc     Authenticate user & return token
export const loginUser = [
  check("email", "Valid email is required").isEmail(),
  check("password", "Password is required").exists(),
  handleValidation,
  async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: "Invalid credentials" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      const token = generateToken(user.id);
      res.json({ token });
    } catch (error) {
      console.error("Login Error:", error.message);
      res.status(500).json({ msg: "Server error" });
    }
  },
];

// @route    GET /api/auth/user
// @desc     Get authenticated user
export const getAuthUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (error) {
    console.error("Get User Error:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};
