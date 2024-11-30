import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import exerciseRoutes from "./routes/exercise.js";
import videoRoutes from "./routes/video.js";
import bodyParser from "body-parser";
dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/videos", videoRoutes);
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Increase limit for body parsing
app.use(bodyParser.json({ limit: "50mb" })); // For JSON payload
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); // For URL-encoded payload
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
