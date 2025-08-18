import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/carbon_footprint_tracker";

export async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}
