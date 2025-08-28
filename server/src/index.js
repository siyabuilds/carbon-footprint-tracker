import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "../db/connect.js";
import router from "./routes/register.js";
import loginRouter from "./routes/login.js";
import activitiesRouter from "./routes/activities.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: process.env.CORS_ALLOWED_ORIGINS.split(","),
  methods: process.env.CORS_ALLOWED_METHODS.split(","),
  allowedHeaders: process.env.CORS_ALLOWED_HEADERS.split(","),
  credentials: process.env.CORS_ALLOW_CREDENTIALS === "true",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/register", router);
app.use("/api/login", loginRouter);
app.use("/api/activities", activitiesRouter);

connectDB();

app.get("/", (req, res) => {
  res.send("App is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
