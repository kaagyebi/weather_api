import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { weatherRouter } from "./routes/weather.route.js";
import cors from "cors"

const app = express();

const PORT = process.env.PORT || 6161;

app.use(express.json());
app.use(cors())
app.use("/api/v1", weatherRouter)

const mongo_URI = process.env.MONGO_URI;

async function startServer() {
  try {
    await mongoose.connect(mongo_URI);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server is up on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
  }
}

startServer()