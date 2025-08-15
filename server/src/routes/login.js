import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// POST /api/login
router.post("/", async (req, res) => {
  const { email, username, password } = req.body;
  const identifier = email || username;

  if (!identifier || !password) {
    return res
      .status(400)
      .json({ message: "Username/Email and password are required" });
  }

  try {
    // Find user by email or username
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: "USER_NOT_FOUND",
        details: "No account exists with this email or username",
      });
    }

    // Check password using the model's comparePassword method
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
        error: "INVALID_PASSWORD",
        details: "The password you entered is incorrect",
      });
    }

    // Generate JWT token
    const JWT_SECRET =
      process.env.JWT_SECRET ||
      "carbon-footprint-tracker-secret-to-change-in-production";
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username: user.username,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Remove password from user object before sending response
    const { password: userPassword, ...userWithoutPassword } = user.toObject();

    res.status(200).json({
      message: "Login successful",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
