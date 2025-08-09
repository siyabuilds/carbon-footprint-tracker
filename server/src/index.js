import express from "express";
import dotenv from "dotenv";
import { connectDB } from "../db/connect.js";
import router from "./routes/register.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/register", router);

connectDB();

app.get("/", (req, res) => {
  res.send("App is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
