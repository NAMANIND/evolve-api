import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  exerciseType: {
    type: String,
    enum: ["RUNNING", "YOGA", "CYCLING", "STRENGTH", "SWIMMING", "HIIT"],
    required: true,
  },
  duration: { type: Number, required: true }, // in minutes
  intensity: {
    type: String,
    enum: ["LIGHT", "MODERATE", "INTENSE"],
    required: true,
  },
  videoUrl: { type: String },
});

export const Exercise = mongoose.model("Exercise", exerciseSchema);
