import express from "express";
import User from "../models/User.js";

const router = express.Router();

// POST /api/register
router.post("/", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Missing required fields",
      error: "MISSING_FIELDS",
      details: "Username, email, and password are all required",
    });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid email format",
      error: "INVALID_EMAIL",
      details: "Please provide a valid email address",
    });
  }

  // Password strength validation (at least 6 characters)
  if (password.length < 6) {
    return res.status(400).json({
      message: "Password too short",
      error: "WEAK_PASSWORD",
      details: "Password must be at least 6 characters long",
    });
  }

  try {
    // Check if user already exists by email
    const existingEmailUser = await User.findOne({ email });
    if (existingEmailUser) {
      return res.status(409).json({
        message: "Email already registered",
        error: "EMAIL_EXISTS",
        details: "An account with this email already exists",
      });
    }

    // Check if username already exists
    const existingUsernameUser = await User.findOne({ username });
    if (existingUsernameUser) {
      return res.status(409).json({
        message: "Username already taken",
        error: "USERNAME_EXISTS",
        details: "This username is already in use",
      });
    }

    // Create new user (password hashed automatically by the model)
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error("Error registering user:", err);

    // Handle mongoose validation errors
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((error) => error.message);
      return res.status(400).json({
        message: "Validation failed",
        error: "VALIDATION_ERROR",
        details: errors.join(", "),
      });
    }

    // Handle duplicate key errors (in case unique constraint is violated)
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      return res.status(409).json({
        message: `${field} already exists`,
        error: "DUPLICATE_KEY",
        details: `An account with this ${field} already exists`,
      });
    }

    res.status(500).json({
      message: "Internal server error",
      error: "SERVER_ERROR",
      details: "An unexpected error occurred during registration",
    });
  }
});

export default router;
