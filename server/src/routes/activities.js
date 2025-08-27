import express from "express";
import { Activity } from "../models/Activity";
const activitiesRouter = express.Router();

activitiesRouter.get("/", async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching activities" });
  }
});

export default activitiesRouter;
