import express from "express";
import { Activity } from "../models/Activity";
import { authenticateToken } from "../middleware/auth.js";
const activitiesRouter = express.Router();

// Get activities for the authenticated user
activitiesRouter.get("/", authenticateToken, async (req, res) => {
  try {
    // Get user ID from token and use it for querying user specific activities
    const userId = req.user.id || req.user._id;
    if (!userId) {
      return res.status(400).json({ message: "User ID not found in token" });
    }
    const activities = await Activity.find({ user: userId });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching activities" });
  }
});

activitiesRouter.post("/", authenticateToken, async (req, res) => {
  const { category, activity } = req.body;
  const userId = req.user.id || req.user._id;

  if (!userId) {
    return res.status(400).json({ message: "User ID not found in token" });
  }

  try {
    const newActivity = new Activity({
      user: userId,
      category,
      activity,
    });
    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (error) {
    res.status(500).json({ message: "Error creating activity" });
  }
});

export default activitiesRouter;
