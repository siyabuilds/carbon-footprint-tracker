import express from "express";
import { Activity } from "../models/Activity";
import { authenticateToken } from "../middleware/auth.js";
const activitiesRouter = express.Router();

// Get all activities
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

// Create a new activity
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

// Delete a single activity by ID
activitiesRouter.delete("/:id", authenticateToken, async (req, res) => {
  const userId = req.user.id || req.user._id;
  const activityId = req.params.id;

  if (!userId) {
    return res.status(400).json({ message: "User ID not found in token" });
  }

  try {
    const activity = await Activity.findOneAndDelete({
      _id: activityId,
      user: userId,
    });
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.json({ message: "Activity deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting activity" });
  }
});

// Delete all activities
activitiesRouter.delete("/", authenticateToken, async (req, res) => {
  const userId = req.user.id || req.user._id;

  if (!userId) {
    return res.status(400).json({ message: "User ID not found in token" });
  }

  try {
    const result = await Activity.deleteMany({ user: userId });
    res.json({
      message: "All activities deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting all activities" });
  }
});

export default activitiesRouter;
