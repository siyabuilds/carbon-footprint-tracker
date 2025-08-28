import express from "express";
import { authenticateToken } from "../middleware/auth";

const validateTokenRouter = express.Router();

validateTokenRouter.get("/", authenticateToken, (req, res) => {
  res.json({ valid: true });
});

export default validateTokenRouter;
