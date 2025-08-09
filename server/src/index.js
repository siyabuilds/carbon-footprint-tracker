import express from "express";
import dotenv from "dotenv";
import { connectDB } from "../db/connect.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.get("/", (req, res) => {
  res.send("App is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
