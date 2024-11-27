import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  weight: { type: Number, required: true },
  age: { type: Number, required: true },
  height: { type: Number, required: true },
  targetWeight: { type: Number, required: true },
});

export const User = mongoose.model("User", userSchema);
